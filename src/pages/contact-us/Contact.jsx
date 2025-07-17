import axios from "axios";
import Container from "../../components/Shared/Container/Container";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (message) => {
    // TODO: send to your backend
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages`,
      message
    );
    if (data.insertedId) {
      toast.success("Message sent successfully!");
    }

    reset();
  };

  return (
    <Container>
      <div className="min-h-screen bg-base-200 py-12 px-4 md:px-10 mt-10 shadow-2xl rounded-4xl border border-primary">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Company Info */}
          <div className="space-y-5 text-base-content">
            <h2 className="text-3xl font-bold">Contact Our Team</h2>
            <p className="text-lg">
              We'd love to hear from you. Whether you have a question, feedback,
              or just want to say hi.
            </p>
            <div>
              <p className="font-semibold">📍 Address:</p>
              <p>ABC Tower, 5th Floor, Banani, Dhaka, Bangladesh</p>
            </div>
            <div>
              <p className="font-semibold">📧 Email:</p>
              <p>support@employeemanager.com</p>
            </div>
            <div>
              <p className="font-semibold">📞 Phone:</p>
              <p>+880 1234 567 890</p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-base-100 shadow-xl rounded-box p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={5}
                  placeholder="Write your message here..."
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
