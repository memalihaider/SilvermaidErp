'use client';

import { Card, CardContent } from '@/components/ui';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  DollarSign, 
  TrendingUp,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { mockDashboardStats } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; positive: boolean };
  iconColor: string;
  iconBg: string;
}

function StatCard({ title, value, icon: Icon, trend, iconColor, iconBg }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp 
                  className={`h-4 w-4 ${trend.positive ? 'text-green-500' : 'text-red-500 rotate-180'}`} 
                />
                <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-gray-500">vs last week</span>
              </div>
            )}
          </div>
          <div className={`rounded-lg p-3 ${iconBg}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = mockDashboardStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Today's Bookings"
        value={stats.todayBookings}
        icon={Calendar}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
        trend={{ value: 12, positive: true }}
      />
      <StatCard
        title="Active Crews"
        value={stats.activeCrews}
        icon={Users}
        iconColor="text-purple-600"
        iconBg="bg-purple-100"
      />
      <StatCard
        title="Revenue Today"
        value={formatCurrency(stats.revenueToday)}
        icon={DollarSign}
        iconColor="text-green-600"
        iconBg="bg-green-100"
        trend={{ value: 8, positive: true }}
      />
      <StatCard
        title="Pending Bookings"
        value={stats.pendingBookings}
        icon={Clock}
        iconColor="text-yellow-600"
        iconBg="bg-yellow-100"
      />
    </div>
  );
}
