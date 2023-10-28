import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products?cat=${category}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed with status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for higher-level handling
  }
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);
  return (
    <div className="flex flex-wrap text-green-600">
      {products.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50 border-green-600"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-green-600 text-white p-2 rounded-md">
              Order
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
