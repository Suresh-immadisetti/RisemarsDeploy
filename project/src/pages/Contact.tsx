import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm, SubmitHandler, FieldErrors, FieldValues } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  AlertCircle,
  Linkedin,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();

  const headerControls = useAnimation();
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const formControls = useAnimation();
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerControls, headerInView]);

  useEffect(() => {
    if (formInView) formControls.start('visible');
  }, [formControls, formInView]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.log('Form errors:', errors);
    setSubmitError(true);
    setTimeout(() => setSubmitError(false), 5000);
  };

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-primary-800 text-white" ref={headerRef}>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={headerControls}
            variants={fadeInUp}
          >
            <span className="inline-block px-3 py-1 bg-skyblue-700 text-white rounded-full text-sm font-medium mb-6">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Let's <span className="text-skyblue-300">Connect</span>
            </h1>
            <p className="text-xl text-gray-200">
              Ready to take your digital marketing to the next level? We're here to help you succeed.
            </p>
          </motion.div>
        </div>
        
        {/* Wave separator */}
        <div className="relative h-16 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,37 C240,74 480,74 720,37 C960,0 1200,0 1440,37 L1440,74 L0,74 Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-50" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              initial="hidden"
              animate={formControls}
              variants={fadeInUp}
            >
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary-800">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                </p>
                
                <div className="space-y-6 mb-8">
                  <ContactInfo 
                    icon={<Phone className="h-6 w-6 text-skyblue-500" />}
                    title="Phone"
                    details="+91 8309583591"
                    link="tel:+918309583591"
                  />
                  <ContactInfo 
                    icon={<Mail className="h-6 w-6 text-skyblue-500" />}
                    title="Email"
                    details="info.risemars@gmail.com"
                    link="mailto:info.risemars@gmail.com"
                  />
                  <ContactInfo 
                    icon={<MapPin className="h-6 w-6 text-skyblue-500" />}
                    title="Address"
                    details="Hyderabad, India"
                    link="https://maps.google.com/?q=Hyderabad,India"
                  />
                </div>
                
                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary-800">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <SocialLink icon={<Facebook size={20} />} href="https://facebook.com" />
                    <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" />
                    <SocialLink icon={<Instagram size={20} />} href="https://instagram.com" />
                    <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com" />
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-heading font-bold mb-6 text-primary-800">Send Us a Message</h2>
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
                    <Check className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm">We'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">There was a problem sending your message.</p>
                      <p className="text-sm">Please check the form and try again.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-skyblue-500 focus:border-skyblue-500 outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                        {...register("name", { 
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                          }
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                      )}
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-skyblue-500 focus:border-skyblue-500 outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-skyblue-500 focus:border-skyblue-500 outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+91 1234567890"
                        {...register("phone", { 
                          pattern: {
                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
                            message: "Invalid phone number"
                          }
                        })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-skyblue-500 focus:border-skyblue-500 outline-none transition-colors ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="How can we help you?"
                        {...register("subject", { 
                          required: "Subject is required"
                        })}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-skyblue-500 focus:border-skyblue-500 outline-none transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your message here..."
                      {...register("message", { 
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters"
                        }
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-skyblue-600 hover:bg-skyblue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6 text-primary-800">Find Us</h2>
            <div className="h-80 bg-gray-200 rounded-xl overflow-hidden">
              {/* Placeholder for map - would integrate Google Maps here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">
                  <MapPin className="h-10 w-10 inline-block mb-2" />
                  <br />
                  Interactive Map Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center text-primary-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FaqItem 
                question="How quickly can you start working on my project?" 
                answer="We can typically begin work within 1-2 weeks of finalizing the contract. For urgent projects, we may be able to accommodate a faster timeline." 
              />
              <FaqItem 
                question="Do you offer ongoing support?" 
                answer="Yes, we offer various support packages to ensure your digital marketing efforts continue to yield results over time. Our team provides regular reporting and strategy adjustments as needed." 
              />
              <FaqItem 
                question="What industries do you specialize in?" 
                answer="We work with clients across multiple industries including e-commerce, real estate, healthcare, education, technology, and local businesses. Our diverse experience allows us to apply proven strategies while tailoring our approach to your specific industry." 
              />
              <FaqItem 
                question="How do you measure success?" 
                answer="We establish clear KPIs at the beginning of each engagement, which may include metrics like traffic growth, conversion rates, lead generation, social engagement, and ROI. We provide regular reports to track progress against these goals." 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Info Component
type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  details: string;
  link: string;
};

const ContactInfo = ({ icon, title, details, link }: ContactInfoProps) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-skyblue-100 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-primary-800 mb-1">{title}</h3>
        <a 
          href={link} 
          className="text-gray-600 hover:text-skyblue-600 transition-colors"
          target={title === 'Address' ? '_blank' : undefined}
          rel={title === 'Address' ? 'noopener noreferrer' : undefined}
        >
          {details}
        </a>
      </div>
    </div>
  );
};

// Social Media Link Component
type SocialLinkProps = {
  icon: React.ReactNode;
  href: string;
};

const SocialLink = ({ icon, href }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full bg-skyblue-100 hover:bg-skyblue-200 flex items-center justify-center text-skyblue-700 transition-colors duration-200"
    >
      {icon}
    </a>
  );
};

// FAQ Item Component
type FaqItemProps = {
  question: string;
  answer: string;
};

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-heading font-medium text-primary-800">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-skyblue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="p-4 pt-0 text-gray-600 border-t">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Contact;