import React from "react";
import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src="/annie-spratt-9VpI3gQ1iUo-unsplash.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Terms of Service</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Academic Notice */}
        <div className="bg-[#f0f4ed] border border-[#a6b697]/30 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#a6b697]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">Academic Project Disclaimer</h3>
            <p className="text-gray-600 text-sm leading-relaxed">These terms govern a student project built for educational purposes. This is not a commercial service.</p>
          </div>
          <Link to="/privacy-policy" className="sm:ml-auto flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#a6b697] text-white text-sm font-semibold rounded-lg hover:bg-[#8a9e7b] transition-colors">
              Privacy Policy
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Terms &amp; Conditions</h2>
        <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Last updated: February 2026
        </p>

        <div className="space-y-10">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">1</span>
              Acceptance of Terms
            </h3>
            <p className="text-gray-600 leading-relaxed">By accessing Help Nearby, you agree to these terms and acknowledge that this is an academic project created for educational purposes. Continued use of the platform constitutes acceptance of any future updates to these terms.</p>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">2</span>
              Scope &amp; Purpose
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Help Nearby is a prototype developed at Chandigarh University. It demonstrates the concept of community-based assistance but is not a production-ready or commercially available service.</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Intended solely as a technology demonstration</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Not designed for actual emergency or real-world use</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>May contain incomplete features or known limitations</li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">3</span>
              User Responsibilities
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">By using Help Nearby you agree to:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Provide accurate information when creating an account</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Refrain from posting real emergency or time-sensitive requests</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Use respectful language in all interactions</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Maintain the security of your account credentials</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Comply with the <Link to="/trust-and-safety" className="text-[#a6b697] hover:underline font-medium">Community Guidelines</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">4</span>
              Prohibited Activities
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">The following are grounds for immediate account suspension:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Posting false, misleading, or fraudulent requests</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Attempting to exploit or reverse-engineer the platform</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Scraping or collecting other users' data</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Using the platform for any commercial purpose</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Circumventing any access controls or security measures</li>
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">5</span>
              Disclaimers &amp; Limitation of Liability
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">This project is provided <strong>"as is"</strong> without warranties of any kind, express or implied:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-1.5">No Uptime Guarantee</h4>
                <p className="text-gray-500 text-sm">The service may go offline without notice for maintenance or academic reasons.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-1.5">No Liability</h4>
                <p className="text-gray-500 text-sm">The developer bears no responsibility for actions taken based on platform content.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-1.5">No Accuracy Guarantee</h4>
                <p className="text-gray-500 text-sm">Information displayed may be incomplete, outdated, or inaccurate.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-1.5">Discontinuation</h4>
                <p className="text-gray-500 text-sm">The project may be taken down at any time once the academic term concludes.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">6</span>
              Intellectual Property
            </h3>
            <p className="text-gray-600 leading-relaxed">All source code, UI design, and written content within Help Nearby are part of an academic submission by Rhythm Pahwa at Chandigarh University. Unauthorised reproduction or distribution of the project materials is not permitted without written consent.</p>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">7</span>
              Amendments
            </h3>
            <p className="text-gray-600 leading-relaxed">These terms may be revised at any time. Material changes will be indicated by updating the "Last updated" date above. It is your responsibility to review the terms periodically.</p>
          </section>

          {/* Cross-links */}
          <section>
            <div className="bg-[#f0f4ed] border border-[#a6b697]/20 rounded-xl p-5">
              <h4 className="font-bold text-gray-800 text-sm mb-2">Related Policies</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                For details on how we handle your data, see our <Link to="/privacy-policy" className="text-[#a6b697] hover:underline font-medium">Privacy Policy</Link>. For community conduct rules and emergency contacts, visit <Link to="/trust-and-safety" className="text-[#a6b697] hover:underline font-medium">Trust &amp; Safety</Link>. For project enquiries, see the <Link to="/contact-us" className="text-[#a6b697] hover:underline font-medium">Contact Us</Link> page.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#a6b697] text-white font-semibold rounded-xl hover:bg-[#8a9e7b] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
          <p className="text-gray-400 text-sm">
            Also see: <Link to="/privacy-policy" className="text-[#a6b697] hover:underline">Privacy</Link> &middot; <Link to="/trust-and-safety" className="text-[#a6b697] hover:underline">Trust &amp; Safety</Link> &middot; <Link to="/contact-us" className="text-[#a6b697] hover:underline">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
