import "./newsLetter.css";
import women from "./sofa.jpg";
export default function NewsLetter() {
  return (
    <div className="newsLetter-main flex px-8 mt-44 select-none">
      {/* Left */}
      <div className="left flex flex-col   gap-4">
        <div className="text-2xl font-semibold text-gray-200">
          <p className="news-letter-heading text-[#1B2834]">Our Newsletter</p>
        </div>
        <p className="newsLetter-body text-[#1B2834] leading-tight  text-6xl">
          Subscribe to Our Newsletter for Coupons on Our Latest Collection
        </p>
        <span className="news-letter-Subtitle text-gray-400">
          Get 20% off on your first order just by subscribing to our newsletter
        </span>
        <div className="user-input w-[30rem] flex flex-col gap-2">
          <input
            placeholder="Your business email"
            type="email"
            className="news-letter-input w-full rounded-md focus:outline-none border-2 border-gray-500 bg-gray-200 h-14  text-center"
          />
          <button className="news-letter-btn h-12 w-full whitespace-nowrap rounded-md text-white  bg-[#286FE5]">
            Get started
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="right">
        <img
          className="newsLetter-img hero-img h-full w-[92rem]"
          src={women}
          alt=""
        />
      </div>
    </div>
  );
}
