import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tasks = ["Sales", "Support", "Content", "Paper-work", "Marketing"];

export default function EditModal({ isOpen, onClose, onUpdate, data }) {
  const [task, setTask] = useState("");
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (data) {
      setTask(data.task || tasks[0]);
      setHours(data.hours || 1);
      setDate(new Date(data.date));
    }
  }, [data]);

  const handleSubmit = () => {
    if (!task || !hours || !date) return;
    onUpdate({ ...data, task, hours, date });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Work Entry</h2>

        {/* Task dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Task</label>
          <select
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="select select-bordered w-full"
          >
            {tasks.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Hours input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hours</label>
          <input
            type="number"
            step="0.1"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="input input-bordered w-full"
          />
        </div>

        {/* Date picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <DatePicker
            selected={date}
            onChange={(val) => setDate(val)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

