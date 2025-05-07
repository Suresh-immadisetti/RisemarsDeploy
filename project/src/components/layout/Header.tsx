// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, X } from 'lucide-react';

import Logo from '../../assets/rise-mark-logo-white.png';
import { servicesList, industriesList } from '../../data/navigationData';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  hasDropdown?: boolean;
  isOpen?: boolean;
}

interface MobileNavLinkProps {
  to: string;
  label: string;
  isSubmenu?: boolean;
  onClick: () => void;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.img
            src={Logo}
            alt="Rise Mars Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-20"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" isActive={location.pathname === '/'} />
          <NavLink to="/about" label="About Us" isActive={location.pathname === '/about'} />

          {/* Services Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <NavLink
              to="/services"
              label="Services"
              isActive={location.pathname.includes('/services')}
              hasDropdown
              isOpen={servicesOpen}
            />
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  {servicesList.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-skyblue-50 hover:text-skyblue-600 transition-colors duration-200"
                    >
                      {service.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <NavLink
              to="/industries"
              label="Industries"
              isActive={location.pathname.includes('/industries')}
              hasDropdown
              isOpen={industriesOpen}
            />
            <AnimatePresence>
              {industriesOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  {industriesList.map((industry) => (
                    <Link
                      key={industry.id}
                      to={`/industries/${industry.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-skyblue-50 hover:text-skyblue-600 transition-colors duration-200"
                    >
                      {industry.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/contact" label="Contact Us" isActive={location.pathname === '/contact'} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-white z-40 md:hidden"
          >
            <div className="flex flex-col py-6 px-4 space-y-4">
              <MobileNavLink to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink to="/about" label="About Us" onClick={() => setMobileMenuOpen(false)} />

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="w-full text-left px-3 py-2 text-lg font-medium text-primary-800 hover:text-skyblue-500 flex justify-between items-center"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Services
                  <span className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-2 mt-2"
                    >
                      {servicesList.map((service) => (
                        <MobileNavLink
                          key={service.id}
                          to={`/services/${service.id}`}
                          label={service.name}
                          isSubmenu
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Industries Dropdown */}
              <div>
                <button
                  className="w-full text-left px-3 py-2 text-lg font-medium text-primary-800 hover:text-skyblue-500 flex justify-between items-center"
                  onClick={() => setIndustriesOpen(!industriesOpen)}
                >
                  Industries
                  <span className={`transform transition-transform ${industriesOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <AnimatePresence>
                  {industriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-2 mt-2"
                    >
                      {industriesList.map((industry) => (
                        <MobileNavLink
                          key={industry.id}
                          to={`/industries/${industry.id}`}
                          label={industry.name}
                          isSubmenu
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink to="/contact" label="Contact Us" onClick={() => setMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop NavLink
const NavLink: React.FC<NavLinkProps> = ({ to, label, isActive, hasDropdown = false, isOpen = false }) => (
  <Link
    to={to}
    className={`text-base font-medium relative ${
      isActive ? 'text-skyblue-500' : 'text-primary-800'
    } hover:text-skyblue-400 transition-colors duration-200 group`}
  >
    <span className="flex items-center">
      {label}
      {hasDropdown && (
        <span className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      )}
    </span>
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-skyblue-500 transform origin-left transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    ></span>
  </Link>
);

// Mobile NavLink
const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, isSubmenu = false, onClick }) => (
  <Link
    to={to}
    className={`${
      isSubmenu ? 'text-base text-primary-700' : 'text-lg font-medium text-primary-800'
    } px-3 py-2 block hover:text-skyblue-500 transition-colors duration-200`}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;