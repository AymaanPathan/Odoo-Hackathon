/* eslint-disable react/prop-types */
import box from "./box.png";
import "./hero.css";

export default function Services({ title, body }) {
  return (
    <div className="flex mt-24 gap-2">
      <img src={box} alt="" className="w-12 h-12" />
      <div>
        <p className="service-title font-bold">{title}</p>
        <span className="service-body text-gray-500">{body}</span>
      </div>
    </div>
  );
}
