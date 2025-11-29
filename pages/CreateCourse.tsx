import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCourse, RootState } from '../store/store';
import { Course } from '../types';
import { Button, Input, Card } from '../components/Common';
import { ChevronLeft, Upload, BookOpen } from 'lucide-react';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    level: 'Beginner',
    duration: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newCourse: Course = {
        id: `c${Date.now()}`,
        title: formData.title,
        description: formData.description,
        instructor: user?.name || 'Instructor',
        thumbnail: `https://picsum.photos/seed/${Date.now()}/800/600`, // Random image
        category: formData.category,
        duration: formData.duration || '0h 0m',
        level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
        rating: 0,
        totalStudents: 0,
        modules: [], // Initialize with empty modules
        progress: 0
      };

      dispatch(addCourse(newCourse));
      setIsLoading(false);
      navigate('/instructor/courses');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
            <p className="text-slate-500">Fill in the details to publish your new course.</p>
        </div>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input 
              label="Course Title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. Advanced React Patterns" 
              required 
            />
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-3 border"
                placeholder="Describe what students will learn..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <Input 
              label="Estimated Duration" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              placeholder="e.g. 10h 30m" 
              required 
            />

            {/* Thumbnail Upload Placeholder */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Course Thumbnail</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-700 hover:text-green-600 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} icon={BookOpen}>Create Course</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCourse;