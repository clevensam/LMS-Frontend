import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, enrollCourse } from '../store/store';
import { Card, Badge, Button, Input } from '../components/Common';
import { Search, Filter, Clock, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Catalog: React.FC = () => {
  const { catalog, enrolled } = useSelector((state: RootState) => state.courses);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories: string[] = ['All', ...Array.from(new Set(catalog.map(c => c.category))) as string[]];

  const filteredCourses = catalog.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const isPublished = course.isPublished !== false; // Only show published courses or defaults
    return matchesSearch && matchesCategory && isPublished;
  });

  const handleEnroll = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (user?.role === 'student') {
        dispatch(enrollCourse(courseId));
        navigate(`/course/${courseId}`);
    } else {
        // Instructors/Admins just view
        navigate(`/course/${courseId}`);
    }
  };

  const handleContinue = (e: React.MouseEvent, courseId: string) => {
      e.stopPropagation();
      navigate(`/course/${courseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Course Catalog</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button variant="secondary" icon={Filter} className="hidden sm:inline-flex">Filters</Button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
            <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat 
                    ? 'bg-green-700 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
            const isEnrolled = enrolled.some(e => e.id === course.id);
            return (
                <Card key={course.id} className="overflow-hidden flex flex-col h-full" onClick={() => navigate(`/course/${course.id}`)}>
                    <div className="h-48 overflow-hidden relative group">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                        {isEnrolled && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white font-medium flex items-center bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <PlayCircle className="w-4 h-4 mr-2" /> Resuming
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <Badge color={course.level === 'Advanced' ? 'red' : course.level === 'Intermediate' ? 'yellow' : 'green'}>
                                {course.level}
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {course.duration}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{course.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <div className="flex items-center text-xs text-slate-500">
                                <span className="font-medium text-slate-900 mr-1">{course.instructor}</span>
                            </div>
                            
                            {isEnrolled ? (
                                <Button size="sm" variant="secondary" onClick={(e) => handleContinue(e, course.id)}>
                                    Continue
                                </Button>
                            ) : (
                                <Button size="sm" variant="primary" onClick={(e) => handleEnroll(e, course.id)}>
                                    Enroll Now
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            );
        })}
        {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
                <p className="text-lg">No courses found matching your criteria.</p>
                <Button variant="ghost" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} className="mt-2">Clear Filters</Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;