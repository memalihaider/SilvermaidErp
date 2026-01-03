import { AppLayout } from '@/components/layout';
import { SettingsNav } from '@/components/settings/settings-nav';
import { GeneralSettings } from '@/components/settings/general-settings';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Configure your system preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <SettingsNav />
          <div className="flex-1">
            <GeneralSettings />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
