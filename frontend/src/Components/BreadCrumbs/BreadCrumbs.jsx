import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const pathsNames = pathname.split("/").filter((x) => x);

  let currentPath = "";

  return (
    <nav className="flex  justify-start  items-center p-8 overflow-x-auto whitespace-nowrap ">
      <Link
        to="/"
        className="flex items-center  text-[#7F493F]  hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
      </Link>
      {pathsNames.map((item, index) => {
        currentPath += `/${item}`;
        const isLast = index === pathsNames.length - 1;
        return (
          <span key={index} className="flex items-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-2 h-2 text-[#7F493F] 0 mx-2"
            />
            {!isLast ? (
              <Link
                to={currentPath}
                className="text-gray-500 hover:text-gray-800"
                title={item}
              >
                {item}
              </Link>
            ) : (
              <span
                className="font-bold uppercase text-[#7F493F] text-xs"
                title={item}
              >
                {item}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
