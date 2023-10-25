"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catslug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catslug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "capstone");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhbufa6xg/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !inputs.title ||
      !inputs.desc ||
      inputs.price === 0 ||
      !inputs.catslug
    ) {
      toast.error("Please fill out all required fields*");
      return;
    }

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();
      const productId = data.id;

      router.push(`/product/${productId}`);

      toast.success("New product added");
    } catch (err) {
      console.log(err);
      toast.error("Error adding new product");
    }
  };

  return (
    <div>
      <form
        className="shadow-lg flex flex-wrap gap-4 p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl mb-4 text-green-600 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2 text-red-500">
          <div className="flex flex-row items-center">
            <img src="/upload.png" alt="" width="50" className="p-2" />
            <label>Upload Image</label>
          </div>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="file"
            onChange={handleChangeImg}
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-red-500">
          <label>Title*</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="title"
            placeholder="Title"
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-red-500">
          <label>Description*</label>
          <textarea
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="desc"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-red-500">
          <label>Price*</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="number"
            name="price"
            placeholder="Number Only"
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-red-500">
          <label>Category*</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="catslug"
            placeholder="pratas / others / drinks"
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-red-500">
          <label>Options</label>
          <div className="flex gap-2">
            <input
              onChange={changeOption}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="text"
              placeholder="Title"
              name="title"
            />
            <input
              onChange={changeOption}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="number"
              style={{ width: "300px" }}
              placeholder="Additional Price (Number Only)"
              name="additionalPrice"
            />
            <div
              className="w-52 bg-green-600 text-white p-2"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="p-2 ring-1 rounded-md cursor-pointer ring-green-600 text-green-600"
              onClick={() =>
                setOptions((prev) =>
                  prev.filter((item) => item.title !== opt.title)
                )
              }
            >
              <span>{opt.title}</span>
              <span className="text-xs"> (+ ${opt.additionalPrice})</span>
            </div>
          ))}
        </div>
        <button type="submit" className="p-2 w-full bg-green-600 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
