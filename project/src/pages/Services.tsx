import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { servicesList } from '../data/navigationData';

// Animation variants
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

// Type definitions
interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const headerControls = useAnimation();
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const servicesControls = useAnimation();
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerControls, headerInView]);

  useEffect(() => {
    if (servicesInView) servicesControls.start('visible');
  }, [servicesControls, servicesInView]);

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section
        ref={headerRef}
        className="relative bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/business-partners-handshake-global-corporate-with-technology-concept_53876-102615.jpg?ga=GA1.1.1955968501.1745332100&semt=ais_hybrid&w=740')",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80"></div>
        <div className="relative z-10 container mx-auto px-4 py-28 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate={headerControls}
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-skyblue-700 text-white rounded-full text-lg font-semibold mb-8">
              Our Services
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-8">
              Digital Marketing <span className="text-skyblue-300">Solutions</span>
            </h1>
            <p className="text-2xl text-gray-200 leading-relaxed">
              Comprehensive strategies to help your business thrive in the digital landscape and achieve measurable growth.
            </p>
          </motion.div>
        </div>
        <div className="relative h-16 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none">
            <path d="M0,37 C240,74 480,74 720,37 C960,0 1200,0 1440,37 L1440,74 L0,74 Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50" ref={servicesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
          >
            {servicesList.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.name}
                description={service.description}
                image={service.image}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-lg font-semibold mb-6">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-800">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our proven process ensures consistent results for your digital marketing initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <ProcessStep number="01" title="Discovery" description="We begin by understanding your business, goals, target audience, and current digital presence." />
            <ProcessStep number="02" title="Strategy" description="We develop a customized digital marketing plan aligned with your specific objectives and timeline." />
            <ProcessStep number="03" title="Implementation" description="Our team executes the strategy with precision, creativity, and attention to detail." />
            <ProcessStep number="04" title="Optimization" description="We continuously analyze performance data and refine our approach to maximize results." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-skyblue-600 to-primary-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
            Ready to Elevate Your Digital Marketing?
          </h2>
          <p className="text-2xl text-gray-200 max-w-2xl mx-auto mb-12">
            Let's discuss how our services can help your business achieve its goals in the digital landscape.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-800 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

// Typed ServiceCard component
const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, image }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="h-60 overflow-hidden relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-60"></div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-heading font-semibold mb-4 text-primary-800">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        to={`/services/${id}`}
        className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors"
      >
        Learn More <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  </motion.div>
);

// Typed ProcessStep component
const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => (
  <div className="text-center p-8 relative">
    <div className="text-6xl font-bold text-skyblue-100 mb-6">{number}</div>
    <h3 className="text-2xl font-heading font-semibold mb-4 text-primary-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-gray-200 -z-10">
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-skyblue-500"></div>
    </div>
  </div>
);

export default Services;
