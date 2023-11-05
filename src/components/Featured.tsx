// import { ProductType } from "@/types/types";
// //import { imageConfigDefault } from "next/dist/shared/lib/image-config";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const getData = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed!");
//   }
//   return res.json();
// };

// const Featured = async () => {
//   const featuredProducts: ProductType[] = await getData();
//   return (
//     <div className="w-screen overflow-x-scroll text-green-600 border-b-2 border-b-green-600">
//       {/* WRAPPER */}
//       <div className="w-max flex">
//         {/* SINGLE ITEM */}
//         {featuredProducts.map((item) => (
//           <div
//             key={item.id}
//             className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
//           >
//             {/* IMAGE CONTAINER */}
//             {item.img && (
//               <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
//                 <Image src={item.img} alt="" fill className="object-contain" />
//               </div>
//             )}
//             {/* TEXT CONTAINER */}
//             <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center">
//               <h1 className="uppercase text-xl font-bold xl:text-2xl 2xl:text-3xl">
//                 {item.title}
//               </h1>
//               <p className="p-4 2xl:p-8">{item.desc}</p>
//               <span className="text-xl font-bold">${item.price}</span>
//               <Link href={"/menu"}>
//                 <button className="bg-green-600 text-white p-2 rounded-md">
//                   Order Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Featured;

"use client";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: ProductType[] = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen overflow-x-scroll text-green-600 border-b-2 border-b-green-600">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center">
              <h1 className="uppercase text-xl font-bold xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <Link href={"/menu"}>
                <button className="bg-green-600 text-white p-2 rounded-md">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
