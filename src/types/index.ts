// Silver Maid ERP - Type Definitions
// These mirror Prisma schema but are used for frontend/mock data

// ============================================
// ENUMS
// ============================================

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export type Skill = 
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'DEEP_CLEAN'
  | 'CARPET_CLEANING'
  | 'WINDOW_CLEANING'
  | 'POST_CONSTRUCTION'
  | 'MOVE_IN_OUT';

export type CustomerType = 'RESIDENTIAL' | 'COMMERCIAL';

export type BookingStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export type BookingSource = 
  | 'WEBSITE'
  | 'PHONE'
  | 'WALK_IN'
  | 'REFERRAL'
  | 'REPEAT';

export type PaymentStatus = 
  | 'PENDING'
  | 'PAID'
  | 'PARTIALLY_PAID'
  | 'REFUNDED'
  | 'VOID';

export type PaymentMethod = 
  | 'CASH'
  | 'CARD'
  | 'BANK_TRANSFER'
  | 'ONLINE';

// ============================================
// ENTITIES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Staff {
  id: string;
  userId: string;
  employeeId: string;
  phone: string;
  emergencyContact: string | null;
  address: string | null;
  skills: Skill[];
  hourlyRate: number;
  isActive: boolean;
  hireDate: Date;
  terminatedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  // Relations
  user?: User;
  availability?: StaffAvailability[];
}

export interface StaffAvailability {
  id: string;
  staffId: string;
  dayOfWeek: number; // 0-6
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface StaffPerformance {
  id: string;
  staffId: string;
  month: Date;
  completedJobs: number;
  cancelledJobs: number;
  avgRating: number | null;
  totalHours: number;
  onTimeRate: number | null;
}

export interface Customer {
  id: string;
  type: CustomerType;
  name: string;
  email: string | null;
  phone: string;
  companyName: string | null;
  taxId: string | null;
  notes: string | null;
  preferences: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  // Relations
  addresses?: CustomerAddress[];
  bookings?: Booking[];
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  label: string;
  street: string;
  building: string | null;
  floor: string | null;
  apartment: string | null;
  area: string;
  city: string;
  emirate: string;
  country: string;
  coordinates: string | null;
  notes: string | null;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
  priceUnit: 'flat' | 'hourly' | 'per_sqm';
  durationMinutes: number;
  minCrewSize: number;
  maxCrewSize: number;
  requiredSkills: Skill[];
  vatRate: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  serviceId: string;
  addressId: string;
  scheduledDate: Date;
  scheduledTime: string;
  durationMinutes: number;
  endTime: string;
  status: BookingStatus;
  source: BookingSource;
  basePrice: number;
  adjustments: number;
  vatAmount: number;
  totalPrice: number;
  specialRequests: string | null;
  internalNotes: string | null;
  customerRating: number | null;
  customerFeedback: string | null;
  confirmedAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  // Relations
  customer?: Customer;
  service?: Service;
  address?: CustomerAddress;
  staff?: BookingStaff[];
  invoice?: Invoice;
}

export interface BookingStaff {
  id: string;
  bookingId: string;
  staffId: string;
  isLead: boolean;
  staff?: Staff;
}

export interface Invoice {
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
  // Relations
  booking?: Booking;
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  todayBookings: number;
  pendingBookings: number;
  activeCrews: number;
  completedToday: number;
  revenueToday: number;
  revenueThisMonth: number;
  newCustomers: number;
  conflictAlerts: ConflictAlert[];
}

export interface ConflictAlert {
  id: string;
  type: 'OVERLAP' | 'UNDERSTAFFED' | 'AVAILABILITY' | 'TRAVEL_TIME';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  bookingId?: string;
  staffId?: string;
  createdAt: Date;
}

// ============================================
// SCHEDULING TYPES
// ============================================

export interface TimeSlot {
  time: string;
  available: boolean;
  bookingId?: string;
}

export interface ScheduleDay {
  date: Date;
  slots: TimeSlot[];
  bookings: Booking[];
}

export interface StaffSchedule {
  staffId: string;
  staff: Staff;
  bookings: Booking[];
  availability: StaffAvailability[];
}

// ============================================
// FILTER & PAGINATION TYPES
// ============================================

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookingFilters {
  status?: BookingStatus;
  customerId?: string;
  staffId?: string;
  serviceId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface CustomerFilters {
  type?: CustomerType;
  isActive?: boolean;
  search?: string;
}

export interface StaffFilters {
  isActive?: boolean;
  skills?: Skill[];
  search?: string;
}

export interface InvoiceFilters {
  paymentStatus?: PaymentStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}
