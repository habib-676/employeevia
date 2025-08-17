import React from "react";

const Person = ({ person }) => {
  const { photo, name, role, quote } = person;
  return (
    <div className="max-w-xs mx-auto text-center p-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-3xl shadow-xl text-white">
      <div className="flex justify-center -mt-16">
        <img
          src={photo}
          alt={name}
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      <div className="mt-6 border-t border-white/30 pt-6 space-y-2">
        <h3 className="text-xl font-bold tracking-wide">{name}</h3>
        <p className="text-sm text-white/80 font-medium">{role}</p>
        <p className="text-sm italic text-white/90">"{quote}"</p>
      </div>
    </div>
  );
};

export default Person;
