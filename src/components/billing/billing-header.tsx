'use client';

import * as React from 'react';
import { Button, Input, Select } from '@/components/ui';
import { Search, Download, FileText, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export function BillingHeader() {
  const { showToast } = useToast();
  const [search, setSearch] = React.useState('');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
        <p className="text-gray-500">Manage invoices and track payments</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select className="w-40">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="PARTIALLY_PAID">Partial</option>
          <option value="REFUNDED">Refunded</option>
        </Select>

        {/* Date Range */}
        <Select className="w-40">
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </Select>

        {/* Export */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => showToast('Exporting billing data...', 'info')}
        >
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
}
