import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator'; // Optional: if needed between content and footer links

interface AuthFormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode; // For the main form content (inputs, buttons)
  footerContent?: React.ReactNode; // For links like "Forgot password?", "Don't have an account?"
  className?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  children,
  footerContent,
  className,
}) => {
  console.log("Rendering AuthFormCard with title:", title);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
        {footerContent && (
          <>
            <Separator className="my-4" />
            <CardFooter className="flex flex-col space-y-2 items-center text-sm">
              {footerContent}
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
export default AuthFormCard;