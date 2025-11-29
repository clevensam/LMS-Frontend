import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addModule, addLesson, togglePublish } from '../store/store';
import { Button, Card, Input } from '../components/Common';
import { ChevronLeft, Plus, Trash2, Video, FileText, CheckCircle, Circle, Save, HelpCircle, File } from 'lucide-react';
import { Lesson, QuizQuestion } from '../types';

const ManageCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { catalog } = useSelector((state: RootState) => state.courses);
  
  const course = catalog.find(c => c.id === id);

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [showLessonForm, setShowLessonForm] = useState<string | null>(null); // moduleId
  const [newLessonData, setNewLessonData] = useState<{
      title: string;
      type: 'video' | 'quiz' | 'reading' | 'assignment';
      duration: string;
      questions: QuizQuestion[];
      assignmentInstructions: string;
  }>({ 
      title: '', 
      type: 'video', 
      duration: '',
      questions: [],
      assignmentInstructions: ''
  });

  // State for adding a question to a quiz being created
  const [currentQuestion, setCurrentQuestion] = useState<{text: string, options: string[], correct: number}>({
      text: '', options: ['', '', ''], correct: 0
  });

  if (!course) return <div>Course not found</div>;

  const handleAddModule = () => {
    if (newModuleTitle.trim()) {
        dispatch(addModule({ courseId: course.id, title: newModuleTitle }));
        setNewModuleTitle('');
    }
  };

  const handleAddLesson = (moduleId: string) => {
      if (newLessonData.title && newLessonData.duration) {
          const lesson: Lesson = {
              id: `l${Date.now()}`,
              title: newLessonData.title,
              type: newLessonData.type,
              duration: newLessonData.duration,
              completed: false,
              questions: newLessonData.type === 'quiz' ? newLessonData.questions : undefined,
              assignmentInstructions: newLessonData.type === 'assignment' ? newLessonData.assignmentInstructions : undefined
          };
          dispatch(addLesson({ courseId: course.id, moduleId, lesson }));
          setShowLessonForm(null);
          setNewLessonData({ title: '', type: 'video', duration: '', questions: [], assignmentInstructions: '' });
      }
  };

  const addQuestionToQuiz = () => {
      if (currentQuestion.text && currentQuestion.options.every(o => o.trim() !== '')) {
          const newQ: QuizQuestion = {
              id: `q${Date.now()}`,
              text: currentQuestion.text,
              options: [...currentQuestion.options],
              correctAnswer: currentQuestion.correct
          };
          setNewLessonData({...newLessonData, questions: [...newLessonData.questions, newQ]});
          setCurrentQuestion({text: '', options: ['', '', ''], correct: 0});
      }
  };

  const handleOptionChange = (idx: number, val: string) => {
      const newOpts = [...currentQuestion.options];
      newOpts[idx] = val;
      setCurrentQuestion({...currentQuestion, options: newOpts});
  };

  const handlePublishToggle = () => {
      dispatch(togglePublish({ courseId: course.id, isPublished: !course.isPublished }));
  };

  return (
    <div className="space-y-6">
       {/* Header */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
            <button onClick={() => navigate('/instructor/courses')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Manage Course: {course.title}</h1>
                <p className="text-slate-500">Add modules and lessons, then publish to students.</p>
            </div>
        </div>
        <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => navigate(`/course/${course.id}`)}>Preview</Button>
            <Button 
                variant={course.isPublished ? "secondary" : "primary"} 
                icon={course.isPublished ? Circle : CheckCircle}
                onClick={handlePublishToggle}
            >
                {course.isPublished ? 'Unpublish' : 'Publish Course'}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content: Modules & Lessons */}
          <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Course Structure</h2>
                  
                  <div className="space-y-6">
                      {course.modules.length === 0 && (
                          <p className="text-center text-slate-500 py-4 italic">No modules yet. Add your first module below.</p>
                      )}

                      {course.modules.map(module => (
                          <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden">
                              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                                  <h3 className="font-semibold text-slate-800">{module.title}</h3>
                                  <Button size="sm" variant="ghost" onClick={() => setShowLessonForm(module.id)} icon={Plus}>Add Lesson</Button>
                              </div>
                              <div className="divide-y divide-slate-100">
                                  {module.lessons.map(lesson => {
                                      let Icon = Video;
                                      if (lesson.type === 'quiz') Icon = HelpCircle;
                                      if (lesson.type === 'assignment') Icon = FileText;
                                      if (lesson.type === 'reading') Icon = File;

                                      return (
                                          <div key={lesson.id} className="px-4 py-3 flex items-center justify-between bg-white">
                                              <div className="flex items-center space-x-3">
                                                  <Icon className="h-4 w-4 text-slate-400" />
                                                  <div>
                                                      <p className="text-sm font-medium text-slate-900">{lesson.title}</p>
                                                      <p className="text-xs text-slate-500">{lesson.duration} • {lesson.type}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })}
                                  {module.lessons.length === 0 && (
                                      <p className="px-4 py-3 text-sm text-slate-400 italic">No lessons in this module.</p>
                                  )}
                              </div>

                              {/* Add Lesson Form */}
                              {showLessonForm === module.id && (
                                  <div className="bg-green-50 p-4 border-t border-green-100">
                                      <h4 className="text-xs font-bold text-green-800 uppercase mb-3">New Lesson</h4>
                                      <div className="space-y-3">
                                          <Input 
                                            placeholder="Lesson Title" 
                                            value={newLessonData.title}
                                            onChange={e => setNewLessonData({...newLessonData, title: e.target.value})}
                                          />
                                          <div className="flex space-x-3">
                                              <select 
                                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                                                value={newLessonData.type}
                                                onChange={e => setNewLessonData({...newLessonData, type: e.target.value as any})}
                                              >
                                                  <option value="video">Video</option>
                                                  <option value="reading">Reading</option>
                                                  <option value="quiz">Quiz</option>
                                                  <option value="assignment">Assignment</option>
                                              </select>
                                              <Input 
                                                placeholder="Duration (e.g. 10:00)" 
                                                value={newLessonData.duration}
                                                onChange={e => setNewLessonData({...newLessonData, duration: e.target.value})}
                                              />
                                          </div>

                                          {/* Quiz Specific Fields */}
                                          {newLessonData.type === 'quiz' && (
                                              <div className="bg-white p-3 rounded border border-slate-200 space-y-3">
                                                  <h5 className="font-medium text-sm">Add Questions</h5>
                                                  <div className="space-y-2">
                                                      <Input 
                                                          placeholder="Question Text" 
                                                          value={currentQuestion.text}
                                                          onChange={e => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                                                      />
                                                      {currentQuestion.options.map((opt, idx) => (
                                                          <div key={idx} className="flex items-center space-x-2">
                                                              <input 
                                                                  type="radio" 
                                                                  name="correct-opt"
                                                                  checked={currentQuestion.correct === idx}
                                                                  onChange={() => setCurrentQuestion({...currentQuestion, correct: idx})}
                                                              />
                                                              <Input 
                                                                  placeholder={`Option ${idx + 1}`}
                                                                  value={opt}
                                                                  onChange={e => handleOptionChange(idx, e.target.value)}
                                                                  className="text-xs"
                                                              />
                                                          </div>
                                                      ))}
                                                      <Button size="sm" variant="secondary" onClick={addQuestionToQuiz} type="button">Add Question</Button>
                                                  </div>
                                                  
                                                  {newLessonData.questions.length > 0 && (
                                                      <div className="mt-2 text-xs text-slate-500">
                                                          {newLessonData.questions.length} questions added.
                                                      </div>
                                                  )}
                                              </div>
                                          )}

                                          {/* Assignment Specific Fields */}
                                          {newLessonData.type === 'assignment' && (
                                              <div>
                                                  <label className="block text-sm font-medium text-slate-700 mb-1">Instructions</label>
                                                  <textarea 
                                                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                                                      rows={3}
                                                      value={newLessonData.assignmentInstructions}
                                                      onChange={e => setNewLessonData({...newLessonData, assignmentInstructions: e.target.value})}
                                                  />
                                              </div>
                                          )}

                                          <div className="flex justify-end space-x-2 pt-2">
                                              <Button size="sm" variant="secondary" onClick={() => setShowLessonForm(null)}>Cancel</Button>
                                              <Button size="sm" onClick={() => handleAddLesson(module.id)}>Save Lesson</Button>
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  {/* Add Module Section */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                      <div className="flex space-x-3">
                          <Input 
                            placeholder="New Module Title..." 
                            value={newModuleTitle}
                            onChange={(e) => setNewModuleTitle(e.target.value)}
                          />
                          <Button onClick={handleAddModule} disabled={!newModuleTitle}>Add Module</Button>
                      </div>
                  </div>
              </Card>
          </div>

          {/* Sidebar: Course Settings */}
          <div className="space-y-6">
              <Card className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Course Settings</h3>
                  <div className="space-y-4">
                      <Input label="Course Title" defaultValue={course.title} />
                      <Input label="Duration" defaultValue={course.duration} />
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                        <select className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border" defaultValue={course.level}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                      </div>
                      <Button className="w-full" variant="secondary" icon={Save}>Save Changes</Button>
                  </div>
              </Card>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-800 text-sm mb-1">Instructor Tips</h4>
                  <ul className="text-xs text-green-700 list-disc pl-4 space-y-1">
                      <li>Break content into bite-sized lessons (5-10 mins).</li>
                      <li>Use quizzes to reinforce learning.</li>
                      <li>Publish your course when at least one module is complete.</li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ManageCourse;