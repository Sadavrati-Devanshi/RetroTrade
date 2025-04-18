import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const MobileMenu = () => {
  return (
    <div className="flex flex-col space-y-6 mt-8">
      <a href="#" className="text-xl py-2 border-b border-amber-100 text-amber-800">Home</a>
      <Link to="/auth/register" className="text-xl py-2 border-b border-amber-100 text-amber-800">Shop</Link>
      <Link to="/auth/register" className="text-xl py-2 border-b border-amber-100 text-amber-800">Sell</Link>
      <Link to="/about" className="text-xl py-2 border-b border-amber-100 text-amber-800">About</Link>
      <a href="#" className="text-xl py-2 border-b border-amber-100 text-amber-800">Contact</a>
      <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white">Log In / Sign Up</Button>
    </div>
  );
}; 