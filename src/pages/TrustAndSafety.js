import React from "react";
import { Link } from "react-router-dom";

function TrustAndSafety() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 -mt-16 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trust &amp; Safety
          </h1>
          <p className="text-xl text-gray-300">
            Community Guidelines for Academic Project
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
                Critical Safety Notice
              </h2>
              <p className="text-yellow-100 text-lg leading-relaxed">
                <strong>This is an academic demonstration project only.</strong> Do not use this platform for real emergencies or actual help requests. Always contact official emergency services for genuine assistance.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Commitment to Safety</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                While Help Nearby is an academic project created for educational purposes, we believe in demonstrating best practices for community safety and trust. These guidelines outline the principles that would govern a real-world help platform.
              </p>
            </section>

            {/* Community Guidelines */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Community Guidelines</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                To maintain a respectful and safe environment, all users should:
              </p>
              
              <div className="space-y-6 mt-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-3">1. Be Respectful</h3>
                  <p className="text-gray-300">
                    Treat all community members with respect and kindness. No harassment, hate speech, discrimination, or abusive behavior will be tolerated.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-3">2. Be Honest</h3>
                  <p className="text-gray-300">
                    Provide accurate information in your profile and requests. Misrepresentation or deception undermines community trust.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-3">3. Protect Privacy</h3>
                  <p className="text-gray-300">
                    Respect the privacy of others. Never share personal information of other users without their consent.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-3">4. Stay Safe</h3>
                  <p className="text-gray-300">
                    Meet in public places, inform trusted contacts about your interactions, and trust your instincts. Remember: this is a demonstration project only.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-3">5. Report Issues</h3>
                  <p className="text-gray-300">
                    If you encounter inappropriate behavior, suspicious activity, or safety concerns, report it immediately (in a real-world scenario).
                  </p>
                </div>
              </div>
            </section>

            {/* Safety Tips */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Safety Best Practices</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                In a real-world community help platform, users should follow these safety practices:
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-4">
                <h3 className="text-xl font-bold text-blue-300 mb-3">Before Offering Help</h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                  <li>Verify the legitimacy of the request</li>
                  <li>Check the requester's profile and history</li>
                  <li>Meet in well-lit, public locations</li>
                  <li>Inform someone you trust about your plans</li>
                  <li>Trust your instincts - if something feels wrong, decline</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3">When Requesting Help</h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                  <li>Provide clear, honest information about your need</li>
                  <li>Review the helper's profile and ratings</li>
                  <li>Communicate through the platform when possible</li>
                  <li>Meet in safe, public locations</li>
                  <li>Have emergency contacts readily available</li>
                </ul>
              </div>
            </section>

            {/* Prohibited Content */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Prohibited Content &amp; Behavior</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The following activities would be strictly prohibited on a real platform:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>Harassment, threats, or intimidation</li>
                <li>Hate speech or discriminatory content</li>
                <li>Fraudulent or deceptive requests</li>
                <li>Requests for illegal activities</li>
                <li>Sexual content or solicitation</li>
                <li>Spam or commercial advertising</li>
                <li>Impersonation of others</li>
                <li>Sharing private information without consent</li>
              </ul>
            </section>

            {/* Trust Features */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Building Trust in the Community</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                In a production platform, these features would help build trust:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-3">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Verified Profiles</h3>
                  <p className="text-gray-300">Identity verification for enhanced trust and accountability</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-3">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ratings &amp; Reviews</h3>
                  <p className="text-gray-300">Community feedback system to build reputation</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-3">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Secure Platform</h3>
                  <p className="text-gray-300">Encryption and security measures to protect users</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-primary mb-3">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                  <p className="text-gray-300">Dedicated team for safety concerns and disputes</p>
                </div>
              </div>
            </section>

            {/* Emergency Notice */}
            <section className="mb-8">
              <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-red-300 mb-3">Emergency Situations</h2>
                <p className="text-red-100 text-lg leading-relaxed mb-4">
                  <strong>IMPORTANT:</strong> This platform is NOT for emergencies! In case of actual emergencies, always contact official emergency services:
                </p>
                <ul className="list-disc list-inside text-red-100 text-lg space-y-2 ml-4">
                  <li><strong>Emergency Services:</strong> 112 (India)</li>
                  <li><strong>Police:</strong> 100</li>
                  <li><strong>Ambulance:</strong> 102</li>
                  <li><strong>Fire:</strong> 101</li>
                  <li><strong>Women Helpline:</strong> 1091</li>
                  <li><strong>Child Helpline:</strong> 1098</li>
                </ul>
              </div>
            </section>

            {/* Reporting */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Reporting Concerns</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                In a real-world platform, users would be able to report:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 ml-4">
                <li>Suspicious or fraudulent behavior</li>
                <li>Harassment or threatening messages</li>
                <li>Inappropriate content or requests</li>
                <li>Safety concerns or violations</li>
                <li>Technical issues affecting safety</li>
              </ul>
              <p className="text-gray-300 text-lg leading-relaxed mt-4">
                Reports would be reviewed promptly, and appropriate action would be taken including warnings, suspensions, or permanent bans.
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
              <p>Last Updated: February 2026</p>
              <p className="mt-2">Academic Project - Demonstrating Safety Best Practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustAndSafety;
