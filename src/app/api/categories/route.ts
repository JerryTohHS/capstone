import cors from "cors";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Initialize CORS middleware
const corsMiddleware = cors({
  origin: "https://capstone-mamak.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
});
// FETCH ALL CATEGORIES
export const GET = async () => {
  corsMiddleware;
  try {
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
  corsMiddleware;
  return new NextResponse("Hello", { status: 200 });
};
