'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';
import { Clock, MapPin, User, ChevronRight, Plus } from 'lucide-react';
import { getTodayBookings } from '@/lib/mock-data';
import { formatTime, getBookingStatusColor, getBookingStatusLabel } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

export function TodayBookings() {
  const bookings = getTodayBookings();
  const { showToast } = useToast();

  const handleNewBooking = () => {
    // Navigate to schedule page and trigger new booking
    window.location.href = '/schedule?newBooking=true';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <p className="text-sm text-gray-500 mt-1">{bookings.length} bookings scheduled</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/schedule">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button size="sm" onClick={handleNewBooking}>
            <Plus className="h-4 w-4 mr-1" />
            New Booking
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No bookings scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-[border-color,background-color] duration-150"
              >
                {/* Time Column */}
                <div className="flex flex-col items-center min-w-[80px]">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatTime(booking.scheduledTime)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {booking.durationMinutes} min
                  </span>
                </div>

                {/* Divider */}
                <div className="w-px h-16 bg-gray-200" />

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">
                          {booking.customer?.name}
                        </h4>
                        <Badge className={getBookingStatusColor(booking.status)}>
                          {getBookingStatusLabel(booking.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {booking.service?.name}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {booking.bookingNumber}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">
                      {booking.address?.building}, {booking.address?.area}
                    </span>
                  </div>

                  {/* Assigned Staff */}
                  <div className="flex items-center gap-2 mt-3">
                    <User className="h-3.5 w-3.5 text-gray-400" />
                    <div className="flex -space-x-2">
                      {booking.staff?.map((bs) => (
                        <Avatar
                          key={bs.id}
                          fallback={bs.staff?.user?.name || 'Staff'}
                          size="sm"
                          className="border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {booking.staff?.map((bs) => bs.staff?.user?.name).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => showToast(`Viewing details for ${booking.bookingNumber}...`, 'info')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
