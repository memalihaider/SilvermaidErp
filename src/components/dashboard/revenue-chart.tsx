'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

// Mock revenue data for the chart
const revenueData = [
  { day: 'Mon', revenue: 1250, bookings: 8 },
  { day: 'Tue', revenue: 1580, bookings: 10 },
  { day: 'Wed', revenue: 1320, bookings: 9 },
  { day: 'Thu', revenue: 1890, bookings: 12 },
  { day: 'Fri', revenue: 2100, bookings: 14 },
  { day: 'Sat', revenue: 980, bookings: 6 },
  { day: 'Sun', revenue: 750, bookings: 5 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

export function RevenueChart() {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalBookings = revenueData.reduce((sum, d) => sum + d.bookings, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Weekly Revenue</CardTitle>
            <p className="text-sm text-gray-500 mt-1">This week&apos;s performance</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue)}
            </p>
            <p className="text-sm text-gray-500">{totalBookings} bookings</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-48 pt-4">
          {revenueData.map((day) => {
            const heightPercent = (day.revenue / maxRevenue) * 100;
            return (
              <div
                key={day.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs font-medium text-gray-600 mb-1">
                    {formatCurrency(day.revenue)}
                  </span>
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                    style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                  />
                </div>
                <span className="text-sm text-gray-500">{day.day}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="text-sm text-gray-500">
            Avg: {formatCurrency(totalRevenue / 7)} / day
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
