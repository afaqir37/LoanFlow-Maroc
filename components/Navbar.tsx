import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Landmark } from 'lucide-react';

const NavLinks = ({ isTransparent }: { isTransparent?: boolean }) => {
  const linkStyle = (isActive: boolean) => {
    const baseClasses = `
      relative px-4 py-2 font-medium transition-colors duration-300
      after:content-[''] after:absolute after:left-0 after:bottom-[6px]
      after:h-[2px] after:bg-maroc-red
      after:transition-[width] after:duration-300
    `;
    
    if (isActive) {
      return `${baseClasses} after:hidden ${isTransparent ? 'text-white' : 'text-maroc-red'}`;
    }
    
    return `${baseClasses} after:w-0 hover:after:w-full ${
      isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-maroc-red'
    }`;
  };

  const activeLinkStyle = {
    textDecoration: 'underline',
    textDecorationColor: '#c1272d',
    textUnderlineOffset: '6px',
    textDecorationThickness: '2px',
  };

  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => linkStyle(isActive)}
        style={({ isActive }) => (isActive ? activeLinkStyle : {})}
      >
        Accueil
      </NavLink>
      <NavLink
        to="/calculateur"
        className={({ isActive }) => linkStyle(isActive)}
        style={({ isActive }) => (isActive ? activeLinkStyle : {})}
      >
        Calculateur
      </NavLink>
      <NavLink
        to="/guide"
        className={({ isActive }) => linkStyle(isActive)}
        style={({ isActive }) => (isActive ? activeLinkStyle : {})}
      >
        Guide des Prêts
      </NavLink>
    </>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(true);
    }
  }, [isHomePage]);

  const isTransparent = isHomePage && !isScrolled;

  // Header background classes
  const headerClasses = isTransparent
    ? 'bg-transparent'
    : 'bg-white/90 backdrop-blur-lg shadow-md';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 no-print transition-all duration-300 ${headerClasses}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <Landmark className={`h-8 w-8 transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-maroc-green'
          }`} />
          <span className={`font-display font-bold text-2xl transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-gray-800'
          }`}>
            LoanFlow <span className="text-maroc-red">Maroc</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLinks isTransparent={isTransparent} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`focus:outline-none transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-gray-800'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-md">
          <div className="flex flex-col items-center py-4 space-y-2">
            <NavLinks isTransparent={false} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;