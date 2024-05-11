import React from "react";

function Card({ title, content }) {
  return (
    <div className="h-[350px] w-[260px] p-4 rounded-xl border-[2px] border-black shadow-md flex flex-col justify-between m-2 bg-red-300 dark:border-white overflow-hidden dark:bg-red-400 backdrop-blur">
      <div>
        <h1 className="text-xl font-bold mb-2 dark:text-[#28231d] border-b border-black dark:border-white">{title}</h1>
        <p className="text-[#040406] dark:text-[#160d08] mt-3">{content}</p>
      </div>
      <div className="mt-4">
        
      </div>
    </div>

  );
}

export default Card;
