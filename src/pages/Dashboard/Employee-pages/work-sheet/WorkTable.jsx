import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

export default function WorkTable({ data, onEdit, onDelete }) {
  const columns = useMemo(
    () => [
      { header: "Task", accessorKey: "task" },
      { header: "Hours", accessorKey: "hours" },
      {
        header: "Date",
        accessorKey: "date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button className="btn btn-xs" onClick={() => onEdit(row.original)}>
              🖊
            </button>
            <button
              className="btn btn-xs btn-error"
              onClick={() => onDelete(row.original._id)}
            >
              ❌
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table table-zebra">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
