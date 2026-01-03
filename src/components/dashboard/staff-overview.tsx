'use client';

import { Card, CardHeader, CardTitle, CardContent, Avatar, Badge } from '@/components/ui';
import { mockStaff, getStaffBookingsForDate } from '@/lib/mock-data';
import { getSkillLabel, getSkillColor } from '@/lib/utils';

export function StaffOverview() {
  const today = new Date();
  const activeStaff = mockStaff.filter((s) => s.isActive);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Overview</CardTitle>
        <p className="text-sm text-gray-500 mt-1">{activeStaff.length} active staff members</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeStaff.map((staff) => {
            const todayBookings = getStaffBookingsForDate(staff.id, today);
            const isWorking = todayBookings.some(
              (b) => b.status === 'IN_PROGRESS'
            );

            return (
              <div
                key={staff.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <Avatar fallback={staff.user?.name || 'Staff'} size="md" />
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      isWorking ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">
                      {staff.user?.name}
                    </p>
                    {isWorking && (
                      <Badge variant="success" className="text-xs">
                        Working
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {todayBookings.length} job{todayBookings.length !== 1 ? 's' : ''} today
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {staff.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className={`text-xs px-1.5 py-0.5 rounded ${getSkillColor(skill)}`}
                      >
                        {getSkillLabel(skill)}
                      </span>
                    ))}
                    {staff.skills.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{staff.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
