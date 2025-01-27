// RazorpayComponent.js

import React, { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { toast } from 'react-hot-toast';

function RazorpayComponent({ amount }) {
  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(async () => {
    const options = {
      key: "rzp_test_r6hncBZZ4Xy103",
      amount: amount * 100,
      currency: "INR",
      name: "Cospace",
      description: "Test Transaction",
      handler: (res) => {
        console.log({ res });
      },
      prefill: {
        name: "hello World",
        email: "amazon@gmail.com",
        contact: "9351220194",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, amount]);

  return (
    <button onClick={handlePayment}>Get Started</button>
  );
}

export default RazorpayComponent;
