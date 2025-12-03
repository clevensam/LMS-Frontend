import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, ProgressBar, Badge, Button } from '../components/Common';
import { Play, Award, TrendingUp, BookOpen, Plus, FileText, CheckCircle, Users, Settings, Activity, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ACHIEVEMENTS } from '../constants';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { enrolled, catalog } = useSelector((state: RootState) => state.courses);
  const { points } = useSelector((state: RootState) => state.gamification);
  const navigate = useNavigate();

  // --- Admin Dashboard View ---
  if (user?.role === 'admin') {
      return (
          <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Dashboard</h1>
                    <p className="mt-1 text-slate-500">Real-time overview of MUST LMS activity and performance.</p>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                    <Button variant="secondary" icon={FileText} onClick={() => navigate('/admin/reports')}>Generate Report</Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Users</p>
                        <p className="text-2xl font-bold text-slate-900">1,245</p>
                    </div>
                  </Card>
                  <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Active Courses</p>
                        <p className="text-2xl font-bold text-slate-900">{catalog.filter(c => c.isPublished).length}</p>
                    </div>
                  </Card>
                  <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Daily Active</p>
                        <p className="text-2xl font-bold text-green-600">842</p>
                    </div>
                  </Card>
                   <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
                        <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                  </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Daily Activity Monitor */}
                  <Card className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Daily Activity Monitoring</h3>
                      <div className="space-y-4">
                          <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Student Logins</span>
                              <div className="w-2/3">
                                  <ProgressBar value={85} />
                              </div>
                              <span className="text-sm font-bold text-slate-900">85%</span>
                          </div>
                          <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Course Completions</span>
                              <div className="w-2/3">
                                  <ProgressBar value={40} />
                              </div>
                               <span className="text-sm font-bold text-slate-900">42</span>
                          </div>
                          <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Assignment Uploads</span>
                              <div className="w-2/3">
                                  <ProgressBar value={65} />
                              </div>
                               <span className="text-sm font-bold text-slate-900">128</span>
                          </div>
                      </div>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Admin Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => navigate('/admin/users')} className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-green-500 transition-all text-left">
                              <Users className="h-6 w-6 text-slate-500 mb-2" />
                              <p className="font-medium text-slate-900">Manage Users</p>
                              <p className="text-xs text-slate-500">Add, edit or block</p>
                          </button>
                          <button onClick={() => navigate('/admin/courses')} className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-green-500 transition-all text-left">
                              <BookOpen className="h-6 w-6 text-slate-500 mb-2" />
                              <p className="font-medium text-slate-900">Course Oversight</p>
                              <p className="text-xs text-slate-500">Approve content</p>
                          </button>
                           <button onClick={() => navigate('/admin/analytics')} className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-green-500 transition-all text-left">
                              <TrendingUp className="h-6 w-6 text-slate-500 mb-2" />
                              <p className="font-medium text-slate-900">Analytics</p>
                              <p className="text-xs text-slate-500">View insights</p>
                          </button>
                          <button onClick={() => navigate('/settings')} className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-green-500 transition-all text-left">
                              <Settings className="h-6 w-6 text-slate-500 mb-2" />
                              <p className="font-medium text-slate-900">System Config</p>
                              <p className="text-xs text-slate-500">Global settings</p>
                          </button>
                      </div>
                  </Card>
              </div>
          </div>
      );
  }

  // --- Instructor Dashboard View ---
  if (user?.role === 'instructor') {
      const myCourses = catalog.filter(c => c.instructor === user.name);
      const publishedCount = myCourses.filter(c => c.isPublished).length;
      const draftCount = myCourses.filter(c => !c.isPublished).length;

      return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Instructor Dashboard</h1>
                    <p className="mt-1 text-slate-500">Welcome back, {user.name}. Here's how your courses are performing.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button icon={Plus} onClick={() => navigate('/instructor/create-course')}>Create New Course</Button>
                </div>
            </div>

            {/* Instructor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Courses</p>
                        <p className="text-2xl font-bold text-slate-900">{myCourses.length}</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Published</p>
                        <p className="text-2xl font-bold text-slate-900">{publishedCount}</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                        <FileText className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Drafts</p>
                        <p className="text-2xl font-bold text-slate-900">{draftCount}</p>
                    </div>
                </Card>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 pt-2">Your Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map(course => (
                    <Card key={course.id} className="overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow">
                        <div className="h-40 overflow-hidden relative">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                                {course.isPublished ? (
                                    <Badge color="green">Published</Badge>
                                ) : (
                                    <Badge color="yellow">Draft</Badge>
                                )}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <Badge color="green">{course.category}</Badge>
                                <span className="text-xs text-slate-500 font-medium">{course.totalStudents.toLocaleString()} Students</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h3>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                            <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-xs font-medium text-slate-600">{course.modules.length} Modules</span>
                                <Button size="sm" variant="secondary" onClick={() => navigate(`/instructor/course/${course.id}/manage`)}>Manage Content</Button>
                            </div>
                        </div>
                    </Card>
                ))}
                {/* Add New Placeholder */}
                <button 
                  onClick={() => navigate('/instructor/create-course')}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-green-500 hover:text-green-600 hover:bg-slate-50 transition-all h-full min-h-[300px]"
                >
                    <Plus className="h-10 w-10 mb-3 opacity-50" />
                    <span className="font-medium">Create New Course</span>
                </button>
            </div>
        </div>
      );
  }

  // --- Student Dashboard View ---
  const continueCourse = enrolled[0];
  const completedCoursesCount = enrolled.filter(c => (c.progress || 0) >= 100).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="mt-1 text-slate-500">You've learned 80% more this week than last week.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate('/catalog')}>Explore Courses</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Award className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Points</p>
            <p className="text-2xl font-bold text-slate-900">{points}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Courses Completed</p>
            <p className="text-2xl font-bold text-slate-900">{completedCoursesCount}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Courses in Progress</p>
            <p className="text-2xl font-bold text-slate-900">{enrolled.length - completedCoursesCount}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Continue Learning</h2>
          {continueCourse ? (
            <Card className="p-0 overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto bg-slate-200 relative">
                <img src={continueCourse.thumbnail} alt={continueCourse.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate(`/course/${continueCourse.id}`)}>
                         <Play className="h-6 w-6 text-green-700 ml-1" />
                    </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                   <Badge color="green">{continueCourse.category}</Badge>
                   <span className="text-xs text-slate-500 font-medium">{continueCourse.duration} left</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{continueCourse.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{continueCourse.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Progress</span>
                    <span>{continueCourse.progress}%</span>
                  </div>
                  <ProgressBar value={continueCourse.progress || 0} />
                </div>
                <div className="mt-4">
                     <Button size="sm" onClick={() => navigate(`/course/${continueCourse.id}`)}>Resume Course</Button>
                </div>
              </div>
            </Card>
          ) : (
             <Card className="p-8 text-center">
                 <p className="text-slate-500 mb-4">You haven't started any courses yet.</p>
                 <Button onClick={() => navigate('/catalog')}>Browse Catalog</Button>
             </Card>
          )}

          <h2 className="text-lg font-semibold text-slate-900 pt-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolled.filter(c => c.id !== continueCourse?.id).map(course => (
                  <Card key={course.id} className="p-4" onClick={() => navigate(`/course/${course.id}`)}>
                      <div className="flex space-x-3">
                          <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                          <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-slate-900 truncate">{course.title}</h4>
                              <p className="text-xs text-slate-500 mb-2">{course.instructor}</p>
                              <ProgressBar value={course.progress || 0} className="h-1.5" />
                          </div>
                      </div>
                  </Card>
              ))}
              {enrolled.length <= 1 && (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center text-slate-500">
                      <p className="text-sm mb-2">Ready for something new?</p>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/catalog')}>Find Courses</Button>
                  </div>
              )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">My Achievements</h3>
            <div className="space-y-4">
               {ACHIEVEMENTS.map((badge, idx) => (
                   <div key={badge.id} className={`flex items-center p-3 rounded-lg ${idx < 2 ? 'bg-slate-50' : 'opacity-50 grayscale'}`}>
                       <div className="text-2xl mr-3">{badge.icon}</div>
                       <div>
                           <p className="text-sm font-medium text-slate-900">{badge.name}</p>
                           <p className="text-xs text-slate-500">{badge.description}</p>
                       </div>
                   </div>
               ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;