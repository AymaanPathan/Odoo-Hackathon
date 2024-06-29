import { useContext, useState, useEffect } from "react";
import { Productcontext } from "../../Context/Product";
import { Link } from "react-router-dom";
import star from "./star.png";
import "./similar.css"; // Import your CSS file

export default function Similar() {
  const { products } = useContext(Productcontext);
  const [randomIds, setRandomIds] = useState({ start: 29, end: 34 });

  useEffect(() => {
    const generateRandomRange = () => {
      const start = Math.floor(Math.random() * 20) + 1;
      const end = start + 5;
      setRandomIds({ start, end });
    };

    generateRandomRange();
  }, []);

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-semibold text-[#1B2834] mb-6">
        Similar Products
      </h1>
      <div className="grid grid-cols-2 gap-14 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => {
          if (item.ItemId >= randomIds.start && item.ItemId <= randomIds.end) {
            return (
              <div key={item.id} className="similar-card">
                <Link to={`/${item.ItemId}`} onClick={handleSmoothScroll}>
                  <div className="">
                    <img
                      src={item.image}
                      className="similar-img"
                      alt={item.name}
                    />
                  </div>
                </Link>
                <div className="">
                  <p className="mt-1 text-[10px] md:text-sm lg:text-md font-semibold text-[#1B2834]">
                    {item.name}
                  </p>
                  <div className="flex items-center text-sm mt-1 gap-2">
                    <div className="flex items-center gap-1">
                      <img
                        src={star}
                        className="w-2 h-2 lg:w-4 lg:h-4"
                        alt="Rating"
                      />
                      <p className="text-xs md:text-sm lg:text-md">4.0</p>
                    </div>
                  </div>
                  <div className="flex mt-1 text-[#7F493F] gap-2 text-md md:text-sm lg:text-md font-bold">
                    <p className="text-xs md:text-sm lg:text-md">
                      Rs. {item.rentalPrice}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
