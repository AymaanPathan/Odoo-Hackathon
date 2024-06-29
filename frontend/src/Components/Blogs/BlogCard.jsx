/* eslint-disable react/prop-types */

export default function BlogCard({ img, date, company, title, body }) {
  return (
    <div className="h-96">
      <img className="blog-img h-72 w-full cursor-pointer" src={img} alt="" />
      <div className="flex gap-4 mt-2">
        <span>{date}</span>
        <span>|</span>
        <span>{company}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 ">
        <p className="text-md font-semibold">{title}</p>
        <span className="blog-body text-left max-w-96 text-gray-500">
          {body}
        </span>
      </div>
    </div>
  );
}
