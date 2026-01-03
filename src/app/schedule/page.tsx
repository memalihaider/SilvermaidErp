import { AppLayout } from '@/components/layout';
import { ScheduleHeader } from '@/components/schedule/schedule-header';
import { ScheduleCalendar } from '@/components/schedule/schedule-calendar';

export default function SchedulePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <ScheduleHeader />
        <ScheduleCalendar />
      </div>
    </AppLayout>
  );
}
