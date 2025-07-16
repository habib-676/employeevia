import React from "react";
import { useLoaderData } from "react-router";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EmployeeDetails = () => {
  const data = useLoaderData();
  const info = data[0].personalInfo;
  const name = info.name;
  const email = info.email;
  const designation = info.designation;
  const image = info.image;

  const filteredData = data.map((item) => ({
    salary: item.salary,
    month: item.month,
    year: item.year,
    label: `${item.month} ${item.year}`,
  }));

  console.log("Filtered data ---------->", filteredData);
  return (
    <div className="space-y-6">
      <div className="w-full max-w-md mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
          {/* Profile Image */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              className="h-24 w-24 rounded-full border-4 border-base-100 shadow-lg object-cover"
              src={image}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 px-6 pb-6 text-center space-y-2">
          <h2 className="text-xl font-semibold text-base-content">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          <div className="mt-3">
            <span className="badge badge-outline badge-secondary px-3 py-1 text-sm">
              {designation}
            </span>
          </div>
        </div>
      </div>
      {filteredData.length > 0 && (
        <div className="h-[60vh]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="salary" fill="#30b78d" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
