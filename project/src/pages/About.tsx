import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Users, BarChart, Lightbulb, Award, Clock, Target } from 'lucide-react';

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
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const headerControls = useAnimation();

  const [storyRef, storyInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const storyControls = useAnimation();

  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const valuesControls = useAnimation();

  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const teamControls = useAnimation();

  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerControls, headerInView]);

  useEffect(() => {
    if (storyInView) storyControls.start('visible');
  }, [storyControls, storyInView]);

  useEffect(() => {
    if (valuesInView) valuesControls.start('visible');
  }, [valuesControls, valuesInView]);

  useEffect(() => {
    if (teamInView) teamControls.start('visible');
  }, [teamControls, teamInView]);

  return (
    <div className="pt-16">

      {/* Header with Background Image */}
      <section className="relative text-white" ref={headerRef}>
        <div className="absolute inset-0">
          <img
            src="https://img.freepik.com/free-photo/futuristic-business-scene-with-ultra-modern-ambiance_23-2151003776.jpg?ga=GA1.1.1955968501.1745332100&semt=ais_hybrid&w=740"
            alt="Header Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={headerControls}
            variants={fadeInUp}
          >
            <span className="inline-block px-3 py-1 bg-skyblue-700 rounded-full text-sm mb-6">About Us</span>
            <h1 className="text-5xl font-bold mb-6">
              Innovate. Create. <span className="text-skyblue-300">Elevate.</span>
            </h1>
            <p className="text-xl text-gray-200">
              Performance-driven digital marketing that fuels growth, engagement, and real results.
            </p>
          </motion.div>
        </div>
        <div className="relative h-16 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none">
            <path d="M0,37 C240,74 480,74 720,37 C960,0 1200,0 1440,37 L1440,74 L0,74 Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50" ref={storyRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row gap-10 items-center"
            initial="hidden"
            animate={storyControls}
            variants={staggerContainer}
          >
            <motion.div className="w-full md:w-1/2 relative" variants={fadeInUp}>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" alt="Team" className="w-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-skyblue-800/30 to-primary-800/30"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-skyblue-500 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-500 rounded-lg -z-10"></div>
            </motion.div>
            <motion.div className="w-full md:w-1/2" variants={fadeInUp}>
              <span className="inline-block px-3 py-1 bg-skyblue-100 text-skyblue-800 rounded-full text-sm mb-4">Our Story</span>
              <h2 className="text-4xl font-bold text-primary-800 mb-6">About RunsEra Digital Solutions</h2>
              <div className="text-gray-700 space-y-4">
                <p><b>Runsera Digital Solutions Pvt. Ltd. is a modern digital-first agency born from the vision of empowering brands to thrive in the ever-evolving digital world. Founded in Hyderabad and serving clients across India, we specialize in result-driven services such as SEO, Google & Meta Ads, Website Design & Development, Social Media Management, Content Creation, Email Marketing, Influencer Outreach, and Brand Identity.</b></p>
                <p><b>The name Runsera represents “Runs into a New Era” — and that's exactly what we help businesses do. With a curated team of expert freelancers, designers, developers, and marketers, Runsera offers agency-quality work with the flexibility and personal touch of a startup.</b></p>
                <p><b>Whether you're launching a new brand or looking to scale an existing business, we build tailored digital strategies that help you stand out, grow faster, and connect deeply with your audience.</b></p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" initial="hidden" animate={valuesControls} variants={fadeInUp}>
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm mb-4">Our Values</span>
            <h2 className="text-4xl font-bold text-primary-800 mb-4">What Drives Us</h2>
            <p className="text-lg text-gray-600">The core principles that guide our work and define our culture.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" animate={valuesControls} variants={staggerContainer}>
            <ValueCard icon={<Rocket className="h-10 w-10 text-skyblue-500" />} title="Innovation" description="Exploring new tech and ideas to keep our clients ahead." />
            <ValueCard icon={<BarChart className="h-10 w-10 text-skyblue-500" />} title="Data-Driven" description="Smart decisions backed by measurable outcomes." />
            <ValueCard icon={<Lightbulb className="h-10 w-10 text-skyblue-500" />} title="Creativity" description="Fresh ideas that combine art and science." />
            <ValueCard icon={<Users className="h-10 w-10 text-skyblue-500" />} title="Partnership" description="Aligned with your goals as an extension of your team." />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 space-y-24">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div>
              <h3 className="text-5xl font-extrabold text-primary-800 mb-6">Our Mission</h3>
              <p className="text-xl text-gray-700">
                <b>To empower businesses of all sizes with innovative, data-driven digital solutions that build strong brands, accelerate growth, and deliver measurable results across digital platforms</b>
              </p>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" alt="Mission" className="rounded-xl shadow-lg w-full" />
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="order-2 md:order-1">
              <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" alt="Vision" className="rounded-xl shadow-lg w-full" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-5xl font-extrabold text-skyblue-700 mb-6">Our Vision</h3>
              <p className="text-xl text-gray-700">
                <b>To help businesses launch and grow in the digital universe through data-driven campaigns, futuristic storytelling, and performance-driven solutions that spark real results.</b>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white" ref={teamRef}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" initial="hidden" animate={teamControls} variants={fadeInUp}>
            <span className="inline-block px-3 py-1 bg-skyblue-100 text-skyblue-800 rounded-full text-sm mb-4">Why Choose RunsEra</span>
            <h2 className="text-4xl font-bold text-primary-800 mb-4">The RunsEra Difference</h2>
            <p className="text-lg text-gray-600">What sets us apart from other digital marketing agencies.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" animate={teamControls} variants={staggerContainer}>
            <ReasonCard icon={<Award className="h-10 w-10 text-skyblue-500" />} title="Expert Team" description="Specialists across all key areas of digital marketing." />
            <ReasonCard icon={<Target className="h-10 w-10 text-skyblue-500" />} title="Results-Focused" description="We focus on results, not vanity metrics." />
            <ReasonCard icon={<Clock className="h-10 w-10 text-skyblue-500" />} title="Responsive Support" description="We prioritize communication and fast responses." />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-skyblue-600 to-primary-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">Partner with RunsEra to create impactful digital experiences that drive real business results.</p>
          <Link to="/contact" className="bg-white text-primary-800 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition-transform transform hover:scale-105">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

// Components
type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard: React.FC<CardProps> = ({ icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition duration-300 text-center"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-primary-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ReasonCard: React.FC<CardProps> = ({ icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-gray-50 rounded-xl p-6 hover:bg-skyblue-50 transition duration-300"
  >
    <div className="flex items-start gap-4">
      <div>{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-primary-800 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  </motion.div>
);


export default About;
