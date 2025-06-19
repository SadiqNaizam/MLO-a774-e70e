import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { LogIn } from 'lucide-react'; // Example icon

interface HeaderProps {
  appName?: string;
}

const Header: React.FC<HeaderProps> = ({ appName = "MyApp" }) => {
  console.log("Rendering Header");

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
          {appName}
        </Link>
        <nav className="flex items-center space-x-4">
          {/* Example navigation links - adapt as needed */}
          {/* For auth pages, these might be minimal or not present */}
          {/* <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Pricing
          </Link> */}
          <Link to="/login">
            {/* Using a generic LogIn icon as an example, could be a Button component */}
            {/* <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button> */}
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;