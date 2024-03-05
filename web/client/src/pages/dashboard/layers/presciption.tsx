import React from 'react';
import { Link } from 'react-router-dom';

export const Prescription: React.FC = () => {
  return (
    <div className='flex items-center justify-center bg-gray-100'>
    <div className='p-20 mx-auto bg-gray-100 rounded-lg shadow-lg'>
        <div className='p-5'>
            <h2 className='' style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>Medical Prescription</h2>
            <p className='' style={{ color: "#666", fontSize: "1.1em", lineHeight: "1.6" }}>
                A medical prescription, often simply called a prescription, is a health-care program implemented by a physician or other qualified health care practitioner in the form of instructions that govern the plan of care for an individual patient.
                Prescriptions may include orders to be performed by a patient, caretaker, nurse, pharmacist, physician, or other therapist. Commonly, the term prescription is used to denote a formula for the compounding of a drug to be dispensed to an individual patient.
                <h1>A prescription has several components:</h1>
                <ol>
                    <li>Patient information: name, age, gender, etc.</li>
                    <li>Prescriber information: name, contact details, registration number, etc.</li>
                    <li>Date of prescription</li>
                    <li>Medication details: name, dosage, frequency, route of administration, etc.</li>
                    <li>Instructions for use: how to take the medication</li>
                    <li>Refills: if allowed and how many</li>
                    <li>Signature of the prescriber</li>
                </ol>
                <h2>Methods of prescribing medications include:</h2>
                <ol>
                    <li>Written prescriptions</li>
                    <li>Electronic prescriptions (e-prescriptions)</li>
                    <li>Verbal prescriptions (in emergencies)</li>
                    <li>Fax prescriptions (in some jurisdictions)</li>
                    <li>Printed prescriptions for non-controlled substances (in some jurisdictions)</li>
                </ol>
            </p>
            <div className='mt-20 text-center'>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Back to Dashboard
                </button>
                </Link>
            </div>
        </div>
    </div>
  </div>
  )
};