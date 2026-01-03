'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Settings,
  Building2,
  Clock,
  Receipt,
  Bell,
  Shield,
  Palette,
  Wrench,
} from 'lucide-react';

const settingsNav = [
  { label: 'General', href: '/settings', icon: Settings },
  { label: 'Company', href: '/settings/company', icon: Building2 },
  { label: 'Working Hours', href: '/settings/hours', icon: Clock },
  { label: 'Services', href: '/settings/services', icon: Wrench },
  { label: 'Billing & VAT', href: '/settings/billing', icon: Receipt },
  { label: 'Notifications', href: '/settings/notifications', icon: Bell },
  { label: 'Roles & Permissions', href: '/settings/roles', icon: Shield },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-56 shrink-0">
      <nav className="space-y-1">
        {settingsNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
