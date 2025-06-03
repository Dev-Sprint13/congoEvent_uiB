import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { MOCK_USERS } from '../../constants/mockData';
import { Plus, Search, Edit2, Trash2, Lock } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button leftIcon={<Plus size={18} />}>
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle>Users</CardTitle>
            <div className="w-64">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      selectedUser === user.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          user.role === 'admin' ? 'error' :
                          user.role === 'organizer' ? 'warning' : 'default'
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Edit2 size={16} />}
                          onClick={() => {}}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Lock size={16} />}
                          onClick={() => {}}
                        >
                          Reset Password
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Trash2 size={16} />}
                          onClick={() => {}}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};