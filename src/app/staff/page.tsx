import { AppLayout } from '@/components/layout';
import { StaffHeader } from '@/components/staff/staff-header';
import { StaffList } from '@/components/staff/staff-list';

export default function StaffPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <StaffHeader />
        <StaffList />
      </div>
    </AppLayout>
  );
}
