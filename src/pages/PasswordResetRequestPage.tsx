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

const passwordResetRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;

const PasswordResetRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<PasswordResetRequestFormValues>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: PasswordResetRequestFormValues) => {
    console.log('Password reset request submitted:', data);
    // Simulate API call for sending reset link
    toast({
      title: "Password Reset Email Sent",
      description: `If an account exists for ${data.email}, you will receive an email with reset instructions.`,
    });
    // Optionally, navigate back to login or a confirmation page
    // navigate('/login'); 
  };

  console.log('PasswordResetRequestPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header appName="AuthDemo App" />
      <main className="flex-grow">
        <AuthFormCard
          title="Reset Your Password"
          description="Enter your email address and we'll send you a link to reset your password."
          footerContent={
            <Link to="/login" className="text-sm text-primary hover:underline">
              Back to Login
            </Link>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetRequestPage;