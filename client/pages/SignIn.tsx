import React from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function SignIn() {
  return (
    <AuthShell
      title="Welcome Back"
      footer={
        <div className="space-y-4">
          <div className="text-center text-xs text-muted-foreground">
            Or continue with
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <svg aria-hidden viewBox="0 0 48 48" className="mr-2 h-4 w-4">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.873 31.91 29.32 35 24 35 16.82 35 11 29.18 11 22S16.82 9 24 9c3.31 0 6.32 1.23 8.62 3.25l5.66-5.66C34.908 3.014 29.73 1 24 1 10.745 1 0 11.745 0 25s10.745 24 24 24 24-10.745 24-24c0-1.627-.17-3.214-.389-4.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.817C14.38 16.672 18.834 13 24 13c3.31 0 6.32 1.23 8.62 3.25l5.66-5.66C34.908 3.014 29.73 1 24 1 15.317 1 7.922 5.93 4.215 13.04l2.091 1.651z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 49c5.258 0 10.063-1.988 13.72-5.235l-6.34-5.363C29.12 39.759 26.694 40 24 40c-5.29 0-9.86-3.108-11.606-7.553l-6.47 4.985C8.545 44.62 15.662 49 24 49z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.93 3.827-6.127 7-11.303 7-5.29 0-9.86-3.108-11.606-7.553l-6.47 4.985C8.545 44.62 15.662 49 24 49c13.255 0 24-10.745 24-24 0-1.627-.17-3.214-.389-4.917z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      }
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="transition-colors hover:border-blue-300 focus-visible:ring-blue-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="transition-colors hover:border-blue-300 focus-visible:ring-blue-600"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign In
        </Button>
      </form>
    </AuthShell>
  );
}
