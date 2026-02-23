import React from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 -mt-16 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300">
            Get in Touch - Academic Project Information
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
                This is a student academic project. The contact information provided is for project inquiries and academic purposes only.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">About This Project</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Help Nearby is an academic project developed as part of coursework at Chandigarh University. This platform demonstrates the concept of community-based assistance and local help networks.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                If you have questions about this project, feedback, or would like to know more about the development process, please feel free to reach out using the information below.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Project Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Developer</h3>
                  <p className="text-gray-300 text-lg">Rhythm Pahwa</p>
                  <p className="text-gray-400 text-sm mt-2">Student Developer</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Institution</h3>
                  <p className="text-gray-300 text-lg">Chandigarh University</p>
                  <p className="text-gray-400 text-sm mt-2">Punjab, India</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Project Type</h3>
                  <p className="text-gray-300 text-lg">Academic Project</p>
                  <p className="text-gray-400 text-sm mt-2">Educational Purpose Only</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Development Year</h3>
                  <p className="text-gray-300 text-lg">2026</p>
                  <p className="text-gray-400 text-sm mt-2">February</p>
                </div>
              </div>
            </section>

            {/* Technology Stack */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Technology Stack</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                This project was built using modern web technologies:
              </p>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="text-primary">●</span>
                    <span><strong>Frontend:</strong> React.js</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary">●</span>
                    <span><strong>Styling:</strong> Tailwind CSS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary">●</span>
                    <span><strong>Routing:</strong> React Router</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary">●</span>
                    <span><strong>Authentication:</strong> JWT</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary">●</span>
                    <span><strong>Maps:</strong> Google Maps API</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary">●</span>
                    <span><strong>Backend:</strong> Node.js/Express</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Project Goals */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Project Goals</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                This academic project aims to demonstrate:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>Full-stack web application development</li>
                <li>User authentication and authorization</li>
                <li>Real-time geolocation and mapping features</li>
                <li>Responsive and modern UI/UX design</li>
                <li>RESTful API design and implementation</li>
                <li>Database management and queries</li>
                <li>Security best practices</li>
                <li>Community platform architecture</li>
              </ul>
            </section>

            {/* Feedback Section */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Feedback &amp; Suggestions</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                As this is an academic project, feedback and suggestions for improvement are always welcome. If you have ideas on how to enhance this project or spot any issues, your input would be valuable for learning purposes.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3">Areas for Feedback</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>User interface and experience</li>
                  <li>Feature suggestions</li>
                  <li>Code quality and structure</li>
                  <li>Security considerations</li>
                  <li>Performance improvements</li>
                  <li>Accessibility enhancements</li>
                </ul>
              </div>
            </section>

            {/* Important Notice */}
            <section className="mb-8">
              <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-red-300 mb-3">Important Notice</h2>
                <p className="text-red-100 text-lg leading-relaxed">
                  <strong>This is NOT a production service.</strong> Please do not use this platform for actual emergency situations or real help requests. For genuine emergencies, always contact official emergency services at 112 (India) or your local emergency number.
                </p>
              </div>
            </section>

            {/* Social Links (Placeholder) */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Connect</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Stay updated on project developments and future work:
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-all duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Repository
                </button>
                
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-all duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn Profile
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mt-4 italic">
                Note: Links above are placeholders for demonstration purposes
              </p>
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

            {/* Footer */}
            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>Academic Project by Rhythm Pahwa</p>
              <p className="mt-2">Chandigarh University - February 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
