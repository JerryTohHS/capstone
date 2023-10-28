"use client";
import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const { clearCart } = useCartStore();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          // Handle the specific error condition, such as a non-200 status code
          throw new Error(`Failed with status: ${response.status}`);
        }

        clearCart();
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (error) {
        // Handle the error, log it, or display a user-friendly error message
        console.error("Error making the request:", error);
      }
    };

    makeRequest();
  }, [payment_intent, router, clearCart]);

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <ConfettiExplosion className="absolute m-auto" />
      </div>
    </>
  );
};

export default SuccessPage;
