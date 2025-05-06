
import React from 'react';
import ChatbotWidget from '@/components/ChatbotWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <header className="py-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-ism-blue flex items-center justify-center rounded-full text-white font-bold text-sm">
              ISM
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-ism-blue">Indian Institute of Technology (ISM) Dhanbad</h1>
              <p className="text-sm text-gray-600">धनबाद भारतीय प्रौद्योगिकी संस्थान</p>
            </div>
          </div>
        </header>

        <main className="py-8">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-ism-blue">Welcome to IIT ISM Dhanbad Demo Page</h2>
            <p className="text-gray-700">
              This is a demonstration page for the ISMBUDDY chatbot. In a real implementation, this would be integrated with your actual website content. The ISMBUDDY chatbot is accessible from the bottom-right corner of the page.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-ism-blue">Academics</h3>
              <p className="text-gray-600">Information about academic programs, departments, and courses offered at IIT ISM Dhanbad.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-ism-blue">Research</h3>
              <p className="text-gray-600">Explore research areas, publications, and innovation projects at our institution.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-ism-blue">Admissions</h3>
              <p className="text-gray-600">Details about admission processes, eligibility criteria, and important dates.</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-bold mb-4 text-ism-blue">About ISMBUDDY</h2>
            <p className="text-gray-700 mb-4">
              ISMBUDDY is an intelligent chatbot designed to assist students, faculty, prospective students, and visitors of IIT ISM Dhanbad. It provides quick access to information about the institution, its programs, facilities, and services.
            </p>
            <p className="text-gray-700">
              This is a demonstration version of ISMBUDDY. In the complete implementation, it will be connected to a database and language model to provide real-time, accurate information about IIT ISM Dhanbad.
            </p>
          </section>
        </main>

        <footer className="py-6 border-t text-center">
          <p className="text-gray-600">© 2025 Indian Institute of Technology (ISM) Dhanbad. All rights reserved.</p>
        </footer>
      </div>

      <ChatbotWidget />
    </div>
  );
};

export default Index;
