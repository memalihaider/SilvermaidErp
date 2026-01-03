'use client';

import * as React from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Avatar,
  Button,
} from '@/components/ui';
import { MoreHorizontal, Eye, Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { mockCustomers, mockAddresses, mockBookings } from '@/lib/mock-data';
import { formatDate, formatPhoneNumber } from '@/lib/utils';
import type { Customer } from '@/types';
import { CustomerDetailModal } from './customer-detail-modal';
import { useToast } from '@/components/ui/toast';

export function CustomerList() {
  const { showToast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [showMenu, setShowMenu] = React.useState<string | null>(null);

  const getCustomerAddress = (customerId: string) => {
    return mockAddresses.find((a) => a.customerId === customerId && a.isPrimary);
  };

  const getBookingCount = (customerId: string) => {
    return mockBookings.filter((b) => b.customerId === customerId).length;
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowMenu(null);
  };

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer) => {
              const address = getCustomerAddress(customer.id);
              const bookingCount = getBookingCount(customer.id);

              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={customer.name} size="md" />
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        {customer.companyName && (
                          <p className="text-sm text-gray-500">{customer.companyName}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.type === 'COMMERCIAL' ? 'purple' : 'info'}
                    >
                      {customer.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {formatPhoneNumber(customer.phone)}
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          {customer.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {address ? (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        {address.area}, {address.city}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No address</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{bookingCount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.isActive ? 'success' : 'secondary'}>
                      {customer.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setShowMenu(showMenu === customer.id ? null : customer.id)
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>

                      {showMenu === customer.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowMenu(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleViewCustomer(customer);
                                  setShowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </button>
                              <button 
                                onClick={() => {
                                  showToast(`Editing ${customer.name}...`, 'info');
                                  setShowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit2 className="h-4 w-4" />
                                Edit
                              </button>
                              <button 
                                onClick={() => {
                                  showToast(`Deleting ${customer.name}...`, 'error');
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing {mockCustomers.length} of {mockCustomers.length} customers
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </>
  );
}
