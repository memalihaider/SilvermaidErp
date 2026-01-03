'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
  Select,
} from '@/components/ui';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';
import {
  formatCurrency,
  formatDate,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/lib/utils';
import { generateFinancialReport, getOverdueInvoices } from '@/lib/invoice-generator';
import { subDays, startOfMonth, endOfMonth } from 'date-fns';

export function FinancialReportSection() {
  const [dateRange, setDateRange] = React.useState<'week' | 'month' | 'quarter' | 'year' | 'custom'>('month');
  const [startDate, setStartDate] = React.useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = React.useState<Date>(endOfMonth(new Date()));

  const report = React.useMemo(() => {
    return generateFinancialReport(startDate, endDate);
  }, [startDate, endDate]);

  const overdueInvoices = getOverdueInvoices();
  const collectionHealth = report.summary.collectionRate >= 80 ? 'excellent' : 
                          report.summary.collectionRate >= 60 ? 'good' :
                          'needs-attention';

  const handleDateRangeChange = (range: typeof dateRange) => {
    setDateRange(range);
    const today = new Date();
    
    switch (range) {
      case 'week':
        setStartDate(subDays(today, 7));
        setEndDate(today);
        break;
      case 'month':
        setStartDate(startOfMonth(today));
        setEndDate(endOfMonth(today));
        break;
      case 'quarter':
        const quarter = Math.floor(today.getMonth() / 3);
        setStartDate(new Date(today.getFullYear(), quarter * 3, 1));
        setEndDate(new Date(today.getFullYear(), (quarter + 1) * 3, 0));
        break;
      case 'year':
        setStartDate(new Date(today.getFullYear(), 0, 1));
        setEndDate(new Date(today.getFullYear(), 11, 31));
        break;
    }
  };

  const downloadReport = () => {
    const csv = generateCSVReport(report);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `financial-report-${dateRange}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDateRangeChange(range)}
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
        <Button
          onClick={downloadReport}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {formatCurrency(report.summary.totalRevenue)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {report.summary.totalInvoices} invoices
                </p>
              </div>
              <div className="rounded-lg p-3 bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Collected */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Collected</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {formatCurrency(report.summary.totalPaid)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {report.summary.collectionRate.toFixed(1)}% collected
                </p>
              </div>
              <div className={`rounded-lg p-3 ${collectionHealth === 'excellent' ? 'bg-green-100' : collectionHealth === 'good' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <TrendingUp className={`h-6 w-6 ${collectionHealth === 'excellent' ? 'text-green-600' : collectionHealth === 'good' ? 'text-yellow-600' : 'text-red-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Amount */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="mt-2 text-2xl font-bold text-orange-600">
                  {formatCurrency(report.summary.totalPending)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {report.summary.totalInvoices - report.byPaymentStatus.paid} outstanding
                </p>
              </div>
              <div className="rounded-lg p-3 bg-orange-100">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Invoice */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Invoice</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {formatCurrency(report.summary.averageInvoiceValue)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatCurrency(report.summary.totalVat)} in VAT
                </p>
              </div>
              <div className="rounded-lg p-3 bg-purple-100">
                <TrendingDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Paid</span>
                  <span className="text-sm font-bold text-gray-900">
                    {report.byPaymentStatus.paid}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${(report.byPaymentStatus.paid / Math.max(1, report.summary.totalInvoices)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Partially Paid</span>
                  <span className="text-sm font-bold text-gray-900">
                    {report.byPaymentStatus.partiallyPaid}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(report.byPaymentStatus.partiallyPaid / Math.max(1, report.summary.totalInvoices)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Pending</span>
                  <span className="text-sm font-bold text-gray-900">
                    {report.byPaymentStatus.pending}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${(report.byPaymentStatus.pending / Math.max(1, report.summary.totalInvoices)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Overdue</span>
                  <span className="text-sm font-bold text-red-600">
                    {report.byPaymentStatus.overdue}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: `${(report.byPaymentStatus.overdue / Math.max(1, report.summary.totalInvoices)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {Object.entries(report.byPaymentMethod).length > 0 ? (
                Object.entries(report.byPaymentMethod).map(([method, amount]) => (
                  <div key={method} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {method.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No payment data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Invoices Alert */}
      {overdueInvoices.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">
                  {overdueInvoices.length} Overdue Invoice{overdueInvoices.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-red-700 mb-4">
                  Action required: {formatCurrency(overdueInvoices.reduce((sum, inv) => sum + (inv.total - inv.paidAmount), 0))} outstanding
                </p>
                <div className="space-y-2">
                  {overdueInvoices.slice(0, 3).map((invoice) => (
                    <div key={invoice.id} className="text-sm text-red-600 flex items-center justify-between">
                      <span>{invoice.invoiceNumber}</span>
                      <span className="font-semibold">{formatCurrency(invoice.total - invoice.paidAmount)} due</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/**
 * Generate CSV export of financial report
 */
function generateCSVReport(report: ReturnType<typeof generateFinancialReport>): string {
  let csv = 'Financial Report\n';
  csv += `Period: ${formatDate(report.period.startDate, 'MMM d, yyyy')} - ${formatDate(report.period.endDate, 'MMM d, yyyy')}\n\n`;
  
  csv += 'SUMMARY\n';
  csv += `Total Revenue,${report.summary.totalRevenue}\n`;
  csv += `Total Paid,${report.summary.totalPaid}\n`;
  csv += `Total Pending,${report.summary.totalPending}\n`;
  csv += `Total VAT,${report.summary.totalVat}\n`;
  csv += `Average Invoice,${report.summary.averageInvoiceValue}\n`;
  csv += `Collection Rate,${report.summary.collectionRate}%\n\n`;
  
  csv += 'PAYMENT STATUS\n';
  csv += `Paid,${report.byPaymentStatus.paid}\n`;
  csv += `Partially Paid,${report.byPaymentStatus.partiallyPaid}\n`;
  csv += `Pending,${report.byPaymentStatus.pending}\n`;
  csv += `Overdue,${report.byPaymentStatus.overdue}\n\n`;
  
  csv += 'INVOICES\n';
  csv += 'Invoice Number,Amount,VAT,Total,Status,Due Date\n';
  report.invoices.forEach((invoice) => {
    csv += `${invoice.invoiceNumber},${invoice.subtotal},${invoice.vatAmount},${invoice.total},${invoice.paymentStatus},${formatDate(invoice.dueDate, 'MMM d, yyyy')}\n`;
  });
  
  return csv;
}
