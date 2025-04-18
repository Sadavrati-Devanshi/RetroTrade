import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Form submitted:', formData);
  //   alert('Thank you for your message! We will get back to you soon.');
  //   // Reset form
  //   setFormData({
  //     name: '',
  //     email: '',
  //     subject: '',
  //     message: '',
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
    // Show success message
    setSuccessMessage('Message successfully submitted!');
  
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  
    // Optionally clear the success message after a few seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };
  

  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-amber-900">Contact Us</h1>
          <div className="w-16 h-1 bg-amber-600 mx-auto my-4"></div>
          <p className="text-amber-800 max-w-2xl mx-auto">
            Have questions about RetroTrade or need assistance with your vintage gaming collection? 
            We're here to help! Choose the best way to reach us below.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-amber-800">Get in Touch</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-800">Department Contacts</h3>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium text-amber-800">Customer Support:</span> 
                    <a href="mailto:support@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">
                      support@retrotrade.com
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-amber-800">Authentication Services:</span> 
                    <a href="mailto:verify@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">
                      verify@retrotrade.com
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-amber-800">Partnership Inquiries:</span> 
                    <a href="mailto:partners@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">
                      partners@retrotrade.com
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-amber-800">Press Inquiries:</span> 
                    <a href="mailto:media@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">
                      media@retrotrade.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-800">Call Us</h3>
                <p className="text-amber-900">
                  <span className="font-medium text-amber-800">Phone:</span> (555) 123-4567
                </p>
                <p className="text-amber-900">
                  <span className="font-medium text-amber-800">Hours:</span> Monday-Friday, 9am-6pm EST
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-800">Visit Our Office</h3>
                <address className="not-italic text-amber-900">
                  RetroTrade, Inc.<br />
                  123 Pixel Lane, Suite 64<br />
                  Portland, OR 97201<br />
                  United States
                </address>
              </div>
              {successMessage && (
  <p className="text-green-600 font-medium mt-4">{successMessage}</p>
)}

            </div>
          </section>

          <section className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-amber-800">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-amber-800 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-amber-800 font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-amber-800 font-medium mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Please select</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="authentication">Authentication Services</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="press">Press Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-amber-800 font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
  {/* all your input fields */}
  <button type="submit" className="...">
    Send Message
  </button>
</form>

{successMessage && (
  <p className="text-green-600 font-medium mt-4">{successMessage}</p>
)}

              
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-md hover:from-amber-700 hover:to-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-800 text-center">Follow Us</h2>
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <a 
                href="https://discord.gg/retrotrade" 
                className="p-4 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amber-800 mb-1">Discord</div>
                <div className="text-amber-700">discord.gg/retrotrade</div>
              </a>
              <a 
                href="https://twitter.com/RetroTrade" 
                className="p-4 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amber-800 mb-1">Twitter</div>
                <div className="text-amber-700">@RetroTrade</div>
              </a>
              <a 
                href="https://instagram.com/RetroTrade_Official" 
                className="p-4 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amber-800 mb-1">Instagram</div>
                <div className="text-amber-700">@RetroTrade_Official</div>
              </a>
              <a 
                href="https://youtube.com/c/RetroTradeTV" 
                className="p-4 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amber-800 mb-1">YouTube</div>
                <div className="text-amber-700">RetroTrade TV</div>
              </a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-800 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-amber-800">How long does authentication take?</h3>
              <p className="text-amber-900">Our authentication process typically takes 3-5 business days once we receive your item. For rare or complex items, it may take up to 7 business days.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-amber-800">What payment methods do you accept?</h3>
              <p className="text-amber-900">RetroTrade accepts all major credit cards, PayPal, and cryptocurrency payments including Bitcoin and Ethereum.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-amber-800">Do you ship internationally?</h3>
              <p className="text-amber-900">Yes! We ship to over 40 countries worldwide. International shipping costs and timeframes vary by location.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-amber-800">How do I become a verified seller?</h3>
              <p className="text-amber-900">To become a verified seller, complete at least 5 successful transactions with positive reviews and submit an application through your account dashboard.</p>
            </div>
          </div>
        </section>

        <footer className="text-center py-6 border-t border-amber-200">
          <p className="italic text-amber-700">RetroTrade: Preserving the Past, One Game at a Time.</p>
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;