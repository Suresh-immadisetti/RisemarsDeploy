import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { industriesList } from '../data/navigationData';

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

// ✅ Type definitions for component props
interface IndustryCardProps {
  id: string;
  title: string;
  image: string;
}

interface ApproachCardProps {
  number: string;
  title: string;
  description: string;
}

const Industries: React.FC = () => {
  const headerControls = useAnimation();
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const industriesControls = useAnimation();
  const [industriesRef, industriesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerControls, headerInView]);

  useEffect(() => {
    if (industriesInView) industriesControls.start('visible');
  }, [industriesControls, industriesInView]);

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section
        ref={headerRef}
        className="relative bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/mumbai-skyline-skyscrapers-construction_469504-21.jpg?ga=GA1.1.1955968501.1745332100&semt=ais_hybrid&w=740')",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-28 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate={headerControls}
            variants={fadeInUp}
          >
            <span className="inline-block px-3 py-1 bg-skyblue-700 text-white rounded-full text-sm font-medium mb-6">
              Industries We Serve
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Specialized <span className="text-skyblue-300">Expertise</span>
            </h1>
            <p className="text-xl text-gray-200">
              We understand the unique challenges and opportunities in different industries and tailor our digital marketing solutions accordingly.
            </p>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="relative h-16 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none">
            <path d="M0,37 C240,74 480,74 720,37 C960,0 1200,0 1440,37 L1440,74 L0,74 Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* Industries List */}
      <section className="py-20 bg-gray-50" ref={industriesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate={industriesControls}
            variants={staggerContainer}
          >
            {industriesList.map((industry) => (
              <IndustryCard
                key={industry.id}
                id={industry.id}
                title={industry.name}
                image={industry.image}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary-800">
              Industry-Specific Solutions
            </h2>
            <p className="text-gray-600 text-lg">
              How we tailor our digital marketing strategies to different industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ApproachCard
              number="01"
              title="Industry Analysis"
              description="We study industry trends, challenges, and best practices to inform our strategy development."
            />
            <ApproachCard
              number="02"
              title="Custom Strategy"
              description="We create tailored digital marketing plans that address your industry's unique requirements."
            />
            <ApproachCard
              number="03"
              title="Specialized Execution"
              description="Our team applies industry-specific expertise to implement effective marketing campaigns."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-skyblue-600 to-primary-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Partner with Industry Experts?
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Let's discuss how our industry-specific digital marketing solutions can drive results for your business.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-800 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-transform transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

// ✅ IndustryCard with props typed
const IndustryCard: React.FC<IndustryCardProps> = ({ id, title, image }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
  >
    <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
    <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-heading font-semibold mb-3 text-primary-800">{title}</h3>
        <p className="text-gray-600 mb-4">
          Specialized digital marketing strategies tailored for the {title.toLowerCase()} sector.
        </p>
      </div>
      <Link
        to={`/industries/${id}`}
        className="inline-flex items-center text-skyblue-600 font-medium hover:text-skyblue-700 transition-colors mt-2"
      >
        Learn More <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);

// ✅ ApproachCard with props typed
const ApproachCard: React.FC<ApproachCardProps> = ({ number, title, description }) => (
  <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
    <div className="text-3xl font-bold text-skyblue-500 mb-4">{number}</div>
    <h3 className="text-xl font-heading font-semibold mb-3 text-primary-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Industries;
