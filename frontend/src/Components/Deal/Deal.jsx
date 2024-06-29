// /* eslint-disable react/jsx-key */
// import { useContext } from "react";
// import star from "./star.png";
// import "./deal.css";

// export default function Deal() {
//   const { Allproduct } = useContext(ShopContext);

//   return (
//     <div className="deal_head_main mt-24 px-12">
//       <div className="deals-heading grid  grid-cols-1 gap-3">
//         <p className="text-gray-400 text-2xl">Today Deals</p>
//         <h2 className="text-4xl text-[bg- #1B2834] font-semibold">
//           Deals of the Day
//         </h2>
//       </div>
//       <div className="deal__main mt-8">
//         {Allproduct.map((item) => {
//           if (item.id >= 156 && item.id <= 158) {
//             return (
//               <div key={item.id} className="deal__item">
//                 <div className="w-fit h-full rounded-lg shadow">
//                   <a href={`/product/${item.id}`}>
//                     <img
//                       className="deal-imgs rounded-t-lg"
//                       src={item.image}
//                       alt=""
//                     />
//                   </a>
//                   <div className="p-5">
//                     <a href="#">
//                       <h5 className="mb-2 text-xl tracking-tight text-gray-900">
//                         {item.name}
//                       </h5>
//                     </a>
//                     <div className="flex items-center mb-3 justify-start gap-2">
//                       <p className="font-normal text-gray-700 dark:text-gray-400">
//                         Zara
//                       </p>
//                       <p className="text-gray-500">4.0</p>
//                       <img className="w-4 h-4" src={star} alt="" />
//                     </div>
//                     <div className="flex justify-start gap-4 items-center">
//                       <p className="font-bold text-lg">Rs. {item.newPrice}</p>
//                       <p className="font-extralight text-gray-500 text-lg line-through">
//                         Rs. {item.oldPrice}
//                       </p>
//                       <p className="text-green-600 font-semibold">(30% off)</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// }
