import React from "react";

export default function Footer() {
  return (
    <div className="px-6 pt-6 mt-[100vh] bg-emerald-500">
      <div className=" ">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-4xl mb-3 font-bold text-white">
              {" "}
              Join Our Beta{" "}
            </h3>
            <p> Find the Best Odds. All day, every day. </p>
            <div className="flex justify-center my-10">
              <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2">
                <div className="text-left ml-3">
                  <p className="text-xs text-white">Download on </p>
                  <p className="text-sm md:text-base"> Google Play Store </p>
                </div>
              </div>
              <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
                <div className="text-left ml-3">
                  <p className="text-xs text-white">Download on </p>
                  <p className="text-sm md:text-base"> Apple Store </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-white">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              &copy; UNDERDOG/DATA, 2023.{" "}
            </p>
            <div className="order-1 md:order-2">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
