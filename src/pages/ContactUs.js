import React from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src="/annie-spratt-9VpI3gQ1iUo-unsplash.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Notice */}
        <div className="bg-[#f0f4ed] border border-[#a6b697]/30 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#a6b697]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">Project Enquiries Only</h3>
            <p className="text-gray-600 text-sm leading-relaxed">This contact information is for academic and project-related queries. For safety concerns, visit <Link to="/trust-and-safety" className="text-[#a6b697] hover:underline font-medium">Trust &amp; Safety</Link>.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-500 text-sm mb-10">Have questions about this project? Feedback or suggestions? Reach out below.</p>

        <div className="space-y-10">
          {/* Project Info Cards */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">1</span>
              Project Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Developer</h4>
                <p className="text-gray-600 text-sm">Rhythm Pahwa</p>
                <p className="text-gray-400 text-xs mt-1">Student Developer</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Institution</h4>
                <p className="text-gray-600 text-sm">Chandigarh University</p>
                <p className="text-gray-400 text-xs mt-1">Punjab, India</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Email</h4>
                <p className="text-gray-600 text-sm">rhythmpahwa14@gmail.com</p>
                <p className="text-gray-400 text-xs mt-1">Project inquiries only</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#a6b697]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#a6b697]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">Development Year</h4>
                <p className="text-gray-600 text-sm">2026</p>
                <p className="text-gray-400 text-xs mt-1">February</p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">2</span>
              Technology Stack
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Built with modern web technologies:</p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Frontend:</strong> React.js</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Styling:</strong> Tailwind CSS</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Routing:</strong> React Router</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Authentication:</strong> JWT</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Maps:</strong> Leaflet / OpenStreetMap</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span><strong>Backend:</strong> Node.js / Express</li>
              </ul>
            </div>
          </section>

          {/* Project Goals */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">3</span>
              Project Goals
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">This academic project aims to demonstrate:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Full-stack web application development</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>User authentication and authorization</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Real-time geolocation and mapping features</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Responsive and modern UI/UX design</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>RESTful API design and implementation</li>
              <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Database management and queries</li>
            </ul>
          </section>

          {/* Feedback */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">4</span>
              Feedback &amp; Suggestions
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Feedback helps improve the project. Areas we'd love input on:</p>
            <div className="bg-[#f0f4ed] border border-[#a6b697]/20 rounded-xl p-5">
              <ul className="space-y-2 ml-1">
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>User interface and experience</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Feature suggestions</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Code quality and architecture</li>
                <li className="flex items-center gap-2 text-gray-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#a6b697]"></span>Performance and accessibility</li>
              </ul>
            </div>
          </section>

          {/* Connect */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#a6b697] mb-5">
              <span className="w-8 h-8 rounded-full bg-[#a6b697]/10 flex items-center justify-center text-sm font-bold">5</span>
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/RhythmPahwa14" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub Repository
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#a6b697] text-white font-semibold rounded-xl hover:bg-[#8a9e7b] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
          <p className="text-gray-400 text-sm">
            Also see: <Link to="/privacy-policy" className="text-[#a6b697] hover:underline">Privacy</Link> &middot; <Link to="/terms-of-service" className="text-[#a6b697] hover:underline">Terms</Link> &middot; <Link to="/trust-and-safety" className="text-[#a6b697] hover:underline">Trust &amp; Safety</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
