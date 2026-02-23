import React from "react";
import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 -mt-16 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
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
                This is a student academic project developed for educational purposes only. This platform is not intended for actual use in emergency situations or real-world help requests.
              </p>
            </div>

            {/* Terms Content */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                By accessing and using Help Nearby, you acknowledge that this is an academic project created for educational purposes. This platform is a demonstration project and should not be used for real emergency situations or actual help requests.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">2. Educational Purpose</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Help Nearby is a student project developed at Chandigarh University as part of academic coursework. The platform demonstrates the concept of community-based assistance but is not a production-ready service.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                <strong>Key Points:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>This is a prototype/demonstration project</li>
                <li>Not intended for actual emergency use</li>
                <li>Created for learning purposes only</li>
                <li>May contain bugs or incomplete features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Users interacting with this academic project should:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>Understand this is a demonstration platform</li>
                <li>Not post real emergency requests</li>
                <li>Use appropriate language and behavior</li>
                <li>Respect the educational nature of the project</li>
                <li>Not rely on this platform for actual assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">4. Prohibited Activities</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The following activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>Using the platform for real emergencies</li>
                <li>Posting false or misleading information</li>
                <li>Harassment or abusive behavior</li>
                <li>Attempting to exploit system vulnerabilities</li>
                <li>Commercial use of the platform</li>
                <li>Collecting user data for any purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">5. No Guarantees</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                This academic project is provided "as is" without any warranties or guarantees:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>No guarantee of availability or uptime</li>
                <li>No guarantee of data accuracy</li>
                <li>No guarantee of response to requests</li>
                <li>No liability for any consequences of use</li>
                <li>May be discontinued at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">6. Data and Privacy</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                While we implement reasonable security measures for this academic project, users should be aware:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>This is a learning project with limited security</li>
                <li>Do not share sensitive personal information</li>
                <li>Data may be stored for demonstration purposes</li>
                <li>The project may be publicly accessible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">7. Intellectual Property</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                This project is an educational work developed by Rhythm Pahwa as part of academic coursework at Chandigarh University. All content, code, and design are part of the academic submission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">8. Modifications</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                As an academic project, these terms may be updated or modified at any time as part of the learning process. Continued use of the platform constitutes acceptance of any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">9. Emergency Situations</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4 font-bold text-red-400">
                IMPORTANT: This platform is NOT for real emergencies!
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                In case of actual emergencies, always contact:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>Emergency Services: 112 (India)</li>
                <li>Police: 100</li>
                <li>Ambulance: 102</li>
                <li>Fire: 101</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">10. Contact Information</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                For questions about this academic project:
              </p>
              <ul className="list-none text-gray-300 text-lg space-y-2">
                <li><strong>Developer:</strong> Rhythm Pahwa</li>
                <li><strong>Institution:</strong> Chandigarh University</li>
                <li><strong>Purpose:</strong> Academic Project</li>
              </ul>
            </section>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-full hover:bg-primary/90 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>Last Updated: February 2026</p>
              <p className="mt-2">Academic Project Only - Not for Production Use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
