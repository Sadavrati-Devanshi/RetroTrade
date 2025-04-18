import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-amber-900">About RetroTrade</h1>
          <div className="w-16 h-1 bg-amber-600 mx-auto my-4"></div>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Our Story</h2>
          <p className="mb-4 text-amber-900">
            RetroTrade was founded in 2020 by a group of passionate collectors who shared a vision: to create a trustworthy marketplace where enthusiasts could buy, sell, and trade vintage video games, consoles, and memorabilia with confidence.
          </p>
          <p className="mb-4 text-amber-900">
            What began as a modest online forum has grown into one of the web's premier destinations for retro gaming commerce, serving a community of over 50,000 collectors worldwide.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Our Mission</h2>
          <p className="mb-4 text-amber-900">
            At RetroTrade, we're dedicated to preserving gaming history by connecting collectors with the treasures they seek. We believe every cartridge, console, and collectible has a story to tell and deserves to find its way to someone who will appreciate its value.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">What Sets Us Apart</h2>
          <ul className="list-disc pl-6 space-y-2 text-amber-900">
            <li><strong className="text-amber-800">Authentication Services:</strong> Our team of experts verifies the authenticity of rare and valuable items before they change hands.</li>
            <li><strong className="text-amber-800">Secure Transactions:</strong> Our escrow system ensures buyers and sellers are protected throughout the transaction process.</li>
            <li><strong className="text-amber-800">Community-Focused:</strong> We host regular virtual events, tournaments, and discussions to strengthen our collector community.</li>
            <li><strong className="text-amber-800">Restoration Resources:</strong> We provide guides and connect members with restoration specialists to help preserve gaming history.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-bold mb-2 text-amber-800">Sarah Chen</h3>
              <p className="text-amber-700 font-medium mb-2">CEO & Co-Founder</p>
              <p className="text-amber-900">A lifelong collector with a particular passion for 16-bit era Japanese imports, Sarah left her role as a software engineer to build RetroTrade after experiencing too many fraudulent transactions on less specialized platforms.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-bold mb-2 text-amber-800">Marcus Washington</h3>
              <p className="text-amber-700 font-medium mb-2">CTO & Co-Founder</p>
              <p className="text-amber-900">Previously a security specialist at major e-commerce companies, Marcus ensures RetroTrade's marketplace remains secure and user-friendly.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-bold mb-2 text-amber-800">Janelle Rodriguez</h3>
              <p className="text-amber-700 font-medium mb-2">Community Director</p>
              <p className="text-amber-900">With a background in event planning and a personal collection of over 500 Game Boy titles, Janelle organizes our community initiatives and moderation team.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-bold mb-2 text-amber-800">David Park</h3>
              <p className="text-amber-700 font-medium mb-2">Authentication Lead</p>
              <p className="text-amber-900">A former console repair technician with 15 years of experience, David leads our team of authenticators who verify the condition and legitimacy of collectibles.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Departments</h3>
              <ul className="space-y-3">
                <li>
                  <span className="font-medium text-amber-800">Customer Support:</span> 
                  <a href="mailto:support@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">support@retrotrade.com</a>
                </li>
                <li>
                  <span className="font-medium text-amber-800">Authentication Services:</span> 
                  <a href="mailto:verify@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">verify@retrotrade.com</a>
                </li>
                <li>
                  <span className="font-medium text-amber-800">Partnership Inquiries:</span> 
                  <a href="mailto:partners@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">partners@retrotrade.com</a>
                </li>
                <li>
                  <span className="font-medium text-amber-800">Press Inquiries:</span> 
                  <a href="mailto:media@retrotrade.com" className="text-amber-600 hover:text-amber-800 ml-2">media@retrotrade.com</a>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">General Information</h3>
              <p className="mb-2 text-amber-900">
                <span className="font-medium text-amber-800">Phone:</span> (555) 123-4567
              </p>
              <p className="mb-2 text-amber-900">
                <span className="font-medium text-amber-800">Hours:</span> Monday-Friday, 9am-6pm EST
              </p>
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-amber-800">Headquarters:</h4>
                <address className="not-italic text-amber-900">
                  RetroTrade, Inc.<br />
                  123 Pixel Lane, Suite 64<br />
                  Portland, OR 97201
                </address>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Connect With Us</h2>
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-lg shadow-md">
            <ul className="flex flex-wrap gap-4">
              <li>
                <a href="https://discord.gg/retrotrade" className="flex items-center text-amber-700 hover:text-amber-900">
                  <span className="mr-1 font-medium">Discord:</span> discord.gg/retrotrade
                </a>
              </li>
              <li>
                <a href="https://twitter.com/RetroTrade" className="flex items-center text-amber-700 hover:text-amber-900">
                  <span className="mr-1 font-medium">Twitter:</span> @RetroTrade
                </a>
              </li>
              <li>
                <a href="https://instagram.com/RetroTrade_Official" className="flex items-center text-amber-700 hover:text-amber-900">
                  <span className="mr-1 font-medium">Instagram:</span> @RetroTrade_Official
                </a>
              </li>
              <li>
                <a href="https://youtube.com/c/RetroTradeTV" className="flex items-center text-amber-700 hover:text-amber-900">
                  <span className="mr-1 font-medium">YouTube:</span> RetroTrade TV
                </a>
              </li>
            </ul>
          </div>
        </section>

        <footer className="text-center py-6 border-t border-amber-200">
          <p className="italic text-amber-700">RetroTrade: Preserving the Past, One Game at a Time.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;