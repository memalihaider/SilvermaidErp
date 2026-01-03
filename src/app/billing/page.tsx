import { AppLayout } from '@/components/layout';
import { BillingHeader } from '@/components/billing/billing-header';
import { BillingStats } from '@/components/billing/billing-stats';
import { InvoiceList } from '@/components/billing/invoice-list';

export default function BillingPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <BillingHeader />
        <BillingStats />
        <InvoiceList />
      </div>
    </AppLayout>
  );
}
