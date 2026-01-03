'use client';

import * as React from 'react';
import { Button, Select } from '@/components/ui';
import { ChevronLeft, ChevronRight, Plus, Filter, Download } from 'lucide-react';
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { useToast } from '@/components/ui/toast';

type ViewMode = 'day' | 'week' | 'staff';

interface ScheduleHeaderProps {
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
  date?: Date;
  onDateChange?: (date: Date) => void;
}

export function ScheduleHeader({
  view = 'week',
  onViewChange,
  date = new Date(),
  onDateChange,
}: ScheduleHeaderProps) {
  const [currentView, setCurrentView] = React.useState<ViewMode>(view);
  const [currentDate, setCurrentDate] = React.useState<Date>(date);
  const { showToast } = useToast();

  const handleViewChange = (newView: ViewMode) => {
    setCurrentView(newView);
    onViewChange?.(newView);
  };

  const handlePrev = () => {
    const newDate =
      currentView === 'day'
        ? subDays(currentDate, 1)
        : subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate =
      currentView === 'day'
        ? addDays(currentDate, 1)
        : addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateChange?.(today);
  };

  const handleNewBooking = () => {
    showToast('Opening New Booking form...', 'info');
  };

  const handleFilter = () => {
    showToast('Opening filters...', 'info');
  };

  const getDateRangeLabel = () => {
    if (currentView === 'day') {
      return format(currentDate, 'EEEE, MMMM d, yyyy');
    }
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-500">Manage bookings and staff assignments</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Date Navigation */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
          <Button variant="ghost" size="icon" onClick={handlePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Date Label */}
        <span className="text-sm font-medium text-gray-700 min-w-[200px] text-center">
          {getDateRangeLabel()}
        </span>

        {/* View Selector */}
        <div className="flex bg-white border border-gray-200 rounded-lg p-1">
          {(['day', 'week', 'staff'] as ViewMode[]).map((v) => (
            <Button
              key={v}
              variant={currentView === v ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewChange(v)}
              className="capitalize"
            >
              {v}
            </Button>
          ))}
        </div>

        {/* Actions */}
        <Button variant="outline" size="sm" onClick={handleFilter}>
          <Filter className="h-4 w-4 mr-1" />
          Filter
        </Button>
        <Button size="sm" onClick={handleNewBooking}>
          <Plus className="h-4 w-4 mr-1" />
          New Booking
        </Button>
      </div>
    </div>
  );
}
