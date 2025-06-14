
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full relative flex flex-col bg-[#1d515f] text-white">
      {/* Background Image */}
      

    
      

      {/* Hero Section */}
      <header className="relative z-10 h-screen flex flex-col">
        {/* Navbar */}
        <nav className="w-full flex justify-between items-center  border-b-black border-b-1 px-8 py-4">
          <div className="text-2xl  font-extrabold">DevTinder</div>
          <div className="space-x-4  flex gap-3 rounded-full ">
            <Link to="/login" className="hover:text-gray-300 px-6 rounded-full py-2 text-lg bg-designColor font-bold">Sign up</Link>
           
            <Link to="/login" className="hover:text-gray-300 rounded-full px-6 py-2 text-lg bg-designColor font-bold">Login</Link>
            
          </div>
        </nav>

        {/* Hero Text */}
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Connect. Collaborate. Code.</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Meet developers, build connections, and collaborate on real-world projects.
          </p>
          <Link to="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full text-lg">
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-6 md:px-20 text-center backdrop-brightness-75">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Why DevTinder</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-800  bg-opacity-20 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Match with Developers</h3>
            <p>Swipe and connect with like-minded developers looking for collaboration.</p>
          </div>
          <div className="bg-gray-800 text-white bg-opacity-20 p-6 rounded-2xl shadow-lg ">
            <h3 className="text-xl font-semibold mb-2">Real-Time Chat</h3>
            <p>Use our built-in chat to brainstorm, share ideas, and code together in real-time.</p>
          </div>
          <div className="bg-gray-800 bg-opacity-20 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Build Your Profile</h3>
            <p>Showcase your skills, GitHub projects, and experience to attract great teammates.</p>
          </div>
        </div>
      </section>
      {/* Footer */}

      <footer className='bg-black text-white py-8 px-6 md:px-20 mt-auto z-20'>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} DevTinder. All rights reserved.</p>
          <div className="space-x-4 text-sm">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default LandingPage;
