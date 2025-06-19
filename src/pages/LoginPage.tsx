import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import AuthFormCard from '@/components/AuthFormCard';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast"; // For success/error messages

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "", // Default email for easier testing: "user@example.com"
      password: "", // Default password for easier testing: "password123"
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login form submitted:', data);
    // Simulate API call
    if (data.email === "user@example.com" && data.password === "password123") {
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });
      // Redirect to a dashboard or home page after successful login
      navigate('/'); // Or a protected route
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      form.setError("email", { type: "manual", message: "Invalid credentials" });
      form.setError("password", { type: "manual", message: " " }); // Clear specific password error if general
    }
  };

  console.log('LoginPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header appName="AuthDemo App" />
      <main className="flex-grow">
        <AuthFormCard
          title="Login to Your Account"
          description="Enter your credentials below to access your account."
          footerContent={
            <>
              <Link to="/password-reset-request" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email or Username</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="rememberMe" className="font-normal">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;