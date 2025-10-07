import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Facebook, Twitter, Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl text-green-600">Notable</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-gray-600 font-medium">
          <li>
            <Link to="/features" className="hover:text-green-600">Features</Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-green-600">Pricing</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-600">About</Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="h-5 w-5 hover:text-green-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="h-5 w-5 hover:text-green-600" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github className="h-5 w-5 hover:text-green-600" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin className="h-5 w-5 hover:text-green-600" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Notable. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
