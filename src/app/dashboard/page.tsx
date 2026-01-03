import { AppLayout } from '@/components/layout';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { TodayBookings } from '@/components/dashboard/today-bookings';
import { ConflictAlerts } from '@/components/dashboard/conflict-alerts';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { StaffOverview } from '@/components/dashboard/staff-overview';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of today&apos;s operations</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Alerts */}
        <ConflictAlerts />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Bookings - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TodayBookings />
          </div>

          {/* Staff Overview */}
          <div>
            <StaffOverview />
          </div>
        </div>

        {/* Revenue Chart */}
        <RevenueChart />
      </div>
    </AppLayout>
  );
}
