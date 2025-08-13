// FILE: src/i18n.js
// All keys are now simple English strings.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          // Navbar
          'view_requests': 'View Requests',
          'map_view': 'Map',
          'login': 'Login',
          'logout': 'Logout',
          'post_request': 'Post Request',
          'welcome_user': 'Welcome, {{email}}',

          // Home Page
          'hero_title_1': 'Find Help. Give Help.',
          'hero_title_2': 'Instantly.',
          'hero_subtitle': 'Connect with nearby volunteers for daily tasks and help.',
          'see_requests': 'See Nearby Requests',

          // View Requests Page
          'active_requests': 'Active Help Requests',
          'loading_requests': 'Loading requests...',
          'no_requests_found': 'No open requests found right now. Check back later!',
          'posted': 'Posted',
          'i_can_help': 'I Can Help',
          'help_offered': 'Help Offered',
          'your_request': 'Your Request',

          // Post Request Page
          'post_request_title': 'Post a Help Request',
          'description_label': 'Description',
          'description_placeholder': 'I need help with...',
          'location_label': 'Your Location',
          'detecting_location': 'Detecting your location...',
          'submit_request': 'Submit Request',
          'submitting': 'Submitting...',
          'status_posted': 'Request posted successfully!',
          'status_failed': 'Failed to post request.',
          'status_denied': 'Location access denied.',
          'category_label': 'Category',

          // Login Page
          'login_title': 'Login to Your Account',
          'email_label': 'Email Address',
          'password_label': 'Password',
          'login_error': 'Failed to log in. Please check your credentials.',
          'no_account': "Don't have an account?",
          'register_link': 'Register',

          // Register Page
          'register_title': 'Create an Account',
          'password_placeholder': 'At least 6 characters',
          'register_button': 'Register',
          'register_error_email': 'This email is already registered.',
          'register_error_weak': 'Password must be at least 6 characters.',
          'register_error_general': 'Failed to create an account.',
          'have_account': 'Already have an account?',
        }
      },
      hi: {
        translation: {
          // Navbar
          'view_requests': 'अनुरोध देखें',
          'map_view': 'नक्शा',
          'login': 'लॉगिन',
          'logout': 'लॉगआउट',
          'post_request': 'अनुरोध पोस्ट करें',
          'welcome_user': 'नमस्ते, {{email}}',

          // Home Page
          'hero_title_1': 'मदद ढूंढें। मदद करें।',
          'hero_title_2': 'तुरंत।',
          'hero_subtitle': 'आस-पास के स्वयंसेवकों से जुड़ें और दैनिक कामों में मदद लें।',
          'see_requests': 'आस-पास के अनुरोध देखें',
          
          // View Requests Page
          'active_requests': 'सक्रिय सहायता अनुरोध',
          'loading_requests': 'अनुरोध लोड हो रहे हैं...',
          'no_requests_found': 'अभी कोई खुला अनुरोध नहीं मिला। बाद में वापस देखें!',
          'posted': 'पोस्ट किया गया',
          'i_can_help': 'मैं मदद कर सकता हूँ',
          'help_offered': 'मदद की पेशकश',
          'your_request': 'आपका अनुरोध',

          // Post Request Page
          'post_request_title': 'सहायता अनुरोध पोस्ट करें',
          'description_label': 'विवरण',
          'description_placeholder': 'मुझे इसमें मदद चाहिए...',
          'location_label': 'आपका स्थान',
          'detecting_location': 'आपका स्थान पता कर रहे हैं...',
          'submit_request': 'अनुरोध सबमिट करें',
          'submitting': 'सबमिट हो रहा है...',
          'status_posted': 'अनुरोध सफलतापूर्वक पोस्ट किया गया!',
          'status_failed': 'अनुरोध पोस्ट करने में विफल।',
          'status_denied': 'स्थान की अनुमति नहीं दी गई।',
          'category_label': 'श्रेणी',

          // Login Page
          'login_title': 'अपने खाते में लॉगिन करें',
          'email_label': 'ईमेल पता',
          'password_label': 'पासवर्ड',
          'login_error': 'लॉगिन विफल। कृपया अपनी साख जांचें।',
          'no_account': 'खाता नहीं है?',
          'register_link': 'रजिस्टर करें',

          // Register Page
          'register_title': 'खाता बनाएं',
          'password_placeholder': 'कम से कम 6 अक्षर',
          'register_button': 'रजिस्टर करें',
          'register_error_email': 'यह ईमेल पहले से पंजीकृत है।',
          'register_error_weak': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।',
          'register_error_general': 'खाता बनाने में विफल।',
          'have_account': 'पहले से ही एक खाता है?',
          'login_link': 'लॉगिन करें',
        }
      }
    }
  });

export default i18n;
