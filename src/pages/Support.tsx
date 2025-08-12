import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MessageSquare, Phone, Mail, FileText, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';

export default function Support() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I start a course?",
      answer: "Navigate to your dashboard and click on any available course. You can then click 'Start Course' to begin the first lesson. Your progress will be automatically saved as you complete each lesson."
    },
    {
      question: "What happens if I don't pass the quiz?",
      answer: "Don't worry! You can retake the quiz as many times as needed. We recommend reviewing the course materials before retaking. You need to score at least 80% to earn your certificate."
    },
    {
      question: "How do I download my certificate?",
      answer: "Once you complete a course and pass the final assessment, you'll automatically receive a certificate. You can download it from your dashboard or visit the specific certificate page and click 'Download PDF'."
    },
    {
      question: "Can I access courses on my mobile device?",
      answer: "Yes! Our platform is fully responsive and works on all devices. You can start a course on your computer and continue on your phone or tablet."
    },
    {
      question: "How long do I have to complete a course?",
      answer: "There's no time limit to complete courses. You can learn at your own pace and your progress is saved automatically. However, we recommend completing courses within 30 days for the best learning experience."
    },
    {
      question: "Are my certificates recognized by employers?",
      answer: "Yes! Our safety training certificates are industry-recognized and meet OSHA standards. Many employers accept our certifications as proof of safety training completion."
    },
    {
      question: "What if I have technical issues?",
      answer: "If you experience any technical problems, please contact our support team using the form below. Include details about the issue and your browser/device information for faster resolution."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send the form to your support system
    alert('Thank you for your message! Our support team will get back to you within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help You?</h1>
          <p className="text-lg text-gray-600">Find answers to common questions or get in touch with our support team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {selectedFaq === index ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {selectedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
            
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">Live Chat</h3>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <Phone className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                <p className="text-sm text-gray-600">1-800-SAFETY-1</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <Mail className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-600">support@safetytrainpro.com</p>
              </div>
            </div>

            {/* Support Form */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactForm.category}
                      onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Select Category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="course">Course Content</option>
                      <option value="certificate">Certificate Problem</option>
                      <option value="account">Account Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe your issue or question in detail..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">User Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Step-by-step instructions on how to use the platform</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Download Guide</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <HelpCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">Watch tutorials on common tasks and features</p>
              <button className="text-green-600 hover:text-green-700 font-medium">Watch Videos</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <MessageSquare className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Community Forum</h3>
              <p className="text-gray-600 text-sm mb-4">Connect with other learners and get answers</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">Join Forum</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}