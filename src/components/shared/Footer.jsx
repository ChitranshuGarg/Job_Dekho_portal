import React from "react";
import { Link } from "react-router-dom";
import { Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-orange-300 to-purple-500"></div>
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-purple-100 filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-orange-100 filter blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold group transition-all hover:text-purple-900">
                Com
                <span className="relative text-[#F83002] inline-block">
                  <span className="absolute -inset-1 -skew-y-3 bg-purple-100 -z-10 rounded group-hover:skew-y-3 transition-all duration-300"></span>
                  Connect
                </span>
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              Connecting passionate volunteers with meaningful opportunities to create positive change in communities.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Facebook */}
              <a
                href="#"
                className="p-2 rounded-full bg-[#1877F2] text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="#"
                className="p-2 rounded-full bg-black text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 rounded-full bg-[#0A66C2] text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="p-2 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 transition-all hover:text-purple-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Opportunities</Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Browse</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Blog</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 transition-all hover:text-purple-800">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Volunteer Guide</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Organization Resources</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Success Stories</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 inline-block transition-transform">Support</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 transition-all hover:text-purple-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <span className="bg-purple-100 p-2 rounded-full mr-3 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Mail size={18} />
                </span>
                <span className="text-gray-600 group-hover:text-purple-600 transition-colors">contact@comconnect.org</span>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#6A38C2] to-[#9333ea] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:shadow-purple-300/30 hover:scale-105 mt-2"
                >
                  <span>Get in Touch</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ComConnect. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-600">
              <span className="flex items-center">
                Made with <Heart size={14} className="text-red-500 mx-1 hover:scale-125 transition-transform duration-300" /> by ComConnect Team
              </span>
              <span className="mx-4">|</span>
              <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-purple-600 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
