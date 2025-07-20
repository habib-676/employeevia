import { FaEnvelope, FaUserCircle } from "react-icons/fa";

const MessageCard = ({ message }) => {
  const { email, message: content, _id } = message;

  return (
    <div className="bg-base-100 border rounded-xl p-4 mb-4 shadow transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl hover:border-primary/70 hover:bg-primary/5">
      <div className="flex items-start gap-4">
        <FaUserCircle className="text-3xl text-primary mt-1 animate-pulse group-hover:animate-none" />

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-base-content">
              <FaEnvelope className="inline mr-1 text-secondary" />
              {email}
            </h3>
            <span className="text-xs text-muted">#{_id.slice(-6)}</span>
          </div>

          <p className="mt-2 text-sm text-base-content whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
