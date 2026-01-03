'use client';

import * as React from 'react';
import { Button, Input, Select, Textarea, Label, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Calendar, Clock, MapPin, User, X, Save } from 'lucide-react';
import type { Customer, Service, CustomerAddress, Booking } from '@/types';
import { mockCustomers, mockServices, mockAddresses } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

interface NewBookingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => void;
}

export function NewBookingSidebar({ isOpen, onClose, onSave }: NewBookingSidebarProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = React.useState({
    customerId: '',
    serviceId: '',
    addressId: '',
    scheduledDate: '',
    scheduledTime: '09:00',
    durationMinutes: 120,
    specialRequests: '',
    internalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Get selected customer and their addresses
  const selectedCustomer = mockCustomers.find(c => c.id === formData.customerId);
  const customerAddresses = selectedCustomer
    ? mockAddresses.filter(a => a.customerId === selectedCustomer.id)
    : [];

  // Get selected service
  const selectedService = mockServices.find(s => s.id === formData.serviceId);

  // Update duration when service changes
  React.useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        durationMinutes: selectedService.durationMinutes,
      }));
    }
  }, [selectedService]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateEndTime = () => {
    if (!formData.scheduledTime || !formData.durationMinutes) return '';

    const [hours, minutes] = formData.scheduledTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate.getTime() + formData.durationMinutes * 60000);
    const endTimeString = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    return formatTime(endTimeString);
  };

  const calculateTotalPrice = () => {
    if (!selectedService) return { subtotal: 0, vatAmount: 0, total: 0 };

    const basePrice = selectedService.basePrice;
    const vatRate = 0.05; // 5% VAT
    const vatAmount = basePrice * vatRate;

    return {
      subtotal: basePrice,
      vatAmount,
      total: basePrice + vatAmount,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerId || !formData.serviceId || !formData.addressId || !formData.scheduledDate) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const prices = calculateTotalPrice();
      const endTime = calculateEndTime();

      const newBooking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
        bookingNumber: `BK${Date.now()}`,
        customerId: formData.customerId,
        serviceId: formData.serviceId,
        addressId: formData.addressId,
        scheduledDate: new Date(formData.scheduledDate),
        scheduledTime: formData.scheduledTime,
        durationMinutes: formData.durationMinutes,
        endTime,
        status: 'PENDING',
        source: 'WALK_IN',
        basePrice: prices.subtotal,
        adjustments: 0,
        vatAmount: prices.vatAmount,
        totalPrice: prices.total,
        specialRequests: formData.specialRequests || null,
        internalNotes: formData.internalNotes || null,
        customerRating: null,
        customerFeedback: null,
        confirmedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        cancellationReason: null,
      };

      onSave(newBooking);

      // Reset form
      setFormData({
        customerId: '',
        serviceId: '',
        addressId: '',
        scheduledDate: '',
        scheduledTime: '09:00',
        durationMinutes: 120,
        specialRequests: '',
        internalNotes: '',
      });

      onClose();
      showToast('Booking created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create booking', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const prices = calculateTotalPrice();

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">New Booking</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Customer Selection */}
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select
                id="customer"
                value={formData.customerId}
                onChange={(e) => handleInputChange('customerId', e.target.value)}
              >
                <option value="" disabled>Select a customer</option>
                {mockCustomers.filter(c => c.isActive).map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} {customer.companyName && `(${customer.companyName})`}
                  </option>
                ))}
              </Select>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Select
                id="service"
                value={formData.serviceId}
                onChange={(e) => handleInputChange('serviceId', e.target.value)}
              >
                <option value="" disabled>Select a service</option>
                {mockServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.basePrice} AED
                  </option>
                ))}
              </Select>
            </div>

            {/* Address Selection */}
            {customerAddresses.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="address">Service Address *</Label>
                <Select
                  id="address"
                  value={formData.addressId}
                  onChange={(e) => handleInputChange('addressId', e.target.value)}
                >
                  <option value="" disabled>Select service address</option>
                  {customerAddresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.label}: {address.street}, {address.area}, {address.city}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => handleInputChange('durationMinutes', parseInt(e.target.value))}
                min="30"
                max="480"
                step="30"
              />
              {formData.scheduledTime && (
                <p className="text-sm text-gray-500">
                  End time: {calculateEndTime()}
                </p>
              )}
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Any special requirements or instructions..."
                rows={3}
              />
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Textarea
                id="internalNotes"
                value={formData.internalNotes}
                onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                placeholder="Internal notes for staff..."
                rows={2}
              />
            </div>

            {/* Price Summary */}
            {selectedService && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service:</span>
                    <span>{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{prices.subtotal} AED</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT (5%):</span>
                    <span>{prices.vatAmount.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm border-t pt-2">
                    <span>Total:</span>
                    <span>{prices.total.toFixed(2)} AED</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Booking'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}