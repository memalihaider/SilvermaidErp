'use client';

import * as React from 'react';
import { Modal, Button, Input, Label, Select } from '@/components/ui';
import { FileText, Copy, Check } from 'lucide-react';
import {
  createInvoiceFromBooking,
  generateInvoicePDF,
} from '@/lib/invoice-generator';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Booking } from '@/types';
import { getBookingWithRelations } from '@/lib/mock-data';

interface InvoiceGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onInvoiceGenerated?: () => void;
}

export function InvoiceGenerationModal({
  isOpen,
  onClose,
  booking,
  onInvoiceGenerated,
}: InvoiceGenerationModalProps) {
  const [paymentTerms, setPaymentTerms] = React.useState<number>(7);
  const [discountAmount, setDiscountAmount] = React.useState<number>(0);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedInvoice, setGeneratedInvoice] = React.useState<any>(null);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !booking) {
    return null;
  }

  const fullBooking = getBookingWithRelations(booking.id);
  const subtotal = booking.basePrice + booking.adjustments;
  const discount = discountAmount;
  const vat = (subtotal - discount) * 0.05;
  const total = subtotal + vat - discount;

  const handleGenerateInvoice = async () => {
    setIsGenerating(true);
    try {
      const invoice = createInvoiceFromBooking(booking.id, paymentTerms, discountAmount);
      if (invoice) {
        const pdfData = generateInvoicePDF(invoice);
        setGeneratedInvoice(pdfData);
        if (onInvoiceGenerated) {
          onInvoiceGenerated();
        }
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyInvoiceNumber = () => {
    if (generatedInvoice) {
      navigator.clipboard.writeText(generatedInvoice.invoiceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    if (generatedInvoice) {
      // In a real application, this would generate an actual PDF
      const content = `
INVOICE
${generatedInvoice.invoiceNumber}

Date: ${generatedInvoice.issueDate}
Due Date: ${generatedInvoice.dueDate}

CUSTOMER
${generatedInvoice.customerName}
${generatedInvoice.customerEmail}
${generatedInvoice.customerPhone}

SERVICE
${generatedInvoice.serviceName}
Scheduled: ${generatedInvoice.scheduledDate} at ${generatedInvoice.scheduledTime}
Location: ${generatedInvoice.location}

AMOUNT BREAKDOWN
Subtotal: AED ${generatedInvoice.subtotal}
VAT (${generatedInvoice.vatRate}%): AED ${generatedInvoice.vatAmount}
Discount: AED ${generatedInvoice.discount}
Total: AED ${generatedInvoice.total}

Payment Status: ${generatedInvoice.paymentStatus}
Due Amount: AED ${generatedInvoice.dueAmount}

Notes: ${generatedInvoice.notes || 'None'}
      `.trim();

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${generatedInvoice.invoiceNumber}.txt`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (generatedInvoice) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Invoice Generated">
        <div className="space-y-6">
          {/* Success Message */}
          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
            <p className="text-sm font-medium text-green-900">
              Invoice successfully generated!
            </p>
          </div>

          {/* Invoice Preview */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg border">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Invoice Number</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  {generatedInvoice.invoiceNumber}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyInvoiceNumber}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Issue Date</p>
                <p className="font-semibold text-gray-900">
                  {generatedInvoice.issueDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold text-gray-900">
                  {generatedInvoice.dueDate}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Customer</p>
              <p className="text-sm text-gray-700">{generatedInvoice.customerName}</p>
              <p className="text-sm text-gray-600">{generatedInvoice.customerEmail}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Service</p>
              <p className="text-sm text-gray-700">{generatedInvoice.serviceName}</p>
              <p className="text-sm text-gray-600">
                {generatedInvoice.scheduledDate} at {generatedInvoice.scheduledTime}
              </p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  AED {generatedInvoice.subtotal}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT ({generatedInvoice.vatRate}%)</span>
                <span className="font-semibold text-gray-900">
                  AED {generatedInvoice.vatAmount}
                </span>
              </div>
              {generatedInvoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-gray-900">
                    -AED {generatedInvoice.discount}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  AED {generatedInvoice.total}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-600">Due Amount</p>
              <p className="text-2xl font-bold text-blue-600">
                AED {generatedInvoice.dueAmount}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadPDF}
              variant="default"
              className="flex-1 gap-2"
            >
              <FileText className="h-4 w-4" />
              Download Invoice
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Invoice">
      <div className="space-y-6">
        {/* Booking Summary */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm font-semibold text-gray-900 mb-2">Booking Summary</p>
          <p className="text-sm text-gray-700">{fullBooking?.service?.name}</p>
          <p className="text-sm text-gray-600">
            {formatDate(booking.scheduledDate, 'MMM d, yyyy')} at {booking.scheduledTime}
          </p>
          <p className="text-sm text-gray-700 mt-2 font-semibold">
            {fullBooking?.customer?.name}
          </p>
        </div>

        {/* Amount Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Service Price</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(booking.basePrice)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Adjustments</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(booking.adjustments)}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>

          {/* Discount Input */}
          <div>
            <Label htmlFor="discount" className="text-sm">
              Discount
            </Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max={subtotal}
              value={discountAmount}
              onChange={(e) => setDiscountAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              placeholder="0.00"
              className="mt-1"
            />
          </div>

          {/* VAT */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">VAT (5%)</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(vat)}
            </span>
          </div>

          {/* Total */}
          <div className="border-t pt-3 bg-blue-50 p-3 rounded">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div>
          <Label htmlFor="payment-terms" className="text-sm">
            Payment Terms (Days)
          </Label>
          <select
            value={paymentTerms.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentTerms(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Due immediately</option>
            <option value="7">Due in 7 days</option>
            <option value="14">Due in 14 days</option>
            <option value="30">Due in 30 days</option>
            <option value="60">Due in 60 days</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleGenerateInvoice}
            disabled={isGenerating}
            className="flex-1 gap-2"
          >
            <FileText className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Invoice'}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
