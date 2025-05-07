import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RocketIcon, Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

// Import navigation data
import { servicesList, industriesList } from '../../data/navigationData';

// Define props interface for SocialLink component
interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const topRef = useRef<HTMLDivElement>(null);

  // Extended services list for the footer
  const footerServices = [
    ...servicesList,
    { id: 'content-creation', name: 'Content Creation' },
    { id: 'web-design-development', name: 'Website Design & Development' },
    { id: 'email-marketing', name: 'Email Marketing & Automation' },
    { id: 'brand-identity', name: 'Brand Identity & Design' },
    { id: 'influencer-marketing', name: 'Influencer Marketing & ORM' }
  ];

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle navigation with smooth scroll
  const handleNavigation = (path: string) => {
    // If it's a hash link (internal page section)
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For regular links, scroll to top first
      scrollToTop();
    }
  };

  return (
    <footer className="bg-primary-800 text-white" ref={topRef}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link 
              to="/" 
              className="flex items-center mb-4"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
                window.location.href = '/';
              }}
            >
              <RocketIcon className="h-6 w-6 text-skyblue-300 mr-2" />
              <span className="text-xl font-bold">
                <span className="text-skyblue-300">Runs</span> Era
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              Runsera Digital Solutions Pvt. Ltd. is a modern digital-first agency born from the vision of empowering brands to thrive in the ever-evolving digital world. Founded in Hyderabad and serving clients across India, we specialize in result-driven services such as SEO, Google & Meta Ads, Website Design & Development, Social Media Management, Content Creation, Email Marketing, Influencer Outreach, and Brand Identity.

              The name Runsera represents "Runs into a New Era" — and that's exactly what we help businesses do. With a curated team of expert freelancers, designers, developers, and marketers, Runsera offers agency-quality work with the flexibility and personal touch of a startup.

              Whether you're launching a new brand or looking to scale an existing business, we build tailored digital strategies that help you stand out, grow faster, and connect deeply with your audience.
            </p>
            <div className="flex space-x-3">
              <SocialLink icon={<Facebook size={18} />} href="https://www.facebook.com/share/18gdvA5zPL/" />
              <SocialLink icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/RunsEradigitalsolutions?igsh=N3hqODR0MjF3dXZh" />
              <SocialLink icon={<Linkedin size={18} />} href="www.linkedin.com/in/runsera-digital-solutions-pvt-ltd-792733364" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-skyblue-300">Our Services</h3>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-300 hover:text-skyblue-300 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTop();
                      setTimeout(() => {
                        window.location.href = `/services/${service.id}`;
                      }, 500);
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTop();
                      setTimeout(() => {
                        window.location.href = `/industries/${industry.id}`;
                      }, 500);
                    }}
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
                <a href="mailto:info@runsera.com" className="hover:text-skyblue-300 transition-colors duration-200">
                  info@runsera.com
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
            © {currentYear} RunsEra Digital Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-sm text-gray-400 hover:text-skyblue-300 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
                setTimeout(() => {
                  window.location.href = '/privacy-policy';
                }, 500);
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-gray-400 hover:text-skyblue-300 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
                setTimeout(() => {
                  window.location.href = '/terms';
                }, 500);
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Media Link component with typed props
const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
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