import React from "react";
import { Link } from "react-router-dom";

function TrustAndSafety() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src="/annie-spratt-9VpI3gQ1iUo-unsplash.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Trust &amp; Safety</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Safety Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-red-800 text-sm mb-1">Not for Real Emergencies</h3>
            <p className="text-red-700 text-sm leading-relaxed">This is an academic demonstration only. In a genuine emergency, call <strong>112</strong> (India) or your local emergency number immediately.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Safety Guidelines</h2>
        <p className="text-gray-500 text-sm mb-10">Best practices for maintaining a safe, respectful community environment.</p>

        <div className="space-y-10">
          {/* Community Guidelines */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">1</span>
              Community Principles
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Every member of the Help Nearby community is expected to uphold these values:</p>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-[#a6b697] text-sm mb-1.5">Be Respectful</h4>
                <p className="text-gray-500 text-sm">Treat all members with kindness. Zero tolerance for harassment, hate speech, or discrimination.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-[#a6b697] text-sm mb-1.5">Be Honest</h4>
                <p className="text-gray-500 text-sm">Provide accurate information in your profile and requests. Misrepresentation erodes trust.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-[#a6b697] text-sm mb-1.5">Protect Privacy</h4>
                <p className="text-gray-500 text-sm">Never share another user's personal information without their explicit consent.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-[#a6b697] text-sm mb-1.5">Report Concerns</h4>
                <p className="text-gray-500 text-sm">If you see something wrong, flag it. Reports help keep the community safe for everyone.</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3">For the full list of prohibited activities, see our <Link to="/terms-of-service" className="text-[#a6b697] hover:underline font-medium">Terms of Service</Link>.</p>
          </section>

          {/* Safety Tips */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">2</span>
              Safety Best Practices
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Practical safety tips for helpers and requesters:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#f0f4ed] border border-[#a6b697]/20 rounded-xl p-5">
                <h4 className="font-bold text-gray-800 text-sm mb-3">For Helpers</h4>
                <ul className="space-y-2 ml-1">
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Verify the request before committing.</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Meet in well-lit, public locations.</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Tell a trusted person about your plans.</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Trust your instincts - decline if unsure.</li>
                </ul>
              </div>
              <div className="bg-[#f0f4ed] border border-[#a6b697]/20 rounded-xl p-5">
                <h4 className="font-bold text-gray-800 text-sm mb-3">For Requesters</h4>
                <ul className="space-y-2 ml-1">
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Be clear and honest about your need.</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Review the helper's profile first.</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Use in-app communication when possible.</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Keep emergency contacts on hand.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Trust Features */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">3</span>
              How We Build Trust
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Features designed to foster confidence between community members:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Verified Profiles</h4>
                <p className="text-gray-500 text-sm">Identity verification adds accountability to every interaction.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Ratings &amp; Reviews</h4>
                <p className="text-gray-500 text-sm">Community feedback builds reputation over time.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Encrypted Data</h4>
                <p className="text-gray-500 text-sm">All communication and personal data is encrypted. See our <Link to="/privacy-policy" className="text-[#a6b697] hover:underline">Privacy Policy</Link>.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Moderation</h4>
                <p className="text-gray-500 text-sm">Reports are reviewed promptly with warnings, suspensions, or bans as needed.</p>
              </div>
            </div>
          </section>

          {/* Emergency Numbers - canonical location */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">4</span>
              Emergency Contacts
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">If you or someone you know is in danger, contact the appropriate service below:</p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><strong>Emergency Services:</strong> 112</div>
                <div className="flex items-center gap-2 text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><strong>Police:</strong> 100</div>
                <div className="flex items-center gap-2 text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><strong>Ambulance:</strong> 102</div>
                <div className="flex items-center gap-2 text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><strong>Fire:</strong> 101</div>
                <div className="flex items-center gap-2 text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><strong>Women Helpline:</strong> 1091</div>
                <div className="flex items-center gap-2 text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><strong>Child Helpline:</strong> 1098</div>
              </div>
            </div>
          </section>

          {/* Reporting */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">5</span>
              Reporting a Concern
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">If you witness behaviour that violates our guidelines, you can report:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Suspicious or fraudulent behaviour.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Threatening or harassing messages.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Inappropriate or offensive content.</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Technical issues that compromise safety.</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3">Send reports to the developer via our <Link to="/contact-us" className="text-[#a6b697] hover:underline font-medium">Contact Us</Link> page.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#a6b697] text-white font-semibold rounded-xl hover:bg-[#8a9e7b] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
          <p className="text-gray-400 text-sm">
            Also see: <Link to="/privacy-policy" className="text-[#a6b697] hover:underline">Privacy</Link> &middot; <Link to="/terms-of-service" className="text-[#a6b697] hover:underline">Terms</Link> &middot; <Link to="/contact-us" className="text-[#a6b697] hover:underline">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrustAndSafety;
