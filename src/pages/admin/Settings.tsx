import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Save, Globe, Bell, Lock, Mail, Palette } from 'lucide-react';

export const Settings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'CultureCongo',
    siteDescription: 'Platform for Cultural Events in Congo',
    contactEmail: 'contact@culturecongo.org',
    defaultLanguage: 'fr',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    marketingEmails: false,
    registrationAlerts: true,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
            <CardTitle className="flex items-center">
              <Globe size={20} className="mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Input
                label="Site Name"
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  siteName: e.target.value
                }))}
                fullWidth
              />

              <Input
                label="Site Description"
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  siteDescription: e.target.value
                }))}
                fullWidth
              />

              <Input
                label="Contact Email"
                type="email"
                value={generalSettings.contactEmail}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  contactEmail: e.target.value
                }))}
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select
                  value={generalSettings.defaultLanguage}
                  onChange={(e) => setGeneralSettings(prev => ({
                    ...prev,
                    defaultLanguage: e.target.value
                  }))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
            <CardTitle className="flex items-center">
              <Bell size={20} className="mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className={`${
                      notificationSettings.emailNotifications
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    onClick={() => setNotificationSettings(prev => ({
                      ...prev,
                      emailNotifications: !prev.emailNotifications
                    }))}
                  >
                    <span
                      className={`${
                        notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Event Reminders</h3>
                  <p className="text-sm text-gray-500">Get notified about upcoming events</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className={`${
                      notificationSettings.eventReminders
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    onClick={() => setNotificationSettings(prev => ({
                      ...prev,
                      eventReminders: !prev.eventReminders
                    }))}
                  >
                    <span
                      className={`${
                        notificationSettings.eventReminders ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className={`${
                      notificationSettings.marketingEmails
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    onClick={() => setNotificationSettings(prev => ({
                      ...prev,
                      marketingEmails: !prev.marketingEmails
                    }))}
                  >
                    <span
                      className={`${
                        notificationSettings.marketingEmails ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Registration Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified when someone registers for your events</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className={`${
                      notificationSettings.registrationAlerts
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    onClick={() => setNotificationSettings(prev => ({
                      ...prev,
                      registrationAlerts: !prev.registrationAlerts
                    }))}
                  >
                    <span
                      className={`${
                        notificationSettings.registrationAlerts ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
            <CardTitle className="flex items-center">
              <Lock size={20} className="mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Two-Factor Authentication
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Active Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
            <CardTitle className="flex items-center">
              <Mail size={20} className="mr-2" />
              Email Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Welcome Email
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Event Registration
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Password Reset
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Event Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          variant="primary"
          leftIcon={<Save size={18} />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};