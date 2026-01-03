'use client';

import * as React from 'react';
import { Modal, ModalFooter, Button, Badge } from '@/components/ui';
import {
  FileText,
  Calendar,
  User,
  MapPin,
  Download,
  Send,
  CreditCard,
  Printer,
} from 'lucide-react';
import type { Invoice } from '@/types';
import { getBookingWithRelations } from '@/lib/mock-data';
import {
  formatDate,
  formatCurrency,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/lib/utils';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
}: InvoiceDetailModalProps) {
  if (!invoice) return null;

  const booking = getBookingWithRelations(invoice.bookingId);
  const isOverdue =
    invoice.paymentStatus === 'PENDING' &&
    new Date(invoice.dueDate) < new Date();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invoice ${invoice.invoiceNumber}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Invoice Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-lg font-semibold">{invoice.invoiceNumber}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Booking: {booking?.bookingNumber}
            </p>
          </div>
          <Badge
            className={
              isOverdue
                ? 'bg-red-100 text-red-800 border-red-200'
                : getPaymentStatusColor(invoice.paymentStatus)
            }
          >
            {isOverdue ? 'Overdue' : getPaymentStatusLabel(invoice.paymentStatus)}
          </Badge>
        </div>

        {/* Customer & Service Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Bill To</h4>
            <p className="font-medium text-gray-900">{booking?.customer?.name}</p>
            {booking?.customer?.companyName && (
              <p className="text-sm text-gray-600">{booking.customer.companyName}</p>
            )}
            <p className="text-sm text-gray-500">{booking?.customer?.phone}</p>
            {booking?.customer?.email && (
              <p className="text-sm text-gray-500">{booking.customer.email}</p>
            )}
            {booking?.customer?.taxId && (
              <p className="text-xs text-gray-400 mt-1">TRN: {booking.customer.taxId}</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Service Details</h4>
            <p className="font-medium text-gray-900">{booking?.service?.name}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(booking?.scheduledDate || new Date(), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-start gap-1 text-sm text-gray-500 mt-1">
              <MapPin className="h-3.5 w-3.5 mt-0.5" />
              <span>
                {booking?.address?.building}, {booking?.address?.area}
              </span>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-gray-500">Issued:</span>{' '}
            <span className="font-medium">
              {formatDate(invoice.issuedAt, 'MMM d, yyyy')}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Due:</span>{' '}
            <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {formatDate(invoice.dueDate, 'MMM d, yyyy')}
            </span>
          </div>
          {invoice.paidAt && (
            <div>
              <span className="text-gray-500">Paid:</span>{' '}
              <span className="font-medium text-green-600">
                {formatDate(invoice.paidAt, 'MMM d, yyyy')}
              </span>
            </div>
          )}
        </div>

        {/* Line Items */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3">
                  <p className="font-medium">{booking?.service?.name}</p>
                  <p className="text-sm text-gray-500">
                    {booking?.durationMinutes} minutes
                  </p>
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(booking?.basePrice || 0)}
                </td>
              </tr>
              {(booking?.adjustments || 0) !== 0 && (
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-gray-600">
                    {(booking?.adjustments || 0) < 0 ? 'Discount' : 'Additional charges'}
                  </td>
                  <td className={`px-4 py-3 text-right ${(booking?.adjustments || 0) < 0 ? 'text-red-600' : ''}`}>
                    {formatCurrency(booking?.adjustments || 0)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="text-red-600">-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT ({invoice.vatRate}%)</span>
              <span>{formatCurrency(invoice.vatAmount)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
            {invoice.paymentStatus === 'PARTIALLY_PAID' && (
              <>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Paid</span>
                  <span>{formatCurrency(invoice.paidAmount)}</span>
                </div>
                <div className="flex justify-between font-medium text-red-600">
                  <span>Balance Due</span>
                  <span>{formatCurrency(invoice.total - invoice.paidAmount)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Payment Info */}
        {invoice.paymentMethod && invoice.paymentStatus === 'PAID' && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-800 mb-1">Payment Received</h4>
            <p className="text-sm text-green-700">
              Paid via {invoice.paymentMethod.replace('_', ' ')} on{' '}
              {formatDate(invoice.paidAt || new Date(), 'MMMM d, yyyy')}
            </p>
          </div>
        )}

        {/* Notes */}
        {invoice.notes && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="outline">
          <Printer className="h-4 w-4 mr-1" />
          Print
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        {invoice.paymentStatus === 'PENDING' && (
          <Button variant="success">
            <CreditCard className="h-4 w-4 mr-1" />
            Mark as Paid
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}
