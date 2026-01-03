import { AppLayout } from '@/components/layout';
import { CustomerHeader } from '@/components/customers/customer-header';
import { CustomerList } from '@/components/customers/customer-list';

export default function CustomersPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <CustomerHeader />
        <CustomerList />
      </div>
    </AppLayout>
  );
}
