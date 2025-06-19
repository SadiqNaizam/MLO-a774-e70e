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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";

const registrationSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log('Registration form submitted:', data);
    // Simulate API call for registration
    toast({
      title: "Registration Successful!",
      description: "Your account has been created. Please login.",
    });
    navigate('/login');
  };

  console.log('RegistrationPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header appName="AuthDemo App" />
      <main className="flex-grow">
        <AuthFormCard
          title="Create a New Account"
          description="Fill in the details below to register."
          footerContent={
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="yourusername" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;