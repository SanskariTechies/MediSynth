/** 
 * @description: Mini Project - MediSynth
 */

import React, { useEffect, useState } from 'react';


export const Signup = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "phone": "",
    "waphone": "",
    "password": "",
    "confirmPassword": ""
  });

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  }

  const submit = async () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        setError(`${key} is required`)
        return;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
    }
    try {
      const response = await fetch(`http://localhost:8000/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData: any = await response.json();
      if (response.ok && responseData.success) {
        window.location.href = "/signin";
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
    <main className="flex flex-col">
      <header className="fixed top-0 z-50 hidden w-full text-gray-100 transition-all duration-300 ease-in-out lg:block lg:w-1/3 body-font">
        <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
          <a className="flex-grow font-semibold text-2x1" href="/"><img src='./assets/logo.png' className='w-40 no-drag' alt='MediSynth' /></a>
        </div>
      </header>
      <div className="flex flex-row flex-grow">
        <div className="hidden lg:block lg:w-1/3">
          <video className="object-cover w-full h-screen no-drag" autoPlay muted loop>
            <source src="/assets/doctor.mp4" type="video/mp4" /> {/* https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949 */}
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 ">
          <div className="w-full max-w-md">
            <h2 className="flex flex-row mb-6 text-2xl font-bold">Sign up to <span> </span><img src='/assets/logo-dark.png' className='w-40 no-drag' alt='MediSynth' /></h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> Name </label>
                <input value={formData.name} onChange={handleChange} id="name" type="text" 
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2"/>
              </div>
              <div className="flex flex-row mb-4">
                <div className='w-1/2 pr-4'>
                  <label className="block mb-2 font-bold text-gray-700 text-sl"> Phone Number </label>
                  <input value={formData.phone} onChange={handleChange} id="phone" type="tel" 
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2"/>
                </div>
                <div className='w-1/2'>
                  <label className="block mb-2 font-bold text-gray-700 text-sl"> WhatsApp Number </label>
                  <input value={formData.waphone} onChange={handleChange}  id="waphone" type="tel"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> Email </label>
                <input value={formData.email} onChange={handleChange} id="email" type="email" 
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" />
              </div>
              <div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                  Password
                </span>
                <input value={formData.password} onChange={handleChange} id="password" type="password" 
                    placeholder='8+ characters' className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" />
              </div>
              <div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                  Confirm Password
                </span>
                <input value={formData.confirmPassword} onChange={handleChange} id="confirmPassword" type="password" 
                    placeholder='8+ characters' className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" />
              </div>
              <div className="flex items-center mb-6">
                  <input id="agreement" type="checkbox" className="w-6 h-6 bg-gray-100 border-gray-300 rounded" />
                  <label className="block mt-0 ml-2 text-sm text-gray-900">
                      I agree with MediSynth
                      <span> </span>
                      <a href="/terms" className="underline">Terms of Service</a>, 
                      <span> </span>
                      <a href="/privacy" className="underline">Privacy Policy</a>.
                  </label>
              </div>
              { error && (<div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans text-lg font-bold text-red-700">
                  {error}
                </span>
              </div> )}
              <div>
                <button type="submit" className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Create Account</button>
              </div>
              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?<span> </span>
                <a onClick={submit} className="font-sans text-sm text-gray-600 underline cursor-pointer">Sign in </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};