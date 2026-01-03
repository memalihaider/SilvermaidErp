'use client';

import * as React from 'react';
import { Button, Input, Select, Textarea, Label, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { mockServices, mockAddresses } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { Home, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const { showToast } = useToast();
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [bookingData, setBookingData] = React.useState({
    serviceId: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    preferredDate: '',
    preferredTime: '09:00',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const activeServices = mockServices.filter(s => s.isActive);
  const selectedService = activeServices.find(s => s.id === bookingData.serviceId);

  const calculateTotalPrice = (basePrice: number) => {
    const vatRate = 0.05;
    const vatAmount = basePrice * vatRate;
    return {
      subtotal: basePrice,
      vat: vatAmount,
      total: basePrice + vatAmount,
    };
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!bookingData.serviceId) {
        showToast('Please select a service', 'error');
        return false;
      }
    } else if (currentStep === 2) {
      if (!bookingData.fullName || !bookingData.email || !bookingData.phone || !bookingData.address) {
        showToast('Please fill in all required fields', 'error');
        return false;
      }
      // Simple email validation
      if (!bookingData.email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 2) setStep(3);
      else if (step === 1) setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Booking submitted:', bookingData);

      showToast('Booking request submitted successfully! We will contact you soon.', 'success');

      // Reset form and show confirmation
      setBookingData({
        serviceId: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Dubai',
        preferredDate: '',
        preferredTime: '09:00',
        specialRequests: '',
      });
      setStep(1);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      showToast('Failed to submit booking. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">Silver Maid</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="/book" className="text-gray-900 font-medium">
              Book Now
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full font-semibold ${
                    s <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s < step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span className={step >= 1 ? 'text-blue-600' : ''}>Select Service</span>
            <span className={step >= 2 ? 'text-blue-600' : ''}>Your Details</span>
            <span className={step >= 3 ? 'text-blue-600' : ''}>Review & Confirm</span>
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Your Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeServices.map((service) => {
                  const prices = calculateTotalPrice(service.basePrice);
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleInputChange('serviceId', service.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        bookingData.serviceId === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-lg font-bold text-blue-600">
                          {formatCurrency(prices.total)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>⏱️ {service.durationMinutes} mins</span>
                        <span>👥 {service.minCrewSize}-{service.maxCrewSize} people</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Your Details */}
        {step === 2 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={bookingData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+971 50 123 4567"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Service Address *</Label>
                  <Textarea
                    id="address"
                    value={bookingData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter the full address where the service will be provided"
                    rows={3}
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select
                    id="city"
                    value={bookingData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                  </Select>
                </div>
              </form>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Schedule */}
        {step === 3 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Schedule & Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Preferred Time */}
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={bookingData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Any special requirements or preferences..."
                    rows={3}
                  />
                </div>

                {/* Order Summary */}
                {selectedService && (
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedService.durationMinutes} minutes</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">
                            {formatCurrency(selectedService.basePrice)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">VAT (5%):</span>
                          <span className="font-medium">
                            {formatCurrency(selectedService.basePrice * 0.05)}
                          </span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-base">
                          <span>Total:</span>
                          <span className="text-blue-600">
                            {formatCurrency(selectedService.basePrice * 1.05)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Terms */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    By submitting this booking request, you agree to our terms and conditions. We will contact you within 24 hours to confirm your booking.
                  </p>
                </div>

                <div className="flex justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
