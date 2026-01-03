'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  Badge,
  Avatar,
  Button,
} from '@/components/ui';
import {
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
} from 'lucide-react';
import { mockStaff, mockStaffAvailability, mockBookingStaff, mockBookings } from '@/lib/mock-data';
import { formatDate, formatPhoneNumber, formatCurrency, getSkillLabel, getSkillColor, getDayShortName } from '@/lib/utils';
import type { Staff } from '@/types';
import { StaffDetailModal } from './staff-detail-modal';
import { useToast } from '@/components/ui/toast';

export function StaffList() {
  const { showToast } = useToast();
  const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null);
  const [showMenu, setShowMenu] = React.useState<string | null>(null);

  const getStaffAvailability = (staffId: string) => {
    return mockStaffAvailability.filter((a) => a.staffId === staffId && a.isActive);
  };

  const getStaffBookingCount = (staffId: string) => {
    const staffBookings = mockBookingStaff.filter((bs) => bs.staffId === staffId);
    return staffBookings.length;
  };

  const getCompletedJobsCount = (staffId: string) => {
    const staffBookingIds = mockBookingStaff
      .filter((bs) => bs.staffId === staffId)
      .map((bs) => bs.bookingId);
    return mockBookings.filter(
      (b) => staffBookingIds.includes(b.id) && b.status === 'COMPLETED'
    ).length;
  };

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowMenu(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStaff.map((staff) => {
          const availability = getStaffAvailability(staff.id);
          const bookingCount = getStaffBookingCount(staff.id);
          const completedJobs = getCompletedJobsCount(staff.id);

          return (
            <Card key={staff.id} className="relative">
              <CardContent className="p-6">
                {/* Menu Button */}
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowMenu(showMenu === staff.id ? null : staff.id)
                    }
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                  {showMenu === staff.id && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(null)}
                      />
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewStaff(staff)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </button>
                          <button 
                            onClick={() => {
                              showToast(`Editing ${staff.user?.name || 'Staff'}...`, 'info');
                              setShowMenu(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                          <button 
                            onClick={() => {
                              showToast(`Deleting ${staff.user?.name || 'Staff'}...`, 'error');
                              setShowMenu(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Staff Info */}
                <div className="flex items-start gap-4">
                  <Avatar fallback={staff.user?.name || 'Staff'} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {staff.user?.name}
                      </h3>
                      <Badge variant={staff.isActive ? 'success' : 'secondary'}>
                        {staff.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{staff.employeeId}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Phone className="h-3.5 w-3.5" />
                      {formatPhoneNumber(staff.phone)}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {staff.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-xs px-2 py-0.5 rounded ${getSkillColor(skill)}`}
                      >
                        {getSkillLabel(skill)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Working Days</p>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const isAvailable = availability.some((a) => a.dayOfWeek === day);
                      return (
                        <div
                          key={day}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            isAvailable
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {getDayShortName(day).charAt(0)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{bookingCount}</p>
                    <p className="text-xs text-gray-500">Total Jobs</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-600">{completedJobs}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(staff.hourlyRate)}
                    </p>
                    <p className="text-xs text-gray-500">Per Hour</p>
                  </div>
                </div>

                {/* View Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => handleViewStaff(staff)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Staff Detail Modal */}
      <StaffDetailModal
        staff={selectedStaff}
        isOpen={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
      />
    </>
  );
}
