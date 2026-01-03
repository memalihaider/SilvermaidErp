'use client';

import * as React from 'react';
import { Card, Badge, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';
import { mockBookings, mockStaff, mockBookingStaff, getBookingWithRelations } from '@/lib/mock-data';
import { getBookingStatusColor, getBookingStatusLabel, formatTime } from '@/lib/utils';
import type { Booking } from '@/types';
import { BookingDetailModal } from './booking-detail-modal';

// Time slots from 6 AM to 10 PM
const TIME_SLOTS = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6;
  return `${hour.toString().padStart(2, '0')}:00`;
});

interface ScheduleCalendarProps {
  view?: 'day' | 'week' | 'staff';
}

export function ScheduleCalendar({ view = 'week' }: ScheduleCalendarProps) {
  const [selectedDate] = React.useState(new Date());
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Get bookings for the week
  const getBookingsForDay = (date: Date) => {
    return mockBookings
      .filter(
        (b) =>
          isSameDay(new Date(b.scheduledDate), date) && b.status !== 'CANCELLED'
      )
      .map((b) => getBookingWithRelations(b.id)!)
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  };

  // Calculate booking position and height
  const getBookingStyle = (booking: Booking) => {
    const [startHour, startMin] = booking.scheduledTime.split(':').map(Number);
    const startMinutes = (startHour - 6) * 60 + startMin;
    const top = (startMinutes / 60) * 60; // 60px per hour
    const height = (booking.durationMinutes / 60) * 60;
    return { top: `${top}px`, height: `${Math.max(height, 30)}px` };
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex">
          {/* Time Column */}
          <div className="w-20 flex-shrink-0 border-r border-gray-200 bg-gray-50">
            <div className="h-14 border-b border-gray-200" /> {/* Header spacer */}
            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="h-[60px] px-3 py-1 text-xs text-gray-500 text-right border-b border-gray-100"
              >
                {formatTime(time)}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          <div className="flex-1 flex overflow-x-auto">
            {weekDays.map((day) => {
              const dayBookings = getBookingsForDay(day);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'flex-1 min-w-[140px] border-r border-gray-200 last:border-r-0',
                    isCurrentDay && 'bg-blue-50/30'
                  )}
                >
                  {/* Day Header */}
                  <div
                    className={cn(
                      'h-14 flex flex-col items-center justify-center border-b border-gray-200 sticky top-0 bg-white z-10',
                      isCurrentDay && 'bg-blue-50'
                    )}
                  >
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {format(day, 'EEE')}
                    </span>
                    <span
                      className={cn(
                        'text-lg font-semibold',
                        isCurrentDay
                          ? 'text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center'
                          : 'text-gray-900'
                      )}
                    >
                      {format(day, 'd')}
                    </span>
                  </div>

                  {/* Time Grid */}
                  <div className="relative">
                    {/* Hour Lines */}
                    {TIME_SLOTS.map((time) => (
                      <div
                        key={time}
                        className="h-[60px] border-b border-gray-100"
                      />
                    ))}

                    {/* Bookings */}
                    <div className="absolute inset-0 p-0.5">
                      {dayBookings.map((booking) => {
                        const style = getBookingStyle(booking);
                        const statusColor = getBookingStatusColor(booking.status);

                        return (
                          <div
                            key={booking.id}
                            className={cn(
                              'absolute left-0.5 right-0.5 rounded-md p-1.5 cursor-pointer overflow-hidden border-l-4 transition-transform hover:scale-[1.02] hover:shadow-md',
                              booking.status === 'COMPLETED'
                                ? 'bg-green-50 border-green-500'
                                : booking.status === 'IN_PROGRESS'
                                ? 'bg-purple-50 border-purple-500'
                                : booking.status === 'CONFIRMED'
                                ? 'bg-blue-50 border-blue-500'
                                : 'bg-yellow-50 border-yellow-500'
                            )}
                            style={style}
                            onClick={() => handleBookingClick(booking)}
                          >
                            <div className="text-xs font-medium text-gray-900 truncate">
                              {booking.customer?.name}
                            </div>
                            <div className="text-xs text-gray-600 truncate">
                              {booking.service?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(booking.scheduledTime)}
                            </div>
                            {/* Staff avatars for larger bookings */}
                            {booking.durationMinutes >= 90 && (
                              <div className="flex -space-x-1 mt-1">
                                {booking.staff?.slice(0, 2).map((bs) => (
                                  <Avatar
                                    key={bs.id}
                                    fallback={bs.staff?.user?.name || '?'}
                                    size="sm"
                                    className="w-5 h-5 text-[8px] border border-white"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
}
