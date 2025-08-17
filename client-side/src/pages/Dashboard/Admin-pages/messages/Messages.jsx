import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/Spinners/LoadingSpinner";
import toast from "react-hot-toast";
import MessageCard from "./MessageCard";

const Messages = () => {
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const res = await axios(`${import.meta.env.VITE_API_URL}/messages`);
  //         console.log(res.data);
  //       } catch (error) {
  //         console.error("Error fetching messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, []);

  const {
    isPending,
    error,
    data: messages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/messages`);
      return data;
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }
  if (error) {
    return toast.error(error.message);
  }

  return (
    <div>
      <h3 className="text-3xl text-center font-bold mb-10">
        {" "}
        Visitor <span className="text-secondary">Feedback</span>
      </h3>
      <div>
        {messages.length === 0 ? (
          <p className="text-center text-base-content">No messages yet.</p>
        ) : (
          messages.map((msg) => <MessageCard key={msg._id} message={msg} />)
        )}
      </div>
    </div>
  );
};

export default Messages;
