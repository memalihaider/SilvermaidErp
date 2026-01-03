'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Bell, Search, User, LogOut, ChevronDown } from 'lucide-react';
import { Button, Avatar, Input } from '@/components/ui';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  // Mock current user
  const currentUser = {
    name: 'Ahmed Al Rashid',
    email: 'admin@silvermaid.ae',
    role: 'Admin',
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6',
        className
      )}
    >
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search bookings, customers, staff..."
            className="pl-9 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors"
          >
            <Avatar fallback={currentUser.name} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
                <div className="p-1">
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
