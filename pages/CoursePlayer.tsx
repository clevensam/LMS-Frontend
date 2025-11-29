import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateProgress, submitAssignment } from '../store/store';
import { Button, Card, ProgressBar, Badge } from '../components/Common';
import { ChevronLeft, PlayCircle, CheckCircle, FileText, ChevronDown, ChevronRight, Maximize2, HelpCircle, Upload, File, Clock } from 'lucide-react';
import { QuizQuestion, Submission, Lesson } from '../types';

const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { catalog, submissions } = useSelector((state: RootState) => state.courses);
  const { user } = useSelector((state: RootState) => state.auth);
  const course = catalog.find(c => c.id === id);

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Assignment State
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);

  useEffect(() => {
    if (course && course.modules.length > 0) {
      setActiveModuleId(course.modules[0].id);
      setActiveLessonId(course.modules[0].lessons[0].id);
    }
  }, [course]);

  // Reset lesson specific states when lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setAssignmentText('');
    setAssignmentFile(null);
  }, [activeLessonId]);

  if (!course) return <div className="p-8">Course not found</div>;

  const currentModule = course.modules.find(m => m.id === activeModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLessonId);

  // Find existing submission for this lesson
  const currentSubmission = submissions.find(s => s.lessonId === currentLesson?.id && s.studentId === user?.id);

  const markComplete = () => {
      const newProgress = Math.min((course.progress || 0) + 10, 100);
      dispatch(updateProgress({ courseId: course.id, progress: newProgress }));
  };

  const submitQuiz = () => {
      if (!currentLesson?.questions) return;
      let score = 0;
      currentLesson.questions.forEach(q => {
          if (quizAnswers[q.id] === q.correctAnswer) score++;
      });
      setQuizScore(score);
      setQuizSubmitted(true);
      if (score === currentLesson.questions.length) {
          markComplete();
      }
  };

  const handleAssignmentSubmit = () => {
      if (currentLesson && user) {
          const submission: Submission = {
              id: `s${Date.now()}`,
              lessonId: currentLesson.id,
              studentId: user.id,
              studentName: user.name,
              submittedAt: new Date().toISOString(),
              content: assignmentText,
              fileName: assignmentFile?.name,
              status: 'pending'
          };
          dispatch(submitAssignment(submission));
          markComplete();
      }
  };

  const renderContent = () => {
      if (!currentLesson) return null;

      switch (currentLesson.type) {
          case 'video':
              return (
                <div className="aspect-video bg-slate-900 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <div className="w-full bg-slate-700/50 h-1 rounded-full mb-4">
                            <div className="bg-red-600 h-1 rounded-full w-1/3"></div>
                        </div>
                        <div className="flex justify-between text-white items-center">
                            <div className="flex space-x-4">
                                <PlayCircle className="h-8 w-8 cursor-pointer hover:text-red-500" />
                                <Maximize2 className="h-6 w-6 cursor-pointer hover:text-slate-300" />
                            </div>
                            <span className="text-sm font-medium">04:20 / {currentLesson.duration}</span>
                        </div>
                    </div>
                    <PlayCircle className="h-16 w-16 text-white/20 group-hover:text-white/80 transition-colors cursor-pointer" />
                    <p className="absolute top-1/2 mt-12 text-slate-500 text-sm font-mono">Simulated Video Player</p>
                </div>
              );
          
          case 'quiz':
              return (
                  <div className="p-8 bg-slate-50 min-h-[400px]">
                      <div className="max-w-2xl mx-auto">
                          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                              <HelpCircle className="h-6 w-6 mr-2 text-green-700" />
                              {currentLesson.title}
                          </h2>
                          
                          {quizSubmitted ? (
                              <Card className="p-8 text-center">
                                  <div className="mb-4">
                                      <span className="text-4xl font-bold text-green-700">{quizScore}</span>
                                      <span className="text-2xl text-slate-400"> / {currentLesson.questions?.length || 0}</span>
                                  </div>
                                  <p className="text-slate-600 mb-6">
                                      {quizScore === (currentLesson.questions?.length || 0) 
                                        ? "Perfect score! Lesson marked as complete." 
                                        : "Good effort. Review the material and try again."}
                                  </p>
                                  <Button onClick={() => {setQuizSubmitted(false); setQuizAnswers({});}}>Retake Quiz</Button>
                              </Card>
                          ) : (
                              <div className="space-y-8">
                                  {currentLesson.questions?.map((q, idx) => (
                                      <Card key={q.id} className="p-6">
                                          <h3 className="font-medium text-slate-900 mb-4">{idx + 1}. {q.text}</h3>
                                          <div className="space-y-2">
                                              {q.options.map((option, optIdx) => (
                                                  <label key={optIdx} className="flex items-center p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                                                      <input 
                                                          type="radio" 
                                                          name={`question-${q.id}`} 
                                                          className="h-4 w-4 text-green-700 focus:ring-green-500 border-gray-300"
                                                          checked={quizAnswers[q.id] === optIdx}
                                                          onChange={() => setQuizAnswers({...quizAnswers, [q.id]: optIdx})}
                                                      />
                                                      <span className="ml-3 text-slate-700">{option}</span>
                                                  </label>
                                              ))}
                                          </div>
                                      </Card>
                                  ))}
                                  <div className="flex justify-end">
                                      <Button onClick={submitQuiz} disabled={Object.keys(quizAnswers).length !== (currentLesson.questions?.length || 0)}>Submit Quiz</Button>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              );

          case 'assignment':
              return (
                  <div className="p-8 bg-slate-50 min-h-[400px]">
                       <div className="max-w-2xl mx-auto">
                           <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                              <FileText className="h-6 w-6 mr-2 text-green-700" />
                              Assignment: {currentLesson.title}
                          </h2>
                          
                          <Card className="p-6 mb-6">
                              <h3 className="font-semibold text-slate-900 mb-2">Instructions</h3>
                              <p className="text-slate-600 whitespace-pre-wrap">{currentLesson.assignmentInstructions || "No instructions provided."}</p>
                          </Card>

                          {currentSubmission ? (
                               <Card className={`p-8 text-center border-l-4 ${currentSubmission.status === 'graded' ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
                                   <div className={`inline-flex p-3 rounded-full mb-4 ${currentSubmission.status === 'graded' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                       {currentSubmission.status === 'graded' ? <CheckCircle className="h-8 w-8" /> : <Clock className="h-8 w-8" />}
                                   </div>
                                   
                                   {currentSubmission.status === 'graded' ? (
                                        <>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">Graded: {currentSubmission.grade}%</h3>
                                            <p className="text-slate-600 mb-4">{currentSubmission.feedback}</p>
                                        </>
                                   ) : (
                                        <>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">Assignment Submitted</h3>
                                            <p className="text-slate-500 mb-4">Your instructor is reviewing your submission.</p>
                                        </>
                                   )}
                                   
                                   <div className="text-sm text-slate-400 bg-slate-50 p-3 rounded">
                                       Submission: {currentSubmission.fileName || "Text Submission"} on {new Date(currentSubmission.submittedAt).toLocaleDateString()}
                                   </div>
                               </Card>
                          ) : (
                              <Card className="p-6">
                                  <h3 className="font-semibold text-slate-900 mb-4">Your Submission</h3>
                                  <textarea 
                                      className="w-full p-4 border border-slate-300 rounded-lg h-40 focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-4"
                                      placeholder="Type your answer here..."
                                      value={assignmentText}
                                      onChange={(e) => setAssignmentText(e.target.value)}
                                  ></textarea>
                                  
                                  <div className="mb-6">
                                      <label className="block text-sm font-medium text-slate-700 mb-2">Attachment (PDF, DOCX)</label>
                                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-50 relative">
                                          <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx,.txt"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                                          />
                                          <Upload className="h-8 w-8 mb-2" />
                                          <span className="text-sm">{assignmentFile ? assignmentFile.name : "Click to upload a file"}</span>
                                      </div>
                                  </div>

                                  <div className="flex justify-end">
                                      <Button onClick={handleAssignmentSubmit} disabled={!assignmentText && !assignmentFile}>Submit Assignment</Button>
                                  </div>
                              </Card>
                          )}
                       </div>
                  </div>
              );

          default:
              return <div className="p-12 text-center text-slate-500">Content type not supported yet.</div>;
      }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Top Bar for Mobile/Tablet */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between lg:hidden">
         <button onClick={() => navigate(-1)} className="flex items-center text-sm hover:text-green-300">
            <ChevronLeft className="h-4 w-4 mr-1"/> Back
         </button>
         <span className="font-semibold truncate max-w-[200px]">{course.title}</span>
         <div></div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-black relative">
           
           {renderContent()}

           {/* Lesson Details (Only show for video to avoid duplication in quiz/assignment views) */}
           {currentLesson?.type === 'video' && (
               <div className="bg-white p-6 md:p-8 flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{currentLesson?.title}</h1>
                            <p className="text-slate-500 mt-1">{currentModule?.title}</p>
                        </div>
                        <div className="flex space-x-3">
                             <Button onClick={markComplete}>Mark Complete</Button>
                        </div>
                    </div>

                    <div className="prose max-w-none text-slate-600">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">About this lesson</h3>
                        <p>In this lesson, we will explore the fundamental concepts outlined in the module. Please watch the video carefully and take notes on the key terminology.</p>
                    </div>
               </div>
           )}
        </div>

        {/* Right Sidebar - Syllabus (Desktop) */}
        <div className="hidden lg:flex w-80 bg-white border-l border-slate-200 flex-col">
           <div className="p-5 border-b border-slate-200 bg-slate-50">
               <h2 className="font-bold text-slate-900 mb-2">Course Content</h2>
               <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                   <span>{course.progress}% Completed</span>
                   <span>{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</span>
               </div>
               <ProgressBar value={course.progress || 0} className="h-2" />
           </div>
           
           <div className="flex-1 overflow-y-auto">
               {course.modules.map(module => (
                   <div key={module.id} className="border-b border-slate-100 last:border-0">
                       <button 
                         onClick={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
                         className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors"
                       >
                           <span className="font-medium text-sm text-slate-800 text-left">{module.title}</span>
                           {activeModuleId === module.id ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                       </button>
                       {activeModuleId === module.id && (
                           <div className="bg-white">
                               {module.lessons.map(lesson => {
                                   let Icon = PlayCircle;
                                   if (lesson.type === 'quiz') Icon = HelpCircle;
                                   if (lesson.type === 'assignment') Icon = FileText;
                                   if (lesson.type === 'reading') Icon = File;

                                   return (
                                       <div 
                                         key={lesson.id} 
                                         onClick={() => setActiveLessonId(lesson.id)}
                                         className={`px-4 py-3 flex items-start cursor-pointer transition-colors border-l-2 ${
                                             activeLessonId === lesson.id 
                                             ? 'bg-green-50 border-green-600' 
                                             : 'hover:bg-slate-50 border-transparent'
                                         }`}
                                       >
                                           <div className="mt-0.5 mr-3">
                                               {lesson.completed ? (
                                                   <CheckCircle className="h-4 w-4 text-green-500" />
                                               ) : (
                                                    <Icon className="h-4 w-4 text-slate-400" />
                                               )}
                                           </div>
                                           <div>
                                               <p className={`text-sm ${activeLessonId === lesson.id ? 'font-medium text-green-900' : 'text-slate-700'}`}>{lesson.title}</p>
                                               <p className="text-xs text-slate-400 mt-0.5">{lesson.duration}</p>
                                           </div>
                                       </div>
                                   );
                               })}
                           </div>
                       )}
                   </div>
               ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;