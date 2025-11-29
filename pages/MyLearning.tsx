import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, ProgressBar, Badge, Button } from '../components/Common';
import { Play, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyLearning: React.FC = () => {
  const { enrolled } = useSelector((state: RootState) => state.courses);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const navigate = useNavigate();

  const filteredCourses = enrolled.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'completed') return (course.progress || 0) >= 100;
    if (filter === 'in-progress') return (course.progress || 0) < 100 && (course.progress || 0) > 0;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">My Learning</h1>
        <div className="flex space-x-2 bg-white p-1 rounded-lg border border-slate-200">
            {['all', 'in-progress', 'completed'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        filter === f 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
                </button>
            ))}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
                <Card key={course.id} className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/course/${course.id}`)}>
                    <div className="h-40 w-full relative">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Play className="h-12 w-12 text-white drop-shadow-lg" />
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <Badge color="green">{course.category}</Badge>
                            {course.progress === 100 && (
                                <span className="flex items-center text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.instructor}</p>
                        
                        <div className="mt-auto space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-600">
                                <span>{course.progress}% Complete</span>
                                {course.progress && course.progress < 100 && <span>{course.duration} remaining</span>}
                            </div>
                            <ProgressBar value={course.progress || 0} />
                            <div className="pt-3">
                                <Button className="w-full" size="sm" variant={course.progress === 100 ? 'secondary' : 'primary'}>
                                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                <BookOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
            <p className="mt-1 text-slate-500 mb-6">Start your learning journey by browsing our catalog.</p>
            <Button onClick={() => navigate('/catalog')}>Browse Courses</Button>
        </div>
      )}
    </div>
  );
};

export default MyLearning;