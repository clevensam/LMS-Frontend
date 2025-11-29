import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Card, Button, Badge } from '../components/Common';
import { Plus, Edit, Users, Eye } from 'lucide-react';

const InstructorCourses: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { catalog } = useSelector((state: RootState) => state.courses);

  const myCourses = catalog.filter(c => c.instructor === user?.name);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
            <p className="text-slate-500">Create, edit and manage your course content.</p>
        </div>
        <Button icon={Plus} onClick={() => navigate('/instructor/create-course')}>Create New Course</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Students</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Modules</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {myCourses.map(course => (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                    <img className="h-10 w-10 rounded-lg object-cover" src={course.thumbnail} alt="" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-slate-900">{course.title}</div>
                                    <div className="text-sm text-slate-500">{course.category}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {course.isPublished ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Published
                                </span>
                            ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Draft
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-slate-400" />
                                {course.totalStudents.toLocaleString()}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                             {course.modules.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                                <button 
                                    onClick={() => navigate(`/instructor/course/${course.id}/manage`)}
                                    className="text-slate-400 hover:text-green-700 p-1"
                                    title="Edit Content"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={() => navigate(`/course/${course.id}`)}
                                    className="text-slate-400 hover:text-green-700 p-1"
                                    title="Preview"
                                >
                                    <Eye className="h-5 w-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {myCourses.length === 0 && (
             <div className="text-center py-12">
                 <p className="text-slate-500 mb-4">You haven't created any courses yet.</p>
                 <Button variant="secondary" icon={Plus} onClick={() => navigate('/instructor/create-course')}>Create your first course</Button>
             </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;