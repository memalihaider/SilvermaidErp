'use client';

import { Alert } from '@/components/ui';
import { mockDashboardStats } from '@/lib/mock-data';

export function ConflictAlerts() {
  const { conflictAlerts } = mockDashboardStats;

  if (conflictAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {conflictAlerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={
            alert.severity === 'HIGH'
              ? 'error'
              : alert.severity === 'MEDIUM'
              ? 'warning'
              : 'info'
          }
          title={`${alert.type.replace('_', ' ')} Alert`}
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}
