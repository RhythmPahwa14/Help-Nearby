import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src="/annie-spratt-9VpI3gQ1iUo-unsplash.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Academic Notice */}
        <div className="bg-[#f0f4ed] border border-[#a6b697]/30 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#a6b697]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">Academic Project Notice</h3>
            <p className="text-gray-600 text-sm leading-relaxed">All data collected through this application is strictly used for educational analysis and research purposes as part of an academic study.</p>
          </div>
          <Link to="/terms-of-service" className="sm:ml-auto flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#a6b697] text-white text-sm font-semibold rounded-lg hover:bg-[#8a9e7b] transition-colors">
              View Terms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Commitment to Your Privacy</h2>
        <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Last updated: February 2026
        </p>

        <div className="space-y-10">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">1</span>
              Information We Collect
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">We collect information that you provide directly when you create an account, request help, or offer services:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Account credentials (name, email, password hash).</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Geolocation data to find nearby assistance.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Help request details and categories.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Device information and browser type.</li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">2</span>
              How We Use Your Data
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">As an academic project, your data serves two primary purposes:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-1.5">Service Connection</h4>
                <p className="text-gray-500 text-sm">Matching volunteers with those who need help based on proximity and request type.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-1.5">Research Analysis</h4>
                <p className="text-gray-500 text-sm">Aggregated, anonymous data analysis to validate community support models.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">3</span>
              Data Protection &amp; Security
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">We implement the following measures to protect your information:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Passwords are hashed using bcrypt before storage.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>All data is transmitted over HTTPS encryption.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>JWT tokens are used for secure session management.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Database access is restricted to authorized personnel only.</li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">4</span>
              Third-Party Services
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">This application relies on the following external services, each with their own privacy policies:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Vercel</strong> - Application hosting and deployment.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>MongoDB Atlas</strong> - Cloud database storage.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>OpenStreetMap / Nominatim</strong> - Geocoding and map tiles.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Leaflet</strong> - Interactive map rendering.</li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">5</span>
              Data Retention &amp; Deletion
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Your data is retained only for the duration of the academic study. Upon project completion:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>All personally identifiable data will be anonymized or deleted.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Aggregated research data may be retained for the thesis.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>You can request early deletion at any time via email.</li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">6</span>
              Your Rights
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Access and view the personal data we store about you.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Request correction of inaccurate data.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Request complete deletion of your account and data.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Withdraw consent and stop using the service at any time.</li>
            </ul>
            <p className="text-gray-500 text-sm mt-4">To exercise any of these rights, reach out via our <Link to="/contact-us" className="text-[#a6b697] hover:underline font-medium">Contact Us</Link> page.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#a6b697] text-white font-semibold rounded-xl hover:bg-[#8a9e7b] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
          <p className="text-gray-400 text-sm">
            Also see: <Link to="/terms-of-service" className="text-[#a6b697] hover:underline">Terms</Link> &middot; <Link to="/trust-and-safety" className="text-[#a6b697] hover:underline">Trust &amp; Safety</Link> &middot; <Link to="/contact-us" className="text-[#a6b697] hover:underline">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
