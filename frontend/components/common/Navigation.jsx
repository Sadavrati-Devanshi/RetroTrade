import React from 'react';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-4 px-6 lg:px-16 border-b border-amber-200 bg-amber-50 shadow-sm fixed w-full z-10">
      <div className="flex items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 text-transparent bg-clip-text">RetroTrade</span>
      </div>
      
      <div className="hidden lg:flex items-center space-x-8">
        <a href="#" className="text-amber-800 hover:text-amber-500 transition-colors">Shop</a>
        <a href="#" className="text-amber-800 hover:text-amber-500 transition-colors">Sell</a>
        <a href="#" className="text-amber-800 hover:text-amber-500 transition-colors">About</a>
        <a href="#" className="text-amber-800 hover:text-amber-500 transition-colors">Contact</a>
      </div>
      
      <div className="hidden lg:flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-amber-600 hover:text-amber-500">
          <Search size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-600 hover:text-amber-500">
          <Heart size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-600 hover:text-amber-500">
          <ShoppingBag size={20} />
        </Button>
        <Button
          variant="outline"
          className="border-amber-400 text-amber-600 hover:bg-amber-50"
          onClick={() => navigate("/auth/login")}
        >
          <User size={18} className="mr-2" /> Log In
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden text-amber-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
    </nav>
  );
}; 