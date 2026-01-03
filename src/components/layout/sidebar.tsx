'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCog,
  Receipt,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Schedule', href: '/schedule', icon: Calendar },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Staff', href: '/staff', icon: UserCog },
  { label: 'Billing', href: '/billing', icon: Receipt },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-gray-900 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-400" />
            <span className="font-bold text-lg">Silver Maid</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <Sparkles className="h-6 w-6 text-amber-400" />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            'w-full text-gray-400 hover:text-white hover:bg-gray-800',
            collapsed && 'px-2'
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
