export default function EditModal({ isOpen, onClose, onUpdate, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Edit Task</h2>
        <WorkForm
          onSubmit={(updated) => {
            onUpdate({ ...data, ...updated });
            onClose();
          }}
          initialData={data}
        />
        <button onClick={onClose} className="btn mt-4">
          Close
        </button>
      </div>
    </div>
  );
}
