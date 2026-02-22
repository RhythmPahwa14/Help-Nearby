import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 -mt-16 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300">
            Academic Project - Educational Purposes Only
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="prose prose-invert max-w-none">
            
            {/* Academic Disclaimer */}
            <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-yellow-300 mb-3 flex items-center">
                <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Academic Project Notice
              </h2>
              <p className="text-yellow-100 text-lg leading-relaxed">
                This is a <strong>student academic project</strong> created for educational purposes only. 
                This website is <strong>NOT a real service</strong> and is not affiliated with any actual 
                community service organization or financial institution.
              </p>
            </div>

            <div className="space-y-8 text-gray-200">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. About This Project</h2>
                <p className="text-lg leading-relaxed">
                  Help Nearby is a student academic project developed as part of a university coursework assignment. 
                  The primary purpose of this application is to demonstrate technical skills in web development, 
                  database management, and user interface design.
                </p>
                <div className="mt-4 bg-blue-500/20 border border-blue-400 rounded-lg p-4">
                  <p className="text-blue-200">
                    <strong>Developer:</strong> Rhythm Pahwa<br/>
                    <strong>Institution:</strong> Chandigarh University<br/>
                    <strong>Purpose:</strong> Academic Project / Portfolio
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection & Usage</h2>
                <p className="text-lg leading-relaxed">
                  This application collects minimal user information for demonstration purposes only:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Email address (used only for login)</li>
                  <li>User name (for display purposes)</li>
                  <li>Location data (when posting help requests)</li>
                  <li>Help request information</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  <strong className="text-red-300">Important:</strong> Do NOT use real sensitive passwords. 
                  Use a test password that you don't use anywhere else.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                <p className="text-lg leading-relaxed">
                  While we implement basic security measures (password hashing, HTTPS), this is a 
                  <strong> student project</strong> and should not be relied upon for storing sensitive information. 
                  All data is stored temporarily for demonstration purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
                <p className="text-lg leading-relaxed">
                  This application uses the following third-party services:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li><strong>Vercel:</strong> For hosting (see Vercel's privacy policy)</li>
                  <li><strong>MongoDB Atlas:</strong> For database storage (see MongoDB's privacy policy)</li>
                  <li><strong>OpenStreetMap/Nominatim:</strong> For geocoding services</li>
                  <li><strong>Leaflet:</strong> For map display</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. User Rights</h2>
                <p className="text-lg leading-relaxed">
                  As this is a demonstration project, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Request deletion of your account and data</li>
                  <li>View what data we have stored</li>
                  <li>Stop using the service at any time</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  To request data deletion, please contact: <strong>rhythmpahwa14@gmail.com</strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies & Tracking</h2>
                <p className="text-lg leading-relaxed">
                  This website uses local storage to maintain your login session. We do not use 
                  third-party tracking cookies or analytics services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
                <p className="text-lg leading-relaxed">
                  As this is an academic project, this privacy policy may be updated as the project evolves. 
                  Last updated: February 2026
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
                <p className="text-lg leading-relaxed">
                  For questions about this privacy policy or the project:
                </p>
                <div className="mt-4 bg-green-500/20 border border-green-400 rounded-lg p-4">
                  <p className="text-green-200">
                    <strong>Developer:</strong> Rhythm Pahwa<br/>
                    <strong>Email:</strong> rhythmpahwa14@gmail.com<br/>
                    <strong>Institution:</strong> Chandigarh University<br/>
                    <strong>GitHub:</strong> <a href="https://github.com/RhythmPahwa14" className="text-green-300 hover:text-green-200 underline">@RhythmPahwa14</a>
                  </p>
                </div>
              </section>

              <section className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-gray-400 italic">
                  By using this website, you acknowledge that this is a student academic project and 
                  agree to use test credentials only. This project is for educational demonstration 
                  purposes and should not be used for actual community service requests.
                </p>
              </section>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer Attribution */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm">
            Built by <strong className="text-white">Rhythm Pahwa</strong> – Chandigarh University
          </p>
          <p className="text-xs mt-2">
            Academic Project © 2026 – For Educational Purposes Only
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
