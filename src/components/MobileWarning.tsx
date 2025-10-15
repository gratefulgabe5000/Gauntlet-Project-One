/**
 * Mobile Warning Component
 *
 * PR6.5.2: Mobile detection with "Desktop required" message
 *
 * Displays a full-screen message for mobile and tablet users
 * explaining that the app requires a desktop browser
 */

import { useEffect, useState } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet based on screen width and user agent
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();

      // Check screen width (tablets typically < 1024px, phones < 768px)
      const isSmallScreen = width < 1024;

      // Check user agent for mobile indicators
      const isMobileUA = /mobile|android|iphone|ipad|tablet|phone/i.test(userAgent);

      // Consider it mobile if either condition is true
      setIsMobile(isSmallScreen || isMobileUA);
    };

    // Check on mount
    checkMobile();

    // Check on window resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Desktop Required
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          CollabCanvas is optimized for desktop browsers and requires a larger screen
          for the best collaborative experience.
        </p>

        {/* Requirements List */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Recommended:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Desktop or laptop computer</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Screen width of 1024px or larger</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Chrome, Firefox, or Safari</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Mouse or trackpad for precision</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500">
          <p className="mb-1">
            Please access CollabCanvas from a desktop browser to start collaborating.
          </p>
          <p className="font-semibold text-blue-600">
            Current screen width: {window.innerWidth}px
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
