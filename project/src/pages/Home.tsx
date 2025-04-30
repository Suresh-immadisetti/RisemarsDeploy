import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  RocketIcon, 
  TrendingUp, 
  Monitor, 
  Users, 
  Target, 
  Building, 
  ArrowRight 
} from 'lucide-react';

// Import service and industry data
import { servicesList, industriesList } from '../data/navigationData';

// Type definitions
interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface IndustryCardProps {
  id: string;
  title: string;
  image: string;
}

// Animation variants with proper typing
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, image }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Service+Image';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-primary-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={`/services/${id}`}
          className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors"
        >
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

// Industry Card Component
const IndustryCard: React.FC<IndustryCardProps> = ({ id, title, image }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="relative rounded-xl overflow-hidden h-64 group"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Industry+Image';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <Link
          to={`/industries/${id}`}
          className="inline-flex items-center text-skyblue-300 font-medium hover:text-white transition-colors"
        >
          Explore <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

const Home = () => {
  // State for service slider
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  
  // Animation controls
  const heroControls = useAnimation();
  const servicesControls = useAnimation();
  const industriesControls = useAnimation();
  const missionControls = useAnimation();
  
  // Intersection observers
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [industriesRef, industriesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Start hero animation immediately
  useEffect(() => {
    heroControls.start('visible');
  }, [heroControls]);

  // Service slider automation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceIndex((prev) => 
        prev === servicesList.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Start section animations when they come into view
  useEffect(() => {
    if (servicesInView) servicesControls.start('visible');
    if (industriesInView) industriesControls.start('visible');
    if (missionInView) missionControls.start('visible');
  }, [servicesInView, industriesInView, missionInView, servicesControls, industriesControls, missionControls]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-primary-800 to-skyblue-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80)',
              backgroundBlendMode: 'overlay',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800/90 to-skyblue-800/90" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={heroControls}
            variants={fadeInUp}
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
            >
              <RocketIcon className="h-16 w-16 text-skyblue-300" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Launch Your Brand to <span className="text-skyblue-300">New Heights</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-gray-200"
              variants={fadeInUp}
            >
              Performance-driven digital marketing that fuels growth, engagement, and real results.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link
                to="/contact"
                className="bg-skyblue-500 hover:bg-skyblue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/services"
                className="bg-transparent border-2 border-white hover:border-skyblue-300 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:text-skyblue-300"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Service Slider */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-skyblue-100 text-skyblue-800 rounded-full text-sm font-medium mb-4">Featured Services</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-800">What We Offer</h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentServiceIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                    <img 
                      src={servicesList[currentServiceIndex].image} 
                      alt={servicesList[currentServiceIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-heading font-bold mb-4 text-primary-800">
                      {servicesList[currentServiceIndex].name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {servicesList[currentServiceIndex].description}
                    </p>
                    <Link
                      to={`/services/${servicesList[currentServiceIndex].id}`}
                      className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Slider Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {servicesList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentServiceIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentServiceIndex ? 'bg-skyblue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Discover More Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50" ref={servicesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            animate={servicesControls}
            variants={fadeInUp}
          >
            <span className="inline-block px-3 py-1 bg-skyblue-100 text-skyblue-800 rounded-full text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary-800">Digital Marketing Solutions</h2>
            <p className="text-gray-600 text-lg">Comprehensive digital strategies to help your business thrive in the digital landscape.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
          >
            {servicesList.slice(0, 6).map((service) => (
              <ServiceCard 
                key={service.id}
                id={service.id}
                title={service.name}
                description={service.description}
                image={service.image}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            animate={servicesControls}
            variants={fadeInUp}
          >
            <Link
              to="/services"
              className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors"
            >
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white" ref={missionRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row gap-8 items-center"
            initial="hidden"
            animate={missionControls}
            variants={staggerContainer}
          >
            <motion.div 
              className="w-full md:w-1/2"
              variants={fadeInUp}
            >
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">Our Purpose</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary-800">Why Rise Mars?</h2>
              
              {/* Mission */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-skyblue-500 shadow-sm">
                <h3 className="text-xl font-heading font-semibold mb-3 text-primary-700">Mission</h3>
                <p className="text-gray-700">
                  To become a globally recognized digital powerhouse that transforms
                  brands through innovation, creativity, and bold marketing strategies
                  inspired by the spirit of Mars.
                </p>
              </div>
              
              {/* Vision */}
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary-500 shadow-sm">
                <h3 className="text-xl font-heading font-semibold mb-3 text-primary-700">Vision</h3>
                <p className="text-gray-700">
                  To help businesses launch and grow in the digital universe through data-driven
                  campaigns, futuristic storytelling, and performance-driven
                  solutions that spark real results.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 bg-gradient-to-br from-skyblue-500 to-primary-600 rounded-xl p-1"
              variants={fadeInUp}
            >
              <div className="bg-white rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <RocketIcon className="h-10 w-10 text-skyblue-500 mr-4" />
                  <h3 className="text-2xl font-heading font-bold text-primary-800">Rise Mars Approach</h3>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <TrendingUp className="h-6 w-6 text-skyblue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-primary-700">Data-Driven Strategy</h4>
                      <p className="text-gray-600">We combine analytics with creativity to create marketing that delivers measurable results.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <Monitor className="h-6 w-6 text-skyblue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-primary-700">Cutting-Edge Technology</h4>
                      <p className="text-gray-600">We leverage the latest tools and platforms to keep your marketing ahead of the curve.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <Users className="h-6 w-6 text-skyblue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-primary-700">Client Partnership</h4>
                      <p className="text-gray-600">We work as an extension of your team, aligning our strategies with your business goals.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link
                    to="/about"
                    className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors"
                  >
                    Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50" ref={industriesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            animate={industriesControls}
            variants={fadeInUp}
          >
            <span className="inline-block px-3 py-1 bg-skyblue-100 text-skyblue-800 rounded-full text-sm font-medium mb-4">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary-800">Industries We Serve</h2>
            <p className="text-gray-600 text-lg">Specialized knowledge and strategies for businesses across various sectors.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={industriesControls}
            variants={staggerContainer}
          >
            {industriesList.slice(0, 3).map((industry) => (
              <IndustryCard 
                key={industry.id}
                id={industry.id}
                title={industry.name}
                image={industry.image}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            animate={industriesControls}
            variants={fadeInUp}
          >
            <Link
              to="/industries"
              className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors"
            >
              View All Industries <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-skyblue-800 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Launch Your Digital Success?</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Get in touch with us today to discuss how we can help your business reach new heights in the digital landscape.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-800 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors duration-300 inline-block transform hover:scale-105"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;