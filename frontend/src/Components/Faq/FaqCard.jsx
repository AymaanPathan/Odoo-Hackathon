/* eslint-disable react/prop-types */
import { useState } from "react";

const FaqCard = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto ">
      {items.map((item, index) => (
        <div key={index} className="mb-2 bg-[#F5F8FA] mt-8">
          <button
            onClick={() => toggleItem(index)}
            className={`w-full px-6 py-6 text-lg text-green-800 ${
              openIndex === null ? "rounded-b-xl" : ""
            }    font-semibold bg-[#F5F8FA] rounded-t-2xl text-left focus:outline-none`}
          >
            {item.title}
          </button>
          {openIndex === index && (
            <div className="px-4 py-2  bg-white border-b-2 rounded-b-xl border-gray-500 text-gray-500">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqCard;
