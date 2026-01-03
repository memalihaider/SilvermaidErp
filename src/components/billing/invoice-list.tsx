'use client';

import * as React from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
} from '@/components/ui';
import {
  MoreHorizontal,
  Eye,
  Download,
  Send,
  CreditCard,
  FileText,
} from 'lucide-react';
import { mockInvoices, getBookingWithRelations } from '@/lib/mock-data';
import {
  formatDate,
  formatCurrency,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/lib/utils';
import type { Invoice } from '@/types';
import { InvoiceDetailModal } from './invoice-detail-modal';
import { useToast } from '@/components/ui/toast';

export function InvoiceList() {
  const { showToast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [showMenu, setShowMenu] = React.useState<string | null>(null);

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowMenu(null);
  };

  // Sort invoices by date (newest first)
  const sortedInvoices = [...mockInvoices].sort(
    (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
  );

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>VAT</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvoices.map((invoice) => {
              const booking = getBookingWithRelations(invoice.bookingId);
              const isOverdue =
                invoice.paymentStatus === 'PENDING' &&
                new Date(invoice.dueDate) < new Date();

              return (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{invoice.invoiceNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">
                      {booking?.customer?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking?.bookingNumber}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{booking?.service?.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(booking?.scheduledDate || new Date(), 'MMM d, yyyy')}
                    </p>
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.subtotal)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {formatCurrency(invoice.vatAmount)} ({invoice.vatRate}%)
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">
                      {formatCurrency(invoice.total)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        isOverdue
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : getPaymentStatusColor(invoice.paymentStatus)
                      }
                    >
                      {isOverdue ? 'Overdue' : getPaymentStatusLabel(invoice.paymentStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm ${
                        isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {formatDate(invoice.dueDate, 'MMM d, yyyy')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setShowMenu(showMenu === invoice.id ? null : invoice.id)
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>

                      {showMenu === invoice.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowMenu(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleViewInvoice(invoice);
                                  setShowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </button>
                              <button 
                                onClick={() => {
                                  showToast(`Downloading ${invoice.invoiceNumber}...`, 'info');
                                  setShowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Download className="h-4 w-4" />
                                Download PDF
                              </button>
                              <button 
                                onClick={() => {
                                  showToast(`Sending ${invoice.invoiceNumber} to customer...`, 'info');
                                  setShowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Send className="h-4 w-4" />
                                Send to Customer
                              </button>
                              {invoice.paymentStatus === 'PENDING' && (
                                <button 
                                  onClick={() => {
                                    showToast(`${invoice.invoiceNumber} marked as paid!`, 'success');
                                    setShowMenu(null);
                                  }}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-green-700 hover:bg-green-50"
                                >
                                  <CreditCard className="h-4 w-4" />
                                  Mark as Paid
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing {sortedInvoices.length} of {sortedInvoices.length} invoices
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </>
  );
}
