# Billing & Financial Report Documentation

## Overview

The billing system has been enhanced with advanced financial reporting and invoice generation capabilities. This document covers the new features and how to use them.

## New Features

### 1. Advanced Financial Report Page

The financial report page provides comprehensive financial analytics and insights into your business performance.

#### Features:
- **Date Range Filtering**: View reports for Week, Month, Quarter, or custom date ranges
- **Summary Metrics**:
  - Total Revenue
  - Amount Collected
  - Pending Amounts
  - Average Invoice Value
- **Payment Status Breakdown**: Visual representation of paid, partially paid, pending, and overdue invoices
- **Payment Method Analysis**: See revenue by payment method (Cash, Card, Bank Transfer, Online)
- **Overdue Invoice Alerts**: Quick view of overdue invoices with action required
- **CSV Export**: Download financial reports for external analysis

#### Location:
Navigate to the **Billing** page, then click the **Financial Report** tab.

### 2. Invoice Generation Function

Automatically generate professional invoices from bookings with customizable terms.

#### Features:
- **Automatic Calculation**: Computes subtotal, VAT, discounts, and totals
- **Customizable Payment Terms**: Set due dates (immediate, 7, 14, 30, or 60 days)
- **Discount Management**: Apply discounts before invoice creation
- **Invoice Numbering**: Automatic sequential invoice numbers
- **PDF Export**: Download invoices as downloadable files
- **Booking Integration**: Automatically populates from booking details

#### How to Generate an Invoice:

```typescript
import { createInvoiceFromBooking, generateInvoicePDF } from '@/lib/invoice-generator';

// Create invoice from booking
const invoice = createInvoiceFromBooking(
  bookingId: string,
  paymentTermsDays: number = 7,    // Payment terms in days
  discountAmount: number = 0        // Discount in currency
);

// Generate PDF data
const pdfData = generateInvoicePDF(invoice);
```

### 3. Financial Report Generation

Generate detailed financial reports for any date range.

#### Usage:

```typescript
import { generateFinancialReport } from '@/lib/invoice-generator';

const startDate = new Date('2025-01-01');
const endDate = new Date('2025-01-31');

const report = generateFinancialReport(startDate, endDate);

// Report structure:
// {
//   period: { startDate, endDate },
//   summary: {
//     totalInvoices: number,
//     totalRevenue: number,
//     totalPaid: number,
//     totalPending: number,
//     totalVat: number,
//     averageInvoiceValue: number,
//     collectionRate: number (percentage)
//   },
//   byPaymentStatus: {
//     paid: number,
//     pending: number,
//     partiallyPaid: number,
//     overdue: number
//   },
//   byPaymentMethod: {
//     [method]: amount
//   },
//   invoices: Invoice[]
// }
```

## Components

### FinancialReportSection
Main component for displaying financial reports with interactive date range selection and data visualization.

**Location**: `src/components/billing/financial-report.tsx`

**Props**: None (uses mock data directly)

**Example Usage**:
```tsx
import { FinancialReportSection } from '@/components/billing';

export function MyBillingPage() {
  return <FinancialReportSection />;
}
```

### InvoiceGenerationModal
Modal component for generating invoices from bookings.

**Location**: `src/components/billing/invoice-generation-modal.tsx`

**Props**:
```typescript
interface InvoiceGenerationModalProps {
  isOpen: boolean;                    // Whether modal is open
  onClose: () => void;                // Callback when modal closes
  booking: Booking | null;            // Booking to generate invoice for
  onInvoiceGenerated?: () => void;    // Callback after invoice generation
}
```

**Example Usage**:
```tsx
import { InvoiceGenerationModal } from '@/components/billing';
import { useState } from 'react';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Generate Invoice</button>
      <InvoiceGenerationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        booking={selectedBooking}
      />
    </>
  );
}
```

## Utility Functions

### Invoice Generator Functions

Located in `src/lib/invoice-generator.ts`

#### `createInvoiceFromBooking(bookingId, paymentTermsDays?, discountAmount?)`
Creates a new invoice from a booking.

**Returns**: `Invoice | null`

