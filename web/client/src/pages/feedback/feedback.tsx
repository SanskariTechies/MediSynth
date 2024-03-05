import React from 'react';

export const Feedback = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="p-4 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Feedback</h1>
        <form className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium">Phone Number</label>
            <input type="tel" id="phone" name="phone" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-lg font-medium">Remark</label>
            <textarea id="feedback" name="feedback" rows={4} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-blue-200 text-blue-900 px-4 py-2 rounded hover:bg-blue-300">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};
