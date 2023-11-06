import cors from "cors";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Define your CORS options
const corsOptions = {
  origin: "https://capstone-mamak.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
};

// Initialize the CORS middleware with the specified options
const corsMiddleware = cors(corsOptions);

export const GET = async () => {
  try {
    // Apply the CORS middleware here
    corsMiddleware;

    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = () => {
  try {
    // Apply the CORS middleware here
    corsMiddleware;

    // Handle POST request logic here
    return new NextResponse("Hello", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
