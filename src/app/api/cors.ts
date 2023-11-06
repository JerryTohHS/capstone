import cors, { CorsOptions } from "cors";

// Define your CORS options
const corsOptions: CorsOptions = {
  origin: "https://capstone-mamak.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
};

// Create and export the CORS middleware
export const corsMiddleware = cors(corsOptions);
