import React from 'react';

export const About = () => {
  return (
    <div className="relative">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="./assets/doctor.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative bg-gray-100 bg-opacity-75">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed">
            The Virtual Patient model is designed to offer a realistic and immersive experience for medical students and professionals to practice clinical scenarios. By simulating patient interactions, symptoms, and responses to treatment, our platform enhances medical training and decision-making skills in a safe environment.
          </p>
          <p className="text-lg leading-relaxed mt-6">
            Our platform aims to bridge the gap between theory and practice in medical education by providing immersive, realistic simulations. We believe that hands-on experience is crucial for developing clinical skills, and our virtual patient models offer a safe and effective way to gain this experience. Through advanced technology and interactive scenarios, we strive to enhance the learning experience for medical students and professionals alike. Our team is composed of experts in medicine, technology, and education, all working together to create innovative solutions for medical training. We are dedicated to improving patient outcomes by empowering healthcare professionals with the tools they need to succeed in their practice. Join us in revolutionizing medical education and training through the power of virtual simulation.
          </p>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Our mission is to provide innovative solutions for virtual patient stimulation that enhance medical education and training.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              Our vision is to revolutionize the way medical professionals are trained by creating realistic and immersive virtual patient experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
