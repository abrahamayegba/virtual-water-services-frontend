import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-600">
            <Link to="/accreditations" className="hover:text-gray-900 transition-colors">
              Accreditations
            </Link>
            <Link
              to="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy policy
            </Link>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">
              Terms of service
            </Link>
            <Link
              to="/support"
              className="hover:text-gray-900 transition-colors"
            >
              Contact us
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 Virtual Water Services Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
