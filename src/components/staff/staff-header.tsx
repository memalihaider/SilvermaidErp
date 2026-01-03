'use client';

import * as React from 'react';
import { Button, Input, Select } from '@/components/ui';
import { Search, Plus, Download, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export function StaffHeader() {
  const { showToast } = useToast();
  const [search, setSearch] = React.useState('');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Staff</h1>
        <p className="text-gray-500">Manage team members and their schedules</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select className="w-36">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>

        {/* Export */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => showToast('Exporting staff list...', 'info')}
        >
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>

        {/* Add Staff */}
        <Button 
          size="sm"
          onClick={() => showToast('Opening Add Staff form...', 'info')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Staff
        </Button>
      </div>
    </div>
  );
}
