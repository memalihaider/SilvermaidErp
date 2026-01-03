import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, isToday, isTomorrow, isPast, addMinutes, parse } from 'date-fns';

// ============================================
// CLASS NAME UTILITIES
// ============================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// DATE & TIME UTILITIES
// ============================================

export function formatDate(date: Date | string, formatStr: string = 'dd MMM yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr);
}

export function formatTime(time: string): string {
  // Convert "09:00" to "9:00 AM"
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function formatDateTime(date: Date | string, time: string): string {
  return `${formatDate(date)} at ${formatTime(time)}`;
}

export function getRelativeDate(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isPast(date)) return formatDate(date);
  return formatDate(date, 'EEEE, dd MMM');
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const baseDate = new Date();
  const startDate = parse(startTime, 'HH:mm', baseDate);
  const endDate = addMinutes(startDate, durationMinutes);
  return format(endDate, 'HH:mm');
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// ============================================
// CURRENCY & NUMBER UTILITIES
// ============================================

export function formatCurrency(amount: number, currency: string = 'AED'): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-AE').format(num);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ============================================
// STRING UTILITIES
// ============================================

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================
// STATUS HELPERS
// ============================================

import type { BookingStatus, PaymentStatus } from '@/types';

export function getBookingStatusColor(status: BookingStatus): string {
  const colors: Record<BookingStatus, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
    IN_PROGRESS: 'bg-purple-100 text-purple-800 border-purple-200',
    COMPLETED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    NO_SHOW: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[status];
}

export function getBookingStatusLabel(status: BookingStatus): string {
  const labels: Record<BookingStatus, string> = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    NO_SHOW: 'No Show',
  };
  return labels[status];
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    PAID: 'bg-green-100 text-green-800 border-green-200',
    PARTIALLY_PAID: 'bg-orange-100 text-orange-800 border-orange-200',
    REFUNDED: 'bg-purple-100 text-purple-800 border-purple-200',
    VOID: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[status];
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    PENDING: 'Pending',
    PAID: 'Paid',
    PARTIALLY_PAID: 'Partial',
    REFUNDED: 'Refunded',
    VOID: 'Void',
  };
  return labels[status];
}

// ============================================
// SKILL HELPERS
// ============================================

import type { Skill } from '@/types';

export function getSkillLabel(skill: Skill): string {
  const labels: Record<Skill, string> = {
    RESIDENTIAL: 'Residential',
    COMMERCIAL: 'Commercial',
    DEEP_CLEAN: 'Deep Clean',
    CARPET_CLEANING: 'Carpet',
    WINDOW_CLEANING: 'Window',
    POST_CONSTRUCTION: 'Post-Construction',
    MOVE_IN_OUT: 'Move In/Out',
  };
  return labels[skill];
}

export function getSkillColor(skill: Skill): string {
  const colors: Record<Skill, string> = {
    RESIDENTIAL: 'bg-blue-100 text-blue-700',
    COMMERCIAL: 'bg-purple-100 text-purple-700',
    DEEP_CLEAN: 'bg-green-100 text-green-700',
    CARPET_CLEANING: 'bg-orange-100 text-orange-700',
    WINDOW_CLEANING: 'bg-cyan-100 text-cyan-700',
    POST_CONSTRUCTION: 'bg-red-100 text-red-700',
    MOVE_IN_OUT: 'bg-yellow-100 text-yellow-700',
  };
  return colors[skill];
}

// ============================================
// VALIDATION UTILITIES
// ============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // UAE phone number format
  const phoneRegex = /^\+971[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function formatPhoneNumber(phone: string): string {
  // Format: +971 50 123 4567
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('971')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
}

// ============================================
// BOOKING NUMBER GENERATOR
// ============================================

export function generateBookingNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `BK-${year}-${sequence.toString().padStart(5, '0')}`;
}

export function generateInvoiceNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `INV-${year}-${sequence.toString().padStart(5, '0')}`;
}

// ============================================
// DAY OF WEEK HELPERS
// ============================================

export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
}

export function getDayShortName(dayOfWeek: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayOfWeek];
}
