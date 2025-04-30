import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { servicesList } from '../data/navigationData';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Define the type of a service
interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  content: string;
}

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentService = servicesList.find(item => item.id === serviceId) || null;

    if (currentService) {
      setService(currentService);
      document.title = `${currentService.name} | Rise Mars Digital Solutions`;
    } else {
      navigate('/services');
    }

    setLoading(false);
  }, [serviceId, navigate]);

  const currentIndex = servicesList.findIndex(item => item.id === serviceId);
  const prevService = currentIndex > 0 ? servicesList[currentIndex - 1] : null;
  const nextService = currentIndex < servicesList.length - 1 ? servicesList[currentIndex + 1] : null;

  if (loading || !service) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-skyblue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section
        className="bg-gradient-to-r from-primary-800 to-skyblue-800 text-white py-20 md:py-28 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 59, 102, 0.85), rgba(12, 154, 239, 0.85)), url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center text-skyblue-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {service.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary-800 prose-a:text-skyblue-600 prose-a:no-underline hover:prose-a:text-skyblue-700">
              <ReactMarkdown>{service.content}</ReactMarkdown>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-heading font-bold mb-6 text-primary-800">
                Why Choose Our {service.name} Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BenefitItem text="Data-driven approach for measurable results" />
                <BenefitItem text="Experienced specialists in this field" />
                <BenefitItem text="Customized strategies for your business goals" />
                <BenefitItem text="Transparent reporting and communication" />
                <BenefitItem text="Ongoing optimization for maximum ROI" />
                <BenefitItem text="Integrated with your overall marketing plan" />
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-skyblue-600 to-primary-700 text-white rounded-xl">
              <h3 className="text-2xl font-heading font-bold mb-4">
                Ready to get started with our {service.name} service?
              </h3>
              <p className="text-gray-200 mb-6">
                Contact us today to discuss how we can help your business achieve its goals.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-primary-800 hover:bg-gray-100 font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Service Navigation */}
            <div className="mt-12 flex justify-between border-t border-gray-200 pt-6">
              {prevService ? (
                <Link
                  to={`/services/${prevService.id}`}
                  className="inline-flex items-center text-skyblue-600 hover:text-skyblue-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> {prevService.name}
                </Link>
              ) : (
                <div />
              )}

              {nextService && (
                <Link
                  to={`/services/${nextService.id}`}
                  className="inline-flex items-center text-skyblue-600 hover:text-skyblue-700 transition-colors"
                >
                  {nextService.name} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-primary-800">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesList
                .filter(item => item.id !== serviceId)
                .slice(0, 3)
                .map(item => (
                  <Link
                    key={item.id}
                    to={`/services/${item.id}`}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <h3 className="text-lg font-heading font-semibold mb-2 text-primary-800 group-hover:text-skyblue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <span className="inline-flex items-center text-skyblue-600 text-sm font-medium group-hover:text-skyblue-700 transition-colors">
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ✅ Typed BenefitItem component
const BenefitItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-skyblue-100 flex items-center justify-center mt-1 mr-3">
        <Check className="h-3 w-3 text-skyblue-600" />
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default ServiceDetail;
