'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Select, Label } from '@/components/ui';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export function GeneralSettings() {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Basic information about your company
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="Silver Maid Cleaning Services" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tradeLicense">Trade License Number</Label>
              <Input id="tradeLicense" defaultValue="TL-2024-12345" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" defaultValue="info@silvermaid.ae" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input id="phone" defaultValue="+971 4 123 4567" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input id="address" defaultValue="Business Bay, Dubai, UAE" />
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>
            Configure timezone and regional preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select id="timezone" defaultValue="Asia/Dubai">
                <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                <option value="Asia/Abu_Dhabi">Asia/Abu Dhabi (GMT+4)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select id="currency" defaultValue="AED">
                <option value="AED">AED - UAE Dirham</option>
                <option value="USD">USD - US Dollar</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select id="dateFormat" defaultValue="dd/MM/yyyy">
                <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                <option value="yyyy-MM-dd">YYYY-MM-DD</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekStart">Week Starts On</Label>
              <Select id="weekStart" defaultValue="0">
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="6">Saturday</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Billing & Tax</CardTitle>
          <CardDescription>
            Configure VAT and invoice settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vatRate">Default VAT Rate (%)</Label>
              <Input id="vatRate" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trn">Tax Registration Number (TRN)</Label>
              <Input id="trn" defaultValue="100123456789" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
              <Input id="invoicePrefix" defaultValue="INV" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms (days)</Label>
              <Input id="paymentTerms" type="number" defaultValue="7" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduling Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduling</CardTitle>
          <CardDescription>
            Configure booking and scheduling preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slotDuration">Time Slot Duration (minutes)</Label>
              <Select id="slotDuration" defaultValue="30">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferTime">Buffer Time Between Jobs (minutes)</Label>
              <Input id="bufferTime" type="number" defaultValue="30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advanceBooking">Max Advance Booking (days)</Label>
              <Input id="advanceBooking" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellationWindow">Cancellation Window (hours)</Label>
              <Input id="cancellationWindow" type="number" defaultValue="24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          size="lg"
          onClick={() => showToast('Settings saved successfully!', 'success')}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
