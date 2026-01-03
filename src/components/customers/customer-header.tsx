'use client';

import * as React from 'react';
import { Button, Input, Select } from '@/components/ui';
import { Search, Plus, Download, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface CustomerHeaderProps {
  onSearch?: (query: string) => void;
  onFilter?: (type: string) => void;
}

export function CustomerHeader({ onSearch, onFilter }: CustomerHeaderProps) {
  const [search, setSearch] = React.useState('');
  const { showToast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleAddCustomer = () => {
    showToast('Opening Add Customer form...', 'info');
  };

  const handleExport = () => {
    showToast('Exporting customer list...', 'info');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500">Manage customer profiles and service history</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search customers..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        {/* Type Filter */}
        <Select onChange={(e) => onFilter?.(e.target.value)} className="w-40">
          <option value="">All Types</option>
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
        </Select>

        {/* Export */}
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>

        {/* Add Customer */}
        <Button size="sm" onClick={handleAddCustomer}>
          <Plus className="h-4 w-4 mr-1" />
          Add Customer
        </Button>
      </div>
    </div>
  );
}
