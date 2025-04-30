import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RocketIcon, Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

// Import navigation data
import { servicesList, industriesList } from '../../data/navigationData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <RocketIcon className="h-6 w-6 text-skyblue-300 mr-2" />
              <span className="text-xl font-bold">
                <span className="text-skyblue-300">Rise</span> Mars
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              Performance-driven digital marketing agency based in Hyderabad, helping businesses launch, grow, and lead in the digital space.
            </p>
            <div className="flex space-x-3">
              <SocialLink icon={<Facebook size={18} />} href="https://www.facebook.com/share/18gdvA5zPL/" />
              <SocialLink icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/risemarsdigitalsolutions?igsh=N3hqODR0MjF3dXZh" />
              <SocialLink icon={<Linkedin size={18} />} href="https://www.linkedin.com/in/rise-mars-digital-solutions-86006b361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-skyblue-300">Our Services</h3>
            <ul className="space-y-2">
              {servicesList.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-300 hover:text-skyblue-300 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-skyblue-300">Industries We Serve</h3>
            <ul className="space-y-2">
              {industriesList.map((industry) => (
                <li key={industry.id}>
                  <Link
                    to={`/industries/${industry.id}`}
                    className="text-gray-300 hover:text-skyblue-300 transition-colors duration-200"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-skyblue-300">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-skyblue-300 mt-0.5" />
                <span>+91 8309583591</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-skyblue-300 mt-0.5" />
                <a href="mailto:info.risemars@gmail.com" className="hover:text-skyblue-300 transition-colors duration-200">
                  info.risemars@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-skyblue-300 mt-0.5" />
                <span>Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Rise Mars Digital Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-skyblue-300 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-skyblue-300 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Media Link component
const SocialLink = ({ icon, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center text-white hover:bg-skyblue-500 transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

export default Footer;