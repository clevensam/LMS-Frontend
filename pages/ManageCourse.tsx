import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addModule, addLesson, togglePublish } from '../store/store';
import { Button, Card, Input } from '../components/Common';
import { ChevronLeft, Plus, Trash2, Video, FileText, CheckCircle, Circle, Save, HelpCircle, File, Upload, Link, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote } from 'lucide-react';
import { Lesson, QuizQuestion } from '../types';

// Custom Rich Text Editor Component
const RichTextEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Write your content here..." }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target?.result as string;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        document.execCommand('insertHTML', false, img.outerHTML);
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const clearFormatting = () => {
    document.execCommand('removeFormat', false, '');
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-slate-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
        {/* Font Size */}
        <select 
          className="px-2 py-1 text-sm border rounded bg-white hover:bg-slate-50"
          onChange={(e) => applyFormatting('fontSize', e.target.value)}
        >
          <option value="">Size</option>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>

        {/* Font Family */}
        <select 
          className="px-2 py-1 text-sm border rounded bg-white hover:bg-slate-50"
          onChange={(e) => applyFormatting('fontName', e.target.value)}
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
        </select>

        {/* Text Formatting */}
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('underline')}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </button>

        {/* Text Alignment */}
        <div className="h-5 w-px bg-slate-300 mx-1"></div>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('justifyRight')}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        {/* Lists */}
        <div className="h-5 w-px bg-slate-300 mx-1"></div>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('insertUnorderedList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-slate-200 rounded"
          onClick={() => applyFormatting('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        {/* Text Color */}
        <div className="h-5 w-px bg-slate-300 mx-1"></div>
        <input 
          type="color" 
          className="w-8 h-8 cursor-pointer"
          onChange={(e) => applyFormatting('foreColor', e.target.value)}
          title="Text Color"
        />

        {/* Background Color */}
        <input 
          type="color" 
          className="w-8 h-8 cursor-pointer"
          onChange={(e) => applyFormatting('backColor', e.target.value)}
          title="Background Color"
        />

        {/* Image Upload */}
        <div className="h-5 w-px bg-slate-300 mx-1"></div>
        <button 
          className="px-2 py-1 text-sm border rounded bg-white hover:bg-slate-50 flex items-center gap-1"
          onClick={insertImage}
          title="Insert Image"
        >
          <Type className="h-4 w-4" />
          Image
        </button>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Clear Formatting */}
        <button 
          className="px-2 py-1 text-sm border rounded bg-white hover:bg-slate-50 ml-auto"
          onClick={clearFormatting}
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        className="min-h-[300px] p-4 focus:outline-none bg-white"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        style={{ 
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '1.6'
        }}
      />
      
      {/* Hidden input to maintain focus for formatting */}
      <input type="text" className="absolute opacity-0 h-0 w-0" />
    </div>
  );
};

const ManageCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { catalog } = useSelector((state: RootState) => state.courses);
  
  const course = catalog.find(c => c.id === id);

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [showLessonForm, setShowLessonForm] = useState<string | null>(null);
  const [newLessonData, setNewLessonData] = useState<{
      title: string;
      type: 'video' | 'quiz' | 'reading' | 'assignment';
      videoType: 'upload' | 'youtube' | null;
      videoFile: File | null;
      youtubeUrl: string;
      content: string;
      questions: QuizQuestion[];
      assignmentInstructions: string;
  }>({ 
      title: '', 
      type: 'video', 
      videoType: null,
      videoFile: null,
      youtubeUrl: '',
      content: '',
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
      if (newLessonData.title) {
          // For video lessons, we need either a video file or YouTube URL
          if (newLessonData.type === 'video') {
              if (newLessonData.videoType === 'upload' && !newLessonData.videoFile) {
                  alert('Please upload a video file');
                  return;
              }
              if (newLessonData.videoType === 'youtube' && !newLessonData.youtubeUrl.trim()) {
                  alert('Please enter a YouTube URL');
                  return;
              }
          }

          // For reading lessons, ensure content is not empty
          if (newLessonData.type === 'reading' && !newLessonData.content.trim()) {
              alert('Please add reading content');
              return;
          }

          const lesson: Lesson = {
              id: `l${Date.now()}`,
              title: newLessonData.title,
              type: newLessonData.type,
              duration: getDefaultDuration(newLessonData.type),
              completed: false,
              questions: newLessonData.type === 'quiz' ? newLessonData.questions : undefined,
              assignmentInstructions: newLessonData.type === 'assignment' ? newLessonData.assignmentInstructions : undefined,
              videoUrl: newLessonData.type === 'video' ? newLessonData.youtubeUrl : undefined,
              content: newLessonData.type === 'reading' ? newLessonData.content : undefined
          };
          dispatch(addLesson({ courseId: course.id, moduleId, lesson }));
          setShowLessonForm(null);
          resetLessonForm();
      }
  };

  const getDefaultDuration = (type: string): string => {
    switch(type) {
        case 'video': return '10:00';
        case 'reading': return '15 min read';
        case 'quiz': return '10 min';
        case 'assignment': return '30 min';
        default: return '10:00';
    }
  };

  const resetLessonForm = () => {
    setNewLessonData({ 
        title: '', 
        type: 'video', 
        videoType: null,
        videoFile: null,
        youtubeUrl: '',
        content: '',
        questions: [],
        assignmentInstructions: '' 
    });
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

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Check if file is a video
        if (!file.type.startsWith('video/')) {
            alert('Please upload a video file');
            return;
        }
        setNewLessonData({...newLessonData, videoFile: file});
    }
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
                                          
                                          <div>
                                              <label className="block text-sm font-medium text-slate-700 mb-1">Lesson Type</label>
                                              <select 
                                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                                                value={newLessonData.type}
                                                onChange={e => {
                                                    const newType = e.target.value as 'video' | 'quiz' | 'reading' | 'assignment';
                                                    setNewLessonData({
                                                        ...newLessonData, 
                                                        type: newType,
                                                        videoType: newType === 'video' ? 'youtube' : null,
                                                        videoFile: null,
                                                        youtubeUrl: '',
                                                        content: '',
                                                        questions: [],
                                                        assignmentInstructions: ''
                                                    });
                                                }}
                                              >
                                                  <option value="video">Video</option>
                                                  <option value="reading">Reading</option>
                                                  <option value="quiz">Quiz</option>
                                                  <option value="assignment">Assignment</option>
                                              </select>
                                          </div>

                                          {/* Video Specific Fields */}
                                          {newLessonData.type === 'video' && (
                                              <div className="space-y-3">
                                                  <div>
                                                      <label className="block text-sm font-medium text-slate-700 mb-2">Video Source</label>
                                                      <div className="flex space-x-4">
                                                          <label className="flex items-center space-x-2">
                                                              <input 
                                                                  type="radio" 
                                                                  value="youtube"
                                                                  checked={newLessonData.videoType === 'youtube'}
                                                                  onChange={() => setNewLessonData({...newLessonData, videoType: 'youtube', videoFile: null})}
                                                              />
                                                              <Link className="h-4 w-4" />
                                                              <span>YouTube URL</span>
                                                          </label>
                                                          <label className="flex items-center space-x-2">
                                                              <input 
                                                                  type="radio" 
                                                                  value="upload"
                                                                  checked={newLessonData.videoType === 'upload'}
                                                                  onChange={() => setNewLessonData({...newLessonData, videoType: 'upload', youtubeUrl: ''})}
                                                              />
                                                              <Upload className="h-4 w-4" />
                                                              <span>Upload Video</span>
                                                          </label>
                                                      </div>
                                                  </div>

                                                  {newLessonData.videoType === 'youtube' && (
                                                      <div>
                                                          <label className="block text-sm font-medium text-slate-700 mb-1">YouTube URL</label>
                                                          <Input 
                                                              placeholder="https://youtube.com/watch?v=..."
                                                              value={newLessonData.youtubeUrl}
                                                              onChange={e => setNewLessonData({...newLessonData, youtubeUrl: e.target.value})}
                                                          />
                                                          <p className="text-xs text-slate-500 mt-1">Paste a YouTube video URL to embed</p>
                                                      </div>
                                                  )}

                                                  {newLessonData.videoType === 'upload' && (
                                                      <div>
                                                          <label className="block text-sm font-medium text-slate-700 mb-1">Upload Video File</label>
                                                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                                                              <div className="space-y-1 text-center">
                                                                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                                                  <div className="flex text-sm text-slate-600">
                                                                      <label className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                                                                          <span>Upload a video</span>
                                                                          <input 
                                                                              type="file" 
                                                                              className="sr-only" 
                                                                              accept="video/*"
                                                                              onChange={handleVideoFileChange}
                                                                          />
                                                                      </label>
                                                                  </div>
                                                                  <p className="text-xs text-slate-500">
                                                                      MP4, MOV, AVI up to 1GB
                                                                  </p>
                                                              </div>
                                                          </div>
                                                          {newLessonData.videoFile && (
                                                              <div className="mt-2 p-2 bg-green-100 rounded text-sm">
                                                                  Selected: {newLessonData.videoFile.name}
                                                              </div>
                                                          )}
                                                      </div>
                                                  )}
                                              </div>
                                          )}

                                          {/* Reading Specific Fields */}
                                          {newLessonData.type === 'reading' && (
                                              <div>
                                                  <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                                                  <div className="border border-slate-300 rounded-md overflow-hidden">
                                                      <RichTextEditor
                                                          value={newLessonData.content}
                                                          onChange={(content) => setNewLessonData({...newLessonData, content})}
                                                          placeholder="Write your reading content here..."
                                                      />
                                                  </div>
                                              </div>
                                          )}

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
                                              <Button size="sm" variant="secondary" onClick={() => {
                                                  setShowLessonForm(null);
                                                  resetLessonForm();
                                              }}>Cancel</Button>
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