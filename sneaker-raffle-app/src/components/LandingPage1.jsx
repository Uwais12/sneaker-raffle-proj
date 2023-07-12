/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import heroImage from "../assets/snkr.jpeg";
import nd from "../assets/ndn.jpeg";
import box from "../assets/box.png";

function LandingPage() {
  const sneakers = [
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: nd,
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
    {
      name: "Yeezy Boost 350 V2",
      brand: "adidas",
      releaseDate: "2023-04-10",
      imageUrl: nd,
      price: 220,
      productCode: "FZ5240",
      thumbsUpCount: 563,
      colourway: "Ash Pearl",
    },
    {
      name: "Chuck 70 High 'Twisted Resort'",
      brand: "Converse",
      releaseDate: "2023-04-15",
      imageUrl: "https://source.unsplash.com/random/200x200?sneakers",
      price: 100,
      productCode: "167760C",
      thumbsUpCount: 342,
      colourway: "Egret/Multi/Black",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: "https://source.unsplash.com/random/200x200?sneakers",
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: "https://source.unsplash.com/random/200x200?sneakers",
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: "https://source.unsplash.com/random/200x200?sneakers",
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: "https://source.unsplash.com/random/200x200?hypebeast-sneakers",
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: "https://source.unsplash.com/random/200x200?hypebeast-sneakers",
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      releaseDate: "2023-04-01",
      imageUrl: "https://source.unsplash.com/random/200x200?hypebeast-sneakers",
      price: 250,
      productCode: "555088-140",
      thumbsUpCount: 789,
      colourway: "Hyper Royal/White",
    },
  ];
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div
        className="bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage}) `, height: "40em" }}
      >
        <div className="flex items-center justify-between p-6 text-white bg-black bg-opacity-60">
          <div className="text-4xl font-bold text-white">Drip Drop</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-500">
              Shop
            </a>
            <a href="#" className="hover:text-blue-500">
              About
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>

        {/* Hero section */}
        <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-4 bg-center bg-cover bg-no-repeat text-white h-5/6">
          <h1 className="text-5xl font-bold">Welcome to Drip Drop</h1>
          <p className="text-xl">
            Your one stop shop for the hottest streetwear.
          </p>
          <button className="px-6 py-2 bg-white hover:bg-blue-600 text-black rounded font-bold">
            Shop Now
          </button>
        </div>
      </div>

      {/* Product showcase */}
      <div className="px-2 md:px-6 py-8 bg-gray-200">
        {" "}
        <div className="text-gray-900">
          <h2 className="text-4xl font-semibold mb-2">Current Releases</h2>
          <div className="h-1 w-20 bg-red-500 mb-6" />
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 justify-items-center items-center">
          {sneakers.map((sneaker) => (
            <div className="relative w-full h-full ">
              <div
                className="bg-contain bg-center h-full bg-no-repeat"
                style={{ backgroundImage: `url(${box})`, paddingBottom: "55%" }}
              ></div>
              <div className="absolute inset-4 flex items-center justify-center pt-12 ">
                <div className="bg-white text-center -rotate-3 w-11/12 flex p-1 rounded-md">
                  {" "}
                  <div className="flex-col space-y-1 w-12 justify-center items-center h-full align-middle mr-2">
                    <div className="bg-black w-full h-1"></div>
                    <div className="bg-black w-full h-1"></div>
                    <div className="bg-black w-full h-3"></div>
                    <div className="bg-black w-full h-1"></div>
                    <div className="bg-black w-full h-2"></div>
                    <div className="bg-black w-full h-1"></div>
                    <div className="bg-black w-full h-3"></div>
                    <div className="bg-black w-full h-1"></div>
                    {/* <div className="bg-black w-full h-2"></div>
                          <div className="bg-black w-full h-1"></div>
                          <div className="bg-black w-full h-1"></div> */}
                  </div>
                  <div className="bg-red-600 rounded-md text-white p-1 text-left w-full pl-2 flex justify-between">
                    <div>
                      <div className="font-bold">{sneaker.name}</div>
                      <div>{sneaker.price}</div>
                      <div>{sneaker.releaseDate}</div>
                    </div>
                    <div>
                      {/* <img style="" src={nd} alt="show" /> */}
                      <div
                        className="w-20 aspect-square bg-white justify-center align-middle items-center bg-contain bg-center rounded-md bg-no-repeat"
                        style={{ backgroundImage: `url(${sneaker.imageUrl})` }}
                      >
                        {/* <img src={nd} alt="show" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="relative shadow-lg rounded-lg w-3/4 mx-auto">
            {" "}
            <div className="absolute top-0 -right-4  w-14 h-14 text-center pt-1">
              <div className="text-white text-xs font-bold bg-gray-800 p-1 rounded-t">
                {" "}
                {new Date("2023-04-01").toLocaleString("default", {
                  month: "short",
                })}
              </div>
              <div className="text-gray-800 bg-gray-300 text-lg font-bold p-1 rounded-b">
                {" "}
                {new Date("2023-04-01").getDate()}
              </div>
            </div>
            <img
              src={
                "https://source.unsplash.com/random/200x200?hypebeast-sneakers"
              }
              alt={"Yeezy Boost 350 V2"}
              className="w-full h-60 object-cover mt-4 rounded-t"
            />
            <div className="flex justify-between align-middle items-center mt-4 mb-4 px-2">
              <div className="">
                <div className="text-gray-800 text-lg font-semibold ">
                  {"Yeezy Boost 350 V2"}
                </div>
                <div className="text-gray-700 text-sm font-bold mt-1">
                  {" "}
                  10 Raffles
                </div>
              </div>
              <button className="bg-gray-800  text-white rounded-full px-4 py-2 transform hover:scale-105 transition-all ease-in-out duration-200 shadow-lg">
                D
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-100 text-center text-gray-800">
        &copy; {new Date().getFullYear()} StreetX. All rights reserved.
      </div>
    </div>
  );
}

export default LandingPage;
