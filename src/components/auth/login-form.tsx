'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export function LoginForm() {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Signing in...', 'info');
    // Simulate login - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500));
    showToast('Login successful!', 'success');
    // For now, redirect to dashboard with mock user
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Silver Maid</h1>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In to Silver Maid</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Access your cleaning schedule and account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@silvermaid.ae"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              {/* Demo Credentials */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-gray-700">Demo Credentials:</p>
                <p className="text-xs text-gray-600">
                  Email: <span className="font-mono">admin@silvermaid.ae</span>
                </p>
                <p className="text-xs text-gray-600">
                  Password: <span className="font-mono">password123</span>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>&copy; 2026 Silver Maid Cleaning Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
