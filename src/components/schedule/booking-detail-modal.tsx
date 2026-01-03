'use client';

import * as React from 'react';
import { Modal, ModalFooter, Button, Badge, Avatar } from '@/components/ui';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  DollarSign,
  Edit2,
  CheckCircle,
  XCircle,
  Play,
} from 'lucide-react';
import type { Booking } from '@/types';
import {
  formatDate,
  formatTime,
  formatCurrency,
  getBookingStatusColor,
  getBookingStatusLabel,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/lib/utils';

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDetailModal({
  booking,
  isOpen,
  onClose,
}: BookingDetailModalProps) {
  if (!booking) return null;

  const canStart = booking.status === 'CONFIRMED';
  const canComplete = booking.status === 'IN_PROGRESS';
  const canCancel = ['PENDING', 'CONFIRMED'].includes(booking.status);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Booking ${booking.bookingNumber}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Status & Actions Row */}
        <div className="flex items-center justify-between">
          <Badge className={getBookingStatusColor(booking.status)}>
            {getBookingStatusLabel(booking.status)}
          </Badge>
          <div className="flex gap-2">
            {canStart && (
              <Button size="sm" variant="success">
                <Play className="h-4 w-4 mr-1" />
                Start Job
              </Button>
            )}
            {canComplete && (
              <Button size="sm" variant="success">
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
            )}
            {canCancel && (
              <Button size="sm" variant="destructive">
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Customer</h4>
          <div className="flex items-start gap-3">
            <Avatar fallback={booking.customer?.name || '?'} size="lg" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {booking.customer?.name}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Phone className="h-3.5 w-3.5" />
                {booking.customer?.phone}
              </div>
              {booking.customer?.email && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail className="h-3.5 w-3.5" />
                  {booking.customer?.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Schedule</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{formatDate(booking.scheduledDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  {formatTime(booking.scheduledTime)} - {formatTime(booking.endTime)}
                </span>
              </div>
              <div className="text-sm text-gray-500 ml-6">
                Duration: {booking.durationMinutes} minutes
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Location</h4>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p>{booking.address?.building}</p>
                {booking.address?.floor && <p>Floor {booking.address.floor}</p>}
                <p>{booking.address?.area}, {booking.address?.city}</p>
              </div>
            </div>
            {booking.address?.notes && (
              <p className="text-xs text-gray-500 mt-2 ml-6">
                Note: {booking.address.notes}
              </p>
            )}
          </div>
        </div>

        {/* Service */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Service</h4>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{booking.service?.name}</p>
              <p className="text-sm text-gray-500">
                {booking.service?.description}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(booking.basePrice)}</p>
              {booking.adjustments !== 0 && (
                <p className="text-sm text-gray-500">
                  Adj: {formatCurrency(booking.adjustments)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Assigned Staff */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Assigned Staff</h4>
          <div className="flex flex-wrap gap-3">
            {booking.staff?.map((bs) => (
              <div
                key={bs.id}
                className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200"
              >
                <Avatar fallback={bs.staff?.user?.name || '?'} size="sm" />
                <div>
                  <p className="text-sm font-medium">{bs.staff?.user?.name}</p>
                  {bs.isLead && (
                    <Badge variant="info" className="text-xs">
                      Lead
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {(!booking.staff || booking.staff.length === 0) && (
              <p className="text-sm text-gray-500">No staff assigned</p>
            )}
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Special Requests
            </h4>
            <p className="text-sm text-yellow-700">{booking.specialRequests}</p>
          </div>
        )}

        {/* Billing Summary */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Billing</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Base Price</span>
              <span>{formatCurrency(booking.basePrice)}</span>
            </div>
            {booking.adjustments !== 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Adjustments</span>
                <span className={booking.adjustments < 0 ? 'text-red-600' : ''}>
                  {formatCurrency(booking.adjustments)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (5%)</span>
              <span>{formatCurrency(booking.vatAmount)}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>{formatCurrency(booking.totalPrice)}</span>
            </div>
            {booking.invoice && (
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-500">Payment Status</span>
                <Badge className={getPaymentStatusColor(booking.invoice.paymentStatus)}>
                  {getPaymentStatusLabel(booking.invoice.paymentStatus)}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>
          <Edit2 className="h-4 w-4 mr-1" />
          Edit Booking
        </Button>
      </ModalFooter>
    </Modal>
  );
}
