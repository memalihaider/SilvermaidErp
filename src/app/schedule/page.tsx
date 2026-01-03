'use client';

import { AppLayout } from '@/components/layout';
import { ScheduleHeader } from '@/components/schedule/schedule-header';
import { ScheduleCalendar } from '@/components/schedule/schedule-calendar';
import { NewBookingSidebar } from '@/components/schedule/new-booking-sidebar';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Booking } from '@/types';
import { useToast } from '@/components/ui/toast';

function SchedulePageContent() {
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we should open the new booking sidebar
    if (searchParams.get('newBooking') === 'true') {
      setIsNewBookingOpen(true);
      // Clean up the URL
      window.history.replaceState({}, '', '/schedule');
    }
  }, [searchParams]);

  const handleNewBooking = () => {
    setIsNewBookingOpen(true);
  };

  const handleSaveBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    // In a real app, this would make an API call to save the booking
    console.log('New booking data:', bookingData);
    showToast('Booking created successfully!', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <ScheduleHeader onNewBooking={handleNewBooking} />
        <ScheduleCalendar />
      </div>

      <NewBookingSidebar
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSave={handleSaveBooking}
      />
    </AppLayout>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SchedulePageContent />
    </Suspense>
  );
}
