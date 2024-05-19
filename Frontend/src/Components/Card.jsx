import React from "react";

function Card({ title, content }) {
  return (
    <div className="h-[350px] w-[260px] p-4 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md flex flex-col justify-between m-3 bg-slate-100 dark:bg-slate-800 overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105 cursor-pointer">
      <div>
        <h1 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3">{content}</p>
      </div>
    </div>

  );
}

export default Card;
