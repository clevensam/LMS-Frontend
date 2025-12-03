import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, togglePublish } from '../store/store';
import { Card, Button, Badge } from '../components/Common';
import { Search, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminCourses: React.FC = () => {
  const { catalog } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = catalog.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id: string) => {
      dispatch(togglePublish({ courseId: id, isPublished: true }));
  };

  const handleReject = (id: string) => {
      dispatch(togglePublish({ courseId: id, isPublished: false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course Oversight</h1>
          <p className="text-slate-500">Monitor, approve, and manage all platform courses.</p>
        </div>
      </div>

      <Card className="p-6">
         <div className="flex items-center mb-6">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search courses or instructors..." 
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course Info</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Instructor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-lg object-cover bg-slate-100" src={course.thumbnail} alt="" />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-slate-900 line-clamp-1 w-48">{course.title}</div>
                                        <div className="text-xs text-slate-500">{course.modules.length} modules</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                {course.instructor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Badge color="green">{course.category}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {course.isPublished ? (
                                    <span className="flex items-center text-green-700 text-sm font-medium">
                                        <CheckCircle className="h-4 w-4 mr-1" /> Active
                                    </span>
                                ) : (
                                    <span className="flex items-center text-yellow-600 text-sm font-medium">
                                        <AlertCircle className="h-4 w-4 mr-1" /> Pending/Draft
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="text-slate-400 hover:text-green-700 p-1" title="Preview" onClick={() => navigate(`/course/${course.id}`)}>
                                    <Eye className="h-5 w-5" />
                                </button>
                                {!course.isPublished && (
                                    <button className="text-green-600 hover:text-green-800 p-1" title="Approve" onClick={() => handleApprove(course.id)}>
                                        <CheckCircle className="h-5 w-5" />
                                    </button>
                                )}
                                {course.isPublished && (
                                    <button className="text-red-500 hover:text-red-700 p-1" title="Unpublish" onClick={() => handleReject(course.id)}>
                                        <XCircle className="h-5 w-5" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminCourses;