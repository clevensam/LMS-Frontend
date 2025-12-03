import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/Common';
import { Users, Upload, MoreVertical, Search, Plus, Download, Shield } from 'lucide-react';
import { MOCK_USER, MOCK_INSTRUCTOR, MOCK_ADMIN } from '../constants';

const AdminUsers: React.FC = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  
  // Mock User Data
  const [users] = useState([
    MOCK_USER, 
    MOCK_INSTRUCTOR, 
    MOCK_ADMIN,
    { id: 'u4', name: 'John Doe', email: 'john@example.com', role: 'student', points: 100, level: 1, badges: [] }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage students, instructors, and admin accounts.</p>
        </div>
        <div className="flex space-x-2">
            <Button variant="secondary" icon={Upload} onClick={() => setUploadModalOpen(true)}>Bulk Upload</Button>
            <Button icon={Plus}>Add User</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
             <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                />
            </div>
            <div className="flex space-x-2">
                <select className="border-slate-300 rounded-lg text-sm p-2 bg-white">
                    <option>All Roles</option>
                    <option>Student</option>
                    <option>Instructor</option>
                    <option>Admin</option>
                </select>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                        {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <Users className="h-5 w-5 text-slate-500" />}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                        <div className="text-sm text-slate-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Badge color={user.role === 'admin' ? 'red' : user.role === 'instructor' ? 'yellow' : 'green'}>
                                    {user.role}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                {user.department || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-slate-400 hover:text-slate-600">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>

      {/* Bulk Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Bulk User Upload</h3>
                    <p className="text-sm text-slate-500">Upload a CSV file to add multiple users.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                        <Upload className="h-10 w-10 text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500">CSV, XLS up to 10MB</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center text-blue-700 text-sm">
                            <Download className="h-4 w-4 mr-2" />
                            <span>Download Template</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-b-xl flex justify-end space-x-2">
                    <Button variant="secondary" onClick={() => setUploadModalOpen(false)}>Cancel</Button>
                    <Button>Upload Users</Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;