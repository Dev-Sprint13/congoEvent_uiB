import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { MOCK_STATS } from '../../constants/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export const Reports: React.FC = () => {
  // Transform category data for the chart
  const categoryData = Object.entries(MOCK_STATS.eventsByCategory).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    count,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-1">Total Events</div>
            <div className="text-3xl font-bold">{MOCK_STATS.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-1">Upcoming Events</div>
            <div className="text-3xl font-bold">{MOCK_STATS.upcomingEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-1">Total Participants</div>
            <div className="text-3xl font-bold">{MOCK_STATS.totalParticipants}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-1">Average Attendance</div>
            <div className="text-3xl font-bold">
              {Math.round((MOCK_STATS.totalParticipants / MOCK_STATS.totalEvents) * 10) / 10}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Events by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participant Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_STATS.participantsTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#4CAF50"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};