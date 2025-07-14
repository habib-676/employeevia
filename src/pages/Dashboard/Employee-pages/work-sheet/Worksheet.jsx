import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import EditModal from "./EditModal";
import WorkTable from "./WorkTable";
import WorkForm from "./WorkForm";
import { addWork, getWorks } from "../../../../api/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/Animation/LoadingSpinner";

export default function WorkSheet() {
  const { user } = useAuth();
  const [editData, setEditData] = useState(null);
  const queryClient = useQueryClient();

  const { isPending, data: works = [] } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: () => getWorks(user.email).then((res) => res.data),
    enabled: !!user?.email,
  });

  if (isPending) return <LoadingSpinner />;

  const handleAdd = async (data) => {
    const newData = { ...data, email: user.email };
    const res = await addWork(newData);

    // ✅ Immediately update the local cache for a snappy UI
    queryClient.setQueryData(["works", user.email], (old = []) => [
      res.data,
      ...old,
    ]);
    toast.success("Data Added");
  };

  // const handleUpdate = async (updated) => {
  //   await updateWork(updated._id, updated);
  //   setWorks((prev) =>
  //     prev.map((item) => (item._id === updated._id ? updated : item))
  //   );
  // };

  // const handleDelete = async (id) => {
  //   await deleteWork(id);
  //   setWorks((prev) => prev.filter((item) => item._id !== id));
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Work Sheet</h1>
      <WorkForm onSubmit={handleAdd} />

      <WorkTable
        data={works}
        onEdit={setEditData}
        //  onDelete={handleDelete}
      />
      <EditModal
        isOpen={!!editData}
        data={editData}
        onClose={() => setEditData(null)}
        // onUpdate={handleUpdate}
      />
    </div>
  );
}
