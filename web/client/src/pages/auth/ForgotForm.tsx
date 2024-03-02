/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React, { useEffect, useState } from 'react';

export const ForgotForm = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, []);
  console.log(loading);

  return (
    <>
  <main className="flex flex-col">
    <header className="fixed top-0 z-50 hidden w-full text-gray-100 transition-all duration-300 ease-in-out lg:block lg:w-1/3 body-font">
      <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
        <a className="flex-grow font-semibold text-2x1" href="/"><img src='./assets/logo.png' className='w-40 no-drag' alt='Police Connect' /></a>
      </div>
    </header>
    <div className="flex flex-row flex-grow">
      <div className="hidden lg:block lg:w-1/3">
        <video className="object-cover w-full h-screen no-drag" autoPlay muted loop>
          <source src="assets/doctor.mp4" type="video/mp4" /> {/* https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949 */}
            Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 ">
        <div className="w-full max-w-md">
          <h2 className="flex flex-row mb-6 text-2xl font-bold">Forgot password on <span> </span><img src='./assets/logo-dark.png' className='w-40 no-drag' alt='Police Connect' /></h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-bold text-gray-700 text-sl"> Email </label>
              <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="email" type="email" />
            </div>
            <div>
              <button type="submit" className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  </>
  );
};