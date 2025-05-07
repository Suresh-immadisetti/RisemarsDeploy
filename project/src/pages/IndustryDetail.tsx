import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { industriesList, servicesList } from '../data/navigationData';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Define the type for an Industry
interface Industry {
  id: string;
  name: string;
  image: string;
  content: string;
}

const IndustryDetail: React.FC = () => {
  const { industryId } = useParams<{ industryId: string }>();
  const navigate = useNavigate();
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentIndustry = industriesList.find(item => item.id === industryId) || null;

    if (currentIndustry) {
      setIndustry(currentIndustry);
      document.title = `${currentIndustry.name} | RunsEra Digital Solutions`;
    } else {
      navigate('/industries');
    }

    setLoading(false);
  }, [industryId, navigate]);

  const currentIndex = industriesList.findIndex(item => item.id === industryId);
  const prevIndustry = currentIndex > 0 ? industriesList[currentIndex - 1] : null;
  const nextIndustry = currentIndex < industriesList.length - 1 ? industriesList[currentIndex + 1] : null;

  if (loading || !industry) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-skyblue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading industry information...</p>
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
          backgroundImage: `linear-gradient(to right, rgba(0, 59, 102, 0.85), rgba(12, 154, 239, 0.85)), url(${industry.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/industries"
            className="inline-flex items-center text-skyblue-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Industries
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {industry.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
              Specialized digital marketing solutions for the {industry.name.toLowerCase()} sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary-800 prose-a:text-skyblue-600 prose-a:no-underline hover:prose-a:text-skyblue-700">
              <ReactMarkdown>{industry.content}</ReactMarkdown>
            </div>

            {/* Key Services */}
            <div className="mt-12">
              <h3 className="text-2xl font-heading font-bold mb-6 text-primary-800">
                Key Services for {industry.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicesList.slice(0, 4).map(service => (
                  <div
                    key={service.id}
                    className="bg-gray-50 p-6 rounded-lg border-l-4 border-skyblue-500"
                  >
                    <h4 className="text-lg font-heading font-semibold mb-2 text-primary-800">{service.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center text-skyblue-600 text-sm font-medium hover:text-skyblue-700 transition-colors"
                    >
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study (placeholder) */}
            <div className="mt-12 bg-gradient-to-r from-skyblue-50 to-primary-50 p-8 rounded-xl">
              <h3 className="text-2xl font-heading font-bold mb-4 text-primary-800">Success Story</h3>
              <p className="text-gray-700 mb-4">
                See how we helped a leading {industry.name.toLowerCase()} business achieve outstanding results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-skyblue-600 mb-2">250%</p>
                  <p className="text-gray-600 text-sm">Increase in Organic Traffic</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-skyblue-600 mb-2">45%</p>
                  <p className="text-gray-600 text-sm">Improvement in Conversion Rate</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-skyblue-600 mb-2">3.2x</p>
                  <p className="text-gray-600 text-sm">Return on Ad Spend</p>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-skyblue-600 hover:bg-skyblue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  Read Full Case Study
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-skyblue-600 to-primary-700 text-white rounded-xl">
              <h3 className="text-2xl font-heading font-bold mb-4">
                Ready to grow your {industry.name.toLowerCase()} business?
              </h3>
              <p className="text-gray-200 mb-6">Contact us today to discuss your specific needs and challenges.</p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-primary-800 hover:bg-gray-100 font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Industry Navigation */}
            <div className="mt-12 flex justify-between border-t border-gray-200 pt-6">
              {prevIndustry ? (
                <Link
                  to={`/industries/${prevIndustry.id}`}
                  className="inline-flex items-center text-skyblue-600 hover:text-skyblue-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> {prevIndustry.name}
                </Link>
              ) : (
                <div />
              )}
              {nextIndustry && (
                <Link
                  to={`/industries/${nextIndustry.id}`}
                  className="inline-flex items-center text-skyblue-600 hover:text-skyblue-700 transition-colors"
                >
                  {nextIndustry.name} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-primary-800">Other Industries We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industriesList
                .filter(item => item.id !== industryId)
                .slice(0, 3)
                .map(item => (
                  <Link
                    key={item.id}
                    to={`/industries/${item.id}`}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <h3 className="text-lg font-heading font-semibold mb-2 text-primary-800 group-hover:text-skyblue-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="inline-flex items-center text-skyblue-600 text-sm font-medium group-hover:text-skyblue-700 transition-colors mt-2">
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

export default IndustryDetail;
