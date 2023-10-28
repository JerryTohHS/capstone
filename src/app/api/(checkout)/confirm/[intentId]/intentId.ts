// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

// export const PUT = async ({ params }: { params: { intentId: string } }) => {
//   const { intentId } = params;

//   try {
//     await prisma.order.update({
//       where: {
//         intent_id: intentId,
//       },
//       data: { status: "Being prepared!" },
//     });
//     return new NextResponse(
//       JSON.stringify({ message: "Order has been updated" }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

import prisma from "@/utils/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { intentId } = req.query;

    if (typeof intentId === "string") {
      try {
        await prisma.order.update({
          where: {
            intent_id: intentId,
          },
          data: { status: "Being prepared!" },
        });
        res.status(200).json({ message: "Order has been updated" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong!" });
      }
    } else {
      res.status(400).json({ message: "intentId must be a string" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
