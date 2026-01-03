'use client';

import * as React from 'react';
import { Modal, ModalFooter, Button, Badge, Avatar, Card, CardContent } from '@/components/ui';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Edit2,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  TrendingUp,
} from 'lucide-react';
import type { Staff, Booking } from '@/types';
import {
  mockStaffAvailability,
  mockBookingStaff,
  mockBookings,
  getBookingWithRelations,
} from '@/lib/mock-data';
import {
  formatDate,
  formatTime,
  formatPhoneNumber,
  formatCurrency,
  getSkillLabel,
  getSkillColor,
  getDayName,
  getBookingStatusColor,
  getBookingStatusLabel,
} from '@/lib/utils';

interface StaffDetailModalProps {
  staff: Staff | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StaffDetailModal({
  staff,
  isOpen,
  onClose,
}: StaffDetailModalProps) {
  if (!staff) return null;

  const availability = mockStaffAvailability.filter(
    (a) => a.staffId === staff.id && a.isActive
  );

  const staffBookingIds = mockBookingStaff
    .filter((bs) => bs.staffId === staff.id)
    .map((bs) => bs.bookingId);

  const bookings = mockBookings
    .filter((b) => staffBookingIds.includes(b.id))
    .map((b) => getBookingWithRelations(b.id)!)
    .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());

  const completedJobs = bookings.filter((b) => b.status === 'COMPLETED').length;
  const cancelledJobs = bookings.filter((b) => b.status === 'CANCELLED').length;

  const avgRating =
    bookings
      .filter((b) => b.customerRating)
      .reduce((sum, b) => sum + (b.customerRating || 0), 0) /
      (bookings.filter((b) => b.customerRating).length || 1) || 0;

  const totalHours = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.durationMinutes, 0) / 60;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Staff Profile"
      size="xl"
    >
      <div className="space-y-6">
        {/* Staff Header */}
        <div className="flex items-start gap-4">
          <Avatar fallback={staff.user?.name || 'Staff'} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {staff.user?.name}
              </h3>
              <Badge variant={staff.isActive ? 'success' : 'secondary'}>
                {staff.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-gray-500">Employee ID: {staff.employeeId}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {formatPhoneNumber(staff.phone)}
              </div>
              {staff.user?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {staff.user.email}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Hired {formatDate(staff.hireDate, 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
            <p className="text-sm text-blue-700">Total Jobs</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedJobs}</p>
            <p className="text-sm text-green-700">Completed</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <p className="text-2xl font-bold text-yellow-600">
                {avgRating.toFixed(1)}
              </p>
            </div>
            <p className="text-sm text-yellow-700">Avg Rating</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {totalHours.toFixed(0)}h
            </p>
            <p className="text-sm text-purple-700">Hours Worked</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {staff.skills.map((skill) => (
              <Badge key={skill} className={getSkillColor(skill)}>
                {getSkillLabel(skill)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Availability Schedule */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Weekly Availability</h4>
          <div className="grid grid-cols-7 gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
              const dayAvail = availability.find((a) => a.dayOfWeek === day);
              return (
                <div
                  key={day}
                  className={`rounded-lg p-3 text-center ${
                    dayAvail
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    {getDayName(day).slice(0, 3)}
                  </p>
                  {dayAvail ? (
                    <div className="text-xs">
                      <p className="font-medium text-green-700">
                        {formatTime(dayAvail.startTime)}
                      </p>
                      <p className="text-green-600">to</p>
                      <p className="font-medium text-green-700">
                        {formatTime(dayAvail.endTime)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">Off</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Compensation
          </h4>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-gray-500">Hourly Rate</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(staff.hourlyRate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Est. Monthly (160h)</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(staff.hourlyRate * 160)}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {staff.notes && (
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Notes</h4>
            <p className="text-sm text-yellow-700">{staff.notes}</p>
          </div>
        )}

        {/* Recent Jobs */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Jobs</h4>
          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No jobs assigned yet
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {bookings.slice(0, 8).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{booking.customer?.name}</p>
                    <p className="text-xs text-gray-500">
                      {booking.service?.name} •{' '}
                      {formatDate(booking.scheduledDate, 'MMM d')} at{' '}
                      {formatTime(booking.scheduledTime)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getBookingStatusColor(booking.status)}>
                      {getBookingStatusLabel(booking.status)}
                    </Badge>
                    {booking.customerRating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-xs">{booking.customerRating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>
          <Edit2 className="h-4 w-4 mr-1" />
          Edit Profile
        </Button>
      </ModalFooter>
    </Modal>
  );
}
