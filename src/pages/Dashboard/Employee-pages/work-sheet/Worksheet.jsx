import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import EditModal from "./EditModal";
import WorkTable from "./WorkTable";
import WorkForm from "./WorkForm";
import {
  addWork,
  deleteWork,
  getWorks,
  updateWork,
} from "../../../../api/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/Animation/LoadingSpinner";

export default function WorkSheet() {
  const { user } = useAuth();
  const [editData, setEditData] = useState(null);
  const queryClient = useQueryClient();

  const { isPending, data: works = [] } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: () =>
      getWorks(user.email).then((res) =>
        res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
      ),
    enabled: !!user?.email,
  });

  // if (isPending) return <LoadingSpinner />;

  const handleAdd = async (data) => {
    const newData = { ...data, email: user.email, name: user.displayName };
    const res = await addWork(newData);

    queryClient.setQueryData(["works", user.email], (old = []) => [
      res.data,
      ...old,
    ]);
    toast.success("Data Added");
  };

  const handleUpdate = async (updated) => {
    const res = await updateWork(updated._id, updated); // ✅ send _id

    console.log(res);
    queryClient.setQueryData(["works", user.email], (old = []) =>
      old.map((item) => (item._id === updated._id ? res.data : item))
    );
    toast.success("Task Updated");
  };

  const handleDelete = async (id) => {
    await deleteWork(id);

    queryClient.setQueryData(["works", user.email], (old = []) =>
      old.filter((item) => item._id !== id)
    );

    toast.success("Task Deleted");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Work Sheet</h1>
      <WorkForm onSubmit={handleAdd} />

      <WorkTable data={works} onEdit={setEditData} onDelete={handleDelete} />
      <EditModal
        isOpen={!!editData}
        data={editData}
        onClose={() => setEditData(null)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
