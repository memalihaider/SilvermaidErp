'use client';

import * as React from 'react';
import { Modal, ModalFooter, Button, Badge, Avatar, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Edit2,
  Building,
  Home,
  FileText,
  Star,
} from 'lucide-react';
import type { Customer, Booking } from '@/types';
import { mockAddresses, mockBookings, mockServices, getBookingWithRelations } from '@/lib/mock-data';
import {
  formatDate,
  formatPhoneNumber,
  formatCurrency,
  getBookingStatusColor,
  getBookingStatusLabel,
} from '@/lib/utils';

interface CustomerDetailModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerDetailModal({
  customer,
  isOpen,
  onClose,
}: CustomerDetailModalProps) {
  if (!customer) return null;

  const addresses = mockAddresses.filter((a) => a.customerId === customer.id);
  const bookings = mockBookings
    .filter((b) => b.customerId === customer.id)
    .map((b) => getBookingWithRelations(b.id)!)
    .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());

  const totalSpent = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED').length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Details"
      size="xl"
    >
      <div className="space-y-6">
        {/* Customer Header */}
        <div className="flex items-start gap-4">
          <Avatar fallback={customer.name} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {customer.name}
              </h3>
              <Badge variant={customer.type === 'COMMERCIAL' ? 'purple' : 'info'}>
                {customer.type}
              </Badge>
              <Badge variant={customer.isActive ? 'success' : 'secondary'}>
                {customer.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            {customer.companyName && (
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <Building className="h-4 w-4" />
                {customer.companyName}
              </p>
            )}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {formatPhoneNumber(customer.phone)}
              </div>
              {customer.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {customer.email}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Customer since {formatDate(customer.createdAt, 'MMM yyyy')}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
            <p className="text-sm text-blue-700">Total Bookings</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedBookings}</p>
            <p className="text-sm text-green-700">Completed</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(totalSpent)}
            </p>
            <p className="text-sm text-purple-700">Total Spent</p>
          </div>
        </div>

        {/* Addresses */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Addresses ({addresses.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  {address.label === 'Home' ? (
                    <Home className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Building className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="font-medium text-sm">{address.label}</span>
                  {address.isPrimary && (
                    <Badge variant="info" className="text-xs">
                      Primary
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {address.building}
                  {address.floor && `, Floor ${address.floor}`}
                  {address.apartment && `, Apt ${address.apartment}`}
                </p>
                <p className="text-sm text-gray-500">
                  {address.area}, {address.city}
                </p>
                {address.notes && (
                  <p className="text-xs text-gray-400 mt-1 italic">
                    {address.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notes & Preferences */}
        {(customer.notes || customer.preferences) && (
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes & Preferences
            </h4>
            {customer.notes && (
              <p className="text-sm text-yellow-700 mb-2">{customer.notes}</p>
            )}
            {customer.preferences && (
              <div className="text-xs text-yellow-600">
                Preferences: {customer.preferences}
              </div>
            )}
          </div>
        )}

        {/* Booking History */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Booking History
          </h4>
          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No bookings yet
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {bookings.slice(0, 10).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-sm">{booking.service?.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(booking.scheduledDate, 'MMM d, yyyy')} at{' '}
                        {booking.scheduledTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getBookingStatusColor(booking.status)}>
                      {getBookingStatusLabel(booking.status)}
                    </Badge>
                    <span className="text-sm font-medium">
                      {formatCurrency(booking.totalPrice)}
                    </span>
                    {booking.customerRating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm">{booking.customerRating}</span>
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
          Edit Customer
        </Button>
      </ModalFooter>
    </Modal>
  );
}
