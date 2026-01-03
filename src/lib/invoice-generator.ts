// Invoice Generation Utility
import { Invoice, Booking, PaymentMethod, PaymentStatus } from '@/types';
import { mockInvoices, mockBookings, getBookingWithRelations } from './mock-data';
import { formatDate } from './utils';
import { addDays } from 'date-fns';

/**
 * Generate a new invoice number based on current date and sequence
 */
export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const sequence = mockInvoices.length + 1;
  return `INV-${year}-${String(sequence).padStart(5, '0')}`;
}

/**
 * Create invoice from a booking
 */
export function createInvoiceFromBooking(
  bookingId: string,
  paymentTermsDays: number = 7,
  discountAmount: number = 0
): Invoice | null {
  const booking = getBookingWithRelations(bookingId);
  
  if (!booking) {
    return null;
  }

  // Check if invoice already exists
  const existingInvoice = mockInvoices.find(inv => inv.bookingId === bookingId);
  if (existingInvoice) {
    return existingInvoice;
  }

  const today = new Date();
  const subtotal = booking.basePrice + booking.adjustments;
  const vatAmount = (subtotal - discountAmount) * (booking.vatAmount ? (booking.vatAmount / subtotal) : 0.05);
  const total = subtotal + vatAmount - discountAmount;

  const invoice: Invoice = {
    id: `inv_${mockInvoices.length + 1}`,
    invoiceNumber: generateInvoiceNumber(),
    bookingId: bookingId,
    subtotal: subtotal,
    vatRate: booking.vatAmount ? (booking.vatAmount / booking.basePrice) * 100 : 5,
    vatAmount: vatAmount,
    discount: discountAmount,
    total: total,
    paymentStatus: 'PENDING' as PaymentStatus,
    paymentMethod: null,
    paidAmount: 0,
    paidAt: null,
    issuedAt: today,
    dueDate: addDays(today, paymentTermsDays),
    notes: null,
    createdAt: today,
    updatedAt: today,
  };

  return invoice;
}

/**
 * Record a payment for an invoice
 */
export function recordPayment(
  invoiceId: string,
  paymentAmount: number,
  paymentMethod: PaymentMethod,
  paidAt: Date = new Date()
): Invoice | null {
  const invoice = mockInvoices.find(inv => inv.id === invoiceId);
  
  if (!invoice) {
    return null;
  }

  const newPaidAmount = invoice.paidAmount + paymentAmount;
  const newPaymentStatus: PaymentStatus = 
    newPaidAmount >= invoice.total ? 'PAID' :
    newPaidAmount > 0 ? 'PARTIALLY_PAID' :
    'PENDING';

  const updatedInvoice: Invoice = {
    ...invoice,
    paidAmount: newPaidAmount,
    paymentStatus: newPaymentStatus,
    paymentMethod: newPaymentStatus === 'PAID' ? paymentMethod : invoice.paymentMethod,
    paidAt: newPaymentStatus === 'PAID' ? paidAt : invoice.paidAt,
    updatedAt: new Date(),
  };

  return updatedInvoice;
}

/**
 * Generate PDF content for invoice (returns formatted data for PDF generation)
 */
export function generateInvoicePDF(invoice: Invoice) {
  const booking = getBookingWithRelations(invoice.bookingId);
  
  if (!booking) {
    return null;
  }

  const content = {
    invoiceNumber: invoice.invoiceNumber,
    issueDate: formatDate(invoice.issuedAt, 'MMM d, yyyy'),
    dueDate: formatDate(invoice.dueDate, 'MMM d, yyyy'),
    customerName: booking.customer?.name,
    customerEmail: booking.customer?.email,
    customerPhone: booking.customer?.phone,
    customerType: booking.customer?.type,
    serviceName: booking.service?.name,
    serviceDescription: booking.service?.description,
    scheduledDate: formatDate(booking.scheduledDate, 'MMM d, yyyy'),
    scheduledTime: booking.scheduledTime,
    location: booking.address ? 
      `${booking.address.building}, ${booking.address.area}, ${booking.address.city}` :
      '',
    lineItems: [
      {
        description: booking.service?.name,
        quantity: 1,
        unitPrice: invoice.subtotal,
        total: invoice.subtotal,
      }
    ],
    subtotal: invoice.subtotal,
    vatRate: invoice.vatRate,
    vatAmount: invoice.vatAmount,
    discount: invoice.discount,
    total: invoice.total,
    paymentStatus: invoice.paymentStatus,
    paymentMethod: invoice.paymentMethod,
    dueAmount: Math.max(0, invoice.total - invoice.paidAmount),
    notes: invoice.notes,
  };

  return content;
}

/**
 * Generate financial report data
 */
export function generateFinancialReport(startDate: Date, endDate: Date) {
  const invoicesInRange = mockInvoices.filter(inv => {
    const invDate = new Date(inv.issuedAt);
    return invDate >= startDate && invDate <= endDate;
  });

  const totalInvoices = invoicesInRange.length;
  const totalRevenue = invoicesInRange.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoicesInRange.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalPending = invoicesInRange.reduce((sum, inv) => sum + Math.max(0, inv.total - inv.paidAmount), 0);
  const totalVat = invoicesInRange.reduce((sum, inv) => sum + inv.vatAmount, 0);

  const byPaymentStatus = {
    paid: invoicesInRange.filter(inv => inv.paymentStatus === 'PAID').length,
    pending: invoicesInRange.filter(inv => inv.paymentStatus === 'PENDING').length,
    partiallyPaid: invoicesInRange.filter(inv => inv.paymentStatus === 'PARTIALLY_PAID').length,
    overdue: invoicesInRange.filter(inv => 
      inv.paymentStatus === 'PENDING' && new Date(inv.dueDate) < new Date()
    ).length,
  };

  const byPaymentMethod: Record<string, number> = {};
  invoicesInRange.forEach(inv => {
    if (inv.paymentMethod) {
      byPaymentMethod[inv.paymentMethod] = (byPaymentMethod[inv.paymentMethod] || 0) + inv.paidAmount;
    }
  });

  const averageInvoiceValue = totalInvoices > 0 ? totalRevenue / totalInvoices : 0;
  const collectionRate = totalRevenue > 0 ? (totalPaid / totalRevenue) * 100 : 0;

  return {
    period: {
      startDate,
      endDate,
    },
    summary: {
      totalInvoices,
      totalRevenue,
      totalPaid,
      totalPending,
      totalVat,
      averageInvoiceValue,
      collectionRate,
    },
    byPaymentStatus,
    byPaymentMethod,
    invoices: invoicesInRange,
  };
}

/**
 * Get overdue invoices
 */
export function getOverdueInvoices() {
  const today = new Date();
  return mockInvoices.filter(inv =>
    inv.paymentStatus === 'PENDING' &&
    new Date(inv.dueDate) < today
  );
}

/**
 * Get invoices due soon (next 7 days)
 */
export function getUpcomingDueInvoices(daysAhead: number = 7) {
  const today = new Date();
  const futureDate = addDays(today, daysAhead);

  return mockInvoices.filter(inv =>
    inv.paymentStatus === 'PENDING' &&
    new Date(inv.dueDate) <= futureDate &&
    new Date(inv.dueDate) > today
  );
}
