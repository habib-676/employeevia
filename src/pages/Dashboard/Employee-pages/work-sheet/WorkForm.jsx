import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Listbox } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tasks = ["Sales", "Support", "Content", "Paper-work", "Marketing"];

const schema = z.object({
  task: z.string(),
  hours: z.number().min(0.1, { message: "Must be greater than 0" }),
  date: z.date(),
});

export default function WorkForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task: tasks[0],
      hours: 1,
      date: new Date(),
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 items-end bg-base-200 p-4 rounded-lg"
    >
      {/* Task Dropdown (Headless UI + React Icons) */}
      <div>
        <label className="label">Task</label>
        <Controller
          control={control}
          name="task"
          render={({ field: { value, onChange } }) => (
            <Listbox value={value} onChange={onChange}>
              <div className="relative mt-1 w-48 z-50">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border shadow-md focus:outline-none">
                  <span className="block truncate">{value}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {tasks.map((task, index) => (
                    <Listbox.Option
                      key={index}
                      value={task}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-primary text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {task}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <FiCheck className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          )}
        />
        {errors.task && (
          <p className="text-sm text-red-500">{errors.task.message}</p>
        )}
      </div>

      {/* Hours Input */}
      <div>
        <label className="label">Hours</label>
        <input
          type="number"
          step="0.1"
          {...register("hours", { valueAsNumber: true })}
          className="input input-bordered"
        />
        {errors.hours && (
          <p className="text-sm text-red-500">{errors.hours.message}</p>
        )}
      </div>

      {/* Date Picker */}
      <div>
        <label className="label">Date</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              className="input input-bordered"
            />
          )}
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Submit */}
      <button className="btn btn-primary mt-4" type="submit">
        Add
      </button>
    </form>
  );
}
