import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
        <p>&copy; {currentYear} MyApp. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;