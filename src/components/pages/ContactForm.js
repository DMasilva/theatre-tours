import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#F5F1E8' }}>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: '#FF7420' }}>Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="name"
              type="text"
              placeholder="Enter your name"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="email"
              type="email"
              placeholder="Enter your email"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="subject"
              type="text"
              placeholder="Enter the subject"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="message"
              rows="5"
              placeholder="Enter your message"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-all"
              style={{ backgroundColor: '#FF7420' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E65A00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF7420'}
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: '#E8E0D1' }}>
          <p className="text-gray-600 mb-2">Or reach us directly at:</p>
          <p className="font-bold" style={{ color: '#FF7420' }}>📞 +254 736 183 916</p>
          <p className="font-bold" style={{ color: '#FF7420' }}>📧 info@royaldastinos.org</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
