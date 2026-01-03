'use client';

import * as React from 'react';
import { Card } from '@/components/ui';
import type { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const totalPrice = service.basePrice * (1 + service.vatRate / 100);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>{service.durationMinutes} minutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{service.minCrewSize}-{service.maxCrewSize} team members</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-blue-600">
              {formatCurrency(totalPrice)}
            </span>
            <span className="text-sm text-gray-500">inc. VAT</span>
          </div>

          <Link
            href={`/book?service=${service.id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors gap-2"
          >
            Book Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
