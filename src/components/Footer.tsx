
import { Link } from "react-router-dom";
import { BarChart2, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-financial-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-financial-secondary" />
              <span className="ml-2 text-xl font-bold">EquityWatch</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              A comprehensive stock market tracking platform, designed to help you make informed investment decisions with real-time data and insights.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-financial-secondary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-financial-secondary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-financial-secondary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-financial-secondary uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/stocks" className="text-gray-300 hover:text-white">Stocks</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-300 hover:text-white">Favorites</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white">News</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-financial-secondary uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} EquityWatch. All rights reserved.
          </p>
          <p className="text-sm text-gray-300 mt-2 md:mt-0">
            Powered by public finance APIs. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
