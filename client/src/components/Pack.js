import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import PackWithPaypal from "./PackWithPaypal";
import jwt from "jwt-decode";
const Pack = () => {
  const sellerToken = localStorage.getItem("sellerToken");
  const _idSeller = jwt(sellerToken)._id;

  const [showPaypalButton1, setShowPayPalButton1] = useState(false);
  const [showPaypalButton2, setShowPayPalButton2] = useState(false);
  const [turnOver, setTurnOver] = useState(0);
  const [id, setId] = useState(undefined);
  const [type, setType] = useState("");

  const pay1 = (e) => {
    e.preventDefault();
    setShowPayPalButton1(true);
    setShowPayPalButton2(false);
    setTurnOver(500);
    setType("Expert");
  };
  const pay2 = (e) => {
    e.preventDefault();
    setShowPayPalButton2(true);
    setShowPayPalButton1(false);
    setTurnOver(300);
    setType("Pro");
  };
  useEffect(() => {
    setId(_idSeller);
  }, []);

  return (
    <div>
      <main className="w-full h-screen py-10 bg-gray-100">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl mb-2">Pricing Table</h1>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row px-2 md:px-0">
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow hover:shadow-xl transition duration-100 ease-in-out p-6 md:mr-4 mb-10 md:mb-0">
            <h3 className="text-gray-600 text-lg">Starter</h3>
            <p className="text-gray-600 mt-1">
              <span className="font-bold text-black text-4xl">FREE</span>
            </p>
            <div className="text-sm text-gray-600 mt-4">
              <p className="my-2">
                <span className="fa fa-check-circle mr-2 ml-1"></span>
                Standart Delivery
              </p>
              <p className="my-2">
                <span className="fa fa-check-circle mr-2 ml-1"></span>Make you
                benefits of a standard Delivery and 10 products limit
              </p>
            </div>

            <button className="w-full text-purple-700 border border-purple-700 rounded hover:bg-purple-700 hover:text-white hover:shadow-xl transition duration-150 ease-in-out py-4 mt-4">
              Choose Plan
            </button>
          </div>
          <div
            style={{
              backgroundColor: "#3f51b5",
            }}
            className="w-full md:w-1/3 text-white bg-purple-700 rounded-lg shadow hover:shadow-xl transition duration-100 ease-in-out p-6 md:mr-4 mb-10 md:mb-0"
          >
            <h3 className="text-lg">Expert </h3>
            <p className="mt-1">
              <span className="font-bold text-4xl">$500</span>
            </p>

            <div className="text-sm mt-4">
              <p className="my-2">
                <span className="fa fa-check-circle mr-2 ml-1"></span> The most
                popular Pack. You can buy it as a new seller or you can get it
                buy making more than 2000$ from sales.
              </p>
            </div>
            <Form onSubmit={pay1}>
              <button className="w-full text-purple-700 border border-purple-700 rounded hover:bg-purple-700 hover:text-white hover:shadow-xl transition duration-150 ease-in-out py-4 mt-4">
                Choose Plan
              </button>
            </Form>

            {showPaypalButton1 && (
              <PackWithPaypal type={type} turnOver={turnOver} id={id} />
            )}
          </div>
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow hover:shadow-xl transition duration-100 ease-in-out p-6 mb-10 md:mb-0">
            <h3 className="text-gray-600 text-lg">Pro</h3>
            <p className="text-gray-600 mt-1">
              <span className="font-bold text-black text-4xl">$300</span>
            </p>

            <div className="text-sm text-gray-600 mt-4">
              <p className="my-2">
                <span className="fa fa-check-circle mr-2 ml-1"></span>The Pro
                Pack. You can buy it as a new seller or you can get it buy
                making more than 500$ from sales.
              </p>
            </div>
            <Form onSubmit={pay2}>
              <button className="w-full text-purple-700 border border-purple-700 rounded hover:bg-purple-700 hover:text-white hover:shadow-xl transition duration-150 ease-in-out py-4 mt-4">
                Choose Plan
              </button>
            </Form>

            {showPaypalButton2 && (
              <PackWithPaypal type={type} turnOver={turnOver} id={id} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pack;
