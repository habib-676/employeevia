import { useLoaderData } from "react-router";
import { Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaChevronDown, FaUserAlt, FaCalendarAlt } from "react-icons/fa";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthName = (dateStr) => months[new Date(dateStr).getMonth()];

const Progress = () => {
  const data = useLoaderData();

  const employeeNames = [...new Set(data.map((d) => d.name))];
  const [selectedName, setSelectedName] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const filteredData = data.filter((item) => {
    const matchName = selectedName ? item.name === selectedName : true;
    const matchMonth = selectedMonth
      ? getMonthName(item.date) === selectedMonth
      : true;
    return matchName && matchMonth;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-center text-4xl font-bold mb-10">
        Employee Work <span className="text-secondary">Progress</span>
      </h2>

      {/* Filters */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-8 text-sm">
        {/* Employee Dropdown */}
        <div className="relative">
          <Listbox value={selectedName} onChange={setSelectedName}>
            <div className="relative">
              <Listbox.Button className="w-full btn justify-between bg-base-200 border border-base-content/10">
                <span className="flex items-center gap-2">
                  <FaUserAlt />
                  {selectedName || "All Employees"}
                </span>
                <FaChevronDown className="ml-2" />
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 mt-2 w-full bg-base-100 border rounded-md shadow-md max-h-60 overflow-y-auto">
                <Listbox.Option key="all" value={null} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        active ? "bg-accent" : ""
                      }`}
                    >
                      All Employees
                    </li>
                  )}
                </Listbox.Option>
                {employeeNames.map((name) => (
                  <Listbox.Option key={name} value={name} as={Fragment}>
                    {({ active }) => (
                      <li
                        className={`px-4 py-2 text-sm cursor-pointer ${
                          active ? "bg-accent" : ""
                        }`}
                      >
                        {name}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Month Dropdown */}
        <div className="relative text-sm">
          <Listbox value={selectedMonth} onChange={setSelectedMonth}>
            <div className="relative">
              <Listbox.Button className="w-full btn justify-between bg-base-200 border border-base-content/10">
                <span className="flex text-sm items-center gap-2">
                  <FaCalendarAlt />
                  {selectedMonth || "All Months"}
                </span>
                <FaChevronDown className="ml-2" />
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 mt-2 w-full bg-base-100 border rounded-md shadow-md max-h-60 overflow-y-auto">
                <Listbox.Option key="all" value={null} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={`px-4 py-2 cursor-pointer ${
                        active ? "bg-accent" : ""
                      }`}
                    >
                      All Months
                    </li>
                  )}
                </Listbox.Option>
                {months.map((month) => (
                  <Listbox.Option key={month} value={month} as={Fragment}>
                    {({ active }) => (
                      <li
                        className={`px-4 py-2 cursor-pointer ${
                          active ? "bg-accent" : ""
                        }`}
                      >
                        {month}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-box shadow bg-base-200 border border-base-content/5 w-full max-w-full">
        <table className="table table-zebra table-pin-rows">
          <thead className="bg-primary">
            <tr className="*:bg-primary text-white">
              <th></th>
              <th>Name</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-error text-lg">
                  No records found for selected filters.
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.task}</td>
                  <td>{item.hours}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{getMonthName(item.date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
