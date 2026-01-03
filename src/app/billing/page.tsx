import { AppLayout } from '@/components/layout';
import { BillingHeader } from '@/components/billing/billing-header';
import { BillingStats } from '@/components/billing/billing-stats';
import { InvoiceList } from '@/components/billing/invoice-list';
import { FinancialReportSection } from '@/components/billing/financial-report';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

export default function BillingPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <BillingHeader />
        <BillingStats />
        
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="reports">Financial Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices" className="mt-6">
            <InvoiceList />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <FinancialReportSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