#### `generateInvoicePDF(invoice)`
Generates PDF-ready data from an invoice.

**Returns**: Formatted invoice data object

#### `recordPayment(invoiceId, paymentAmount, paymentMethod, paidAt?)`
Records a payment against an invoice.

**Returns**: Updated `Invoice | null`

#### `generateFinancialReport(startDate, endDate)`
Generates comprehensive financial report for date range.

**Returns**: Report object with summary, breakdown by status and method

#### `getOverdueInvoices()`
Returns list of overdue invoices.

**Returns**: `Invoice[]`

#### `getUpcomingDueInvoices(daysAhead?)`
Returns invoices due within specified days.

**Returns**: `Invoice[]`

## Financial Metrics Explained

### Collection Rate
Percentage of billed amount that has been collected.
```
Collection Rate = (Total Paid / Total Revenue) × 100
```

### Average Invoice Value
Average amount per invoice in the period.
```
Average Invoice Value = Total Revenue / Total Invoices
```

### Overdue Invoices
Invoices that were due before today's date and are still pending payment.

### Pending Amount
Sum of all unpaid amounts from pending and partially paid invoices.

## Integration Guide

### Step 1: Enable Invoice Generation in Billing
The financial report and invoice generation are already integrated into the billing page through tabs.

### Step 2: Customize Payment Terms
Modify default payment terms in the invoice generation modal by editing the select options.

### Step 3: Configure VAT Rate
Current VAT rate is hardcoded to 5%. To change:

**File**: `src/lib/invoice-generator.ts`
**Function**: `createInvoiceFromBooking`

```typescript
// Change this line:
const vatAmount = (subtotal - discountAmount) * 0.05;  // 5% VAT

// To your desired rate:
const vatAmount = (subtotal - discountAmount) * 0.10;  // 10% VAT
```

### Step 4: Customize Report Format
The CSV export format can be customized by editing the `generateCSVReport` function in `src/components/billing/financial-report.tsx`.

## File Structure

```
src/
├── lib/
│   └── invoice-generator.ts          # Invoice generation utilities
├── components/
│   └── billing/
│       ├── financial-report.tsx       # Financial report component
│       ├── invoice-generation-modal.tsx # Invoice generation modal
│       └── index.ts                   # Exports
└── app/
    └── billing/
        └── page.tsx                   # Updated billing page with tabs
```

## Demo Data

The system uses mock data from `src/lib/mock-data.ts`. In a production environment, replace these with actual database queries.

### Sample Invoice Data
- Invoice numbers follow the format: `INV-YYYY-NNNNN`
- VAT is calculated at 5% of subtotal minus discount
- Payment terms default to 7 days from issue date

## Future Enhancements

Potential improvements for future releases:

1. **Email Integration**: Send invoices via email
2. **PDF Generation**: Generate actual PDF files (currently exports text)
3. **Payment Reminders**: Automated reminders for overdue invoices
4. **Multi-currency Support**: Handle multiple currencies
5. **Custom Invoice Templates**: Allow customizable invoice designs
6. **Recurring Invoices**: Automatic invoice generation for repeat services
7. **Payment Plans**: Split invoice payments over multiple transactions
8. **Tax Configuration**: UI for managing tax rates and rules

## Troubleshooting

### Invoice Not Appearing
- Ensure booking has a related customer and service
- Check that booking ID is valid
- Verify mock data contains the booking

### Financial Report Shows No Data
- Ensure date range includes invoices
- Check that invoices are created within the date range
- Verify mock invoice data is loaded

### Export Not Working
- Check browser allows file downloads
- Verify CSV format is properly generated
- Try exporting with shorter date range

## API Reference

### Types

```typescript
// Invoice type
interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  paidAmount: number;
  paidAt: Date | null;
  issuedAt: Date;
  dueDate: Date;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Payment status
type PaymentStatus = 'PENDING' | 'PAID' | 'PARTIALLY_PAID' | 'REFUNDED' | 'VOID';

// Payment methods
type PaymentMethod = 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'ONLINE';
```

## Support

For questions or issues with the billing system, please refer to the main README.md or contact the development team.
