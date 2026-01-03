'use client';

import { Card, CardContent } from '@/components/ui';
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockInvoices } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export function BillingStats() {
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidRevenue = mockInvoices
    .filter((inv) => inv.paymentStatus === 'PAID')
    .reduce((sum, inv) => sum + inv.total, 0);
  const pendingRevenue = mockInvoices
    .filter((inv) => inv.paymentStatus === 'PENDING')
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdueInvoices = mockInvoices.filter(
    (inv) =>
      inv.paymentStatus === 'PENDING' && new Date(inv.dueDate) < new Date()
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="rounded-lg p-3 bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Collected</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {formatCurrency(paidRevenue)}
              </p>
            </div>
            <div className="rounded-lg p-3 bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {formatCurrency(pendingRevenue)}
              </p>
            </div>
            <div className="rounded-lg p-3 bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {overdueInvoices}
              </p>
              <p className="text-sm text-gray-500">invoices</p>
            </div>
            <div className="rounded-lg p-3 bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
