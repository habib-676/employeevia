require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

const port = process.env.PORT || 3000;
const app = express();
// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://employeevia.web.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const db = client.db("employeeViaDB");
    const usersCollection = db.collection("users");
    const worksCollection = db.collection("works");
    const paymentsCollection = db.collection("payments");
    const messagesCollection = db.collection("messages");

    // Generate jwt token
    app.post("/jwt", async (req, res) => {
      const { email } = req.body;
      const user = await usersCollection.findOne({ email });

      if (user.isFired) {
        return res.status(403).send({ message: "You have been fired." });
      }

      const token = jwt.sign(
        { email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "365d",
        }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    const verifyToken = async (req, res, next) => {
      const token = req.cookies?.token;

      console.log(token);
      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
      });
    };

    // role verify middleware

    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      console.log(query);
      const user = await usersCollection.findOne(query);

      if (!user || user.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }

      console.log("Admin verified -----------!");
      next();
    };

    const verifyHr = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      console.log(query);
      const user = await usersCollection.findOne(query);

      if (!user || (user.role !== "admin" && user.role !== "hr")) {
        return res.status(403).send({ message: "Forbidden access" });
      }

      console.log("HR verified------!");
      next();
    };

    const verifyEmployee = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      console.log(query);
      const user = await usersCollection.findOne(query);

      if (!user || user.role !== "employee") {
        return res.status(403).send({ message: "forbidden access" });
      }

      console.log("employee verified -----------!");
      next();
    };

    // api's
    app.post("/users", async (req, res) => {
      const userData = req.body;
      userData.isVerified = false;
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();

      const query = { email: userData?.email };
      const alreadyExists = await usersCollection.findOne(query);

      if (alreadyExists) {
        const result = await usersCollection.updateOne(query, {
          $set: { last_loggedIn: new Date().toISOString() },
        });
        return res.send(result);
      }

      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    // verified users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find({ isVerified: true }).toArray();
      res.send(result);
    });

    // all employees
    app.get("/employees", async (req, res) => {
      const query = {
        role: "employee",
      };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    // get user role
    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) {
        return res.status(404).send({ message: "User not found." });
      }
      res.send({ role: result?.role });
    });

    // update role
    app.patch("/users/role/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      if (!role) {
        return res
          .status(400)
          .send({ message: "Missing role in request body" });
      }

      try {
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role } }
        );
        res.send(result); // ✅ send back response
      } catch (err) {
        res.status(500).send({ message: "Failed to update role", error: err });
      }
    });

    // update salary
    app.patch("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { salary } = req.body;

      if (!salary || isNaN(salary)) {
        return res.status(400).send({ message: "Invalid salary" });
      }

      try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        if (salary <= user.salary) {
          return res.status(400).send({
            message: "New salary must be greater than current salary",
          });
        }

        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { salary } }
        );

        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
      }
    });

    // update verification status - hr
    app.patch("/employees/:id", verifyToken, verifyHr, async (req, res) => {
      const { id } = req.params;
      const { isVerified } = req.body;

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isVerified } }
      );
      res.send(result);
    });

    app.post("/works", verifyToken, verifyEmployee, async (req, res) => {
      const workData = req.body;
      const result = await worksCollection.insertOne(workData);

      if (result.insertedId) {
        const insertedDoc = await worksCollection.findOne({
          _id: result.insertedId,
        });
        return res.send(insertedDoc); // ✅ full document with task, date, etc.
      }

      res.status(500).send({ message: "Insert failed" });
    });

    app.get("/works/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email };

      try {
        // If exists, fetch all related documents
        const cursor = worksCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    app.get("/works", async (req, res) => {
      const result = await worksCollection.find().toArray();
      res.send(result);
    });

    // update work
    app.put("/works/:id", verifyToken, verifyEmployee, async (req, res) => {
      const id = req.params.id;
      const { _id, ...updatedData } = req.body;

      console.log(updatedData);

      try {
        await worksCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        const updatedDoc = await worksCollection.findOne({
          _id: new ObjectId(id),
        });
        res.send(updatedDoc); // Send back updated document
      } catch (error) {
        res.status(500).send({ message: "Update failed", error });
      }
    });

    // delete work
    app.delete("/works/:id", verifyToken, verifyEmployee, async (req, res) => {
      const id = req.params.id;

      try {
        const result = await worksCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Delete failed", error });
      }
    });

    // payment
    app.post("/payments", verifyToken, verifyHr, async (req, res) => {
      const paymentReq = req.body;
      const result = await paymentsCollection.insertOne(paymentReq);
      res.send(result);
    });

    app.get("/payments", async (req, res) => {
      const result = await paymentsCollection.find().toArray();
      res.send(result);
    });

    app.get("/my-payments/:email", async (req, res) => {
      const email = req.params.email;
      const query = {
        "personalInfo.email": email,
        isPaid: true,
        transactionId: { $exists: true, $ne: null },
      };
      try {
        const result = await paymentsCollection
          .find(query)
          .sort({ year: 1, month: 1 })
          .toArray();
        res.send(result);

        console.log(result);
      } catch (error) {
        res.status(404).send({ message: "No payment history found" });
      }
    });

    app.patch("/payments", async (req, res) => {
      const { workId, transactionId } = req.body;

      const result = await paymentsCollection.updateOne(
        { _id: new ObjectId(workId) },
        {
          $set: {
            transactionId: transactionId,
            isPaid: true,
            paymentDate: new Date().toISOString().split("T")[0],
          },
        }
      );
      res.send(result);
    });

    // contact message :
    app.post("/messages", async (req, res) => {
      const message = req.body;
      const result = await messagesCollection.insertOne(message);
      res.send(result);
    });

    app.get("/messages", async (req, res) => {
      const result = await messagesCollection.find().toArray();
      res.send(result);
    });

    app.get("/payments/:email", async (req, res) => {
      const email = req.params.email;

      const result = await paymentsCollection
        .find({ "personalInfo.email": email })
        .toArray();
      res.send(result);
    });

    // stripe payment intent

    app.post(
      "/create-payment-intent",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { workId, salary } = req.body;

        const work = await paymentsCollection.findOne({
          _id: new ObjectId(workId),
        });

        // console.log(work);
        if (!work) {
          return res.status(404).send({ message: "Data not found" });
        }

        //  Check for duplicate by employee email + month + year
        const existingPayment = await paymentsCollection.findOne({
          "personalInfo.email": work.personalInfo.email,
          month: work.month,
          year: work.year,
          isPaid: true,
        });
        if (existingPayment) {
          return res.status(400).send({
            message:
              "Payment for this employee in this month and year has already been made.",
          });
        }
        // ---------------->

        const totalSalary = salary * 100; //cent

        // stripe :
        const paymentIntent = await stripe.paymentIntents.create({
          amount: totalSalary,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
      }
    );

    // fire
    app.patch("/fire-user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;

      try {
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isFired: true } }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fire user", error });
      }
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Send a ping to confirm a successful connection
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from employeeVia Server..");
});

app.listen(port, () => {
  console.log(`Net is running on port ${port}`);
});
