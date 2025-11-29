import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, gradeSubmission } from '../store/store';
import { Card, Button, Input, Badge } from '../components/Common';
import { FileText, CheckCircle, Clock, Search, Download } from 'lucide-react';

const Assessment: React.FC = () => {
  const { submissions } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch();
  
  const [filter, setFilter] = useState<'pending' | 'graded'>('pending');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  
  // Grading State
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const filteredSubmissions = submissions.filter(s => s.status === filter);
  const selectedSubmission = submissions.find(s => s.id === selectedSubmissionId);

  const handleGradeSubmit = () => {
      if (selectedSubmissionId && grade) {
          dispatch(gradeSubmission({
              id: selectedSubmissionId,
              grade: parseInt(grade),
              feedback
          }));
          setSelectedSubmissionId(null);
          setGrade('');
          setFeedback('');
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Assessments & Grading</h1>
            <p className="text-slate-500">Review student submissions and provide feedback.</p>
        </div>
        <div className="flex space-x-2 bg-white p-1 rounded-lg border border-slate-200">
            <button
                onClick={() => { setFilter('pending'); setSelectedSubmissionId(null); }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === 'pending' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
                Pending Review
            </button>
            <button
                onClick={() => { setFilter('graded'); setSelectedSubmissionId(null); }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === 'graded' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
                Graded History
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission List */}
          <div className="lg:col-span-1 space-y-4">
              <Card className="p-4 flex items-center space-x-2">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input type="text" placeholder="Search students..." className="flex-1 border-none focus:ring-0 text-sm" />
              </Card>

              <div className="space-y-3">
                  {filteredSubmissions.length === 0 && (
                      <p className="text-center text-slate-500 py-8">No {filter} submissions.</p>
                  )}
                  {filteredSubmissions.map(sub => (
                      <div 
                        key={sub.id} 
                        onClick={() => setSelectedSubmissionId(sub.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedSubmissionId === sub.id 
                            ? 'bg-green-50 border-green-500 ring-1 ring-green-500' 
                            : 'bg-white border-slate-200 hover:border-green-300'
                        }`}
                      >
                          <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-slate-900">{sub.studentName}</span>
                              {sub.status === 'graded' ? (
                                  <Badge color="green">Grade: {sub.grade}%</Badge>
                              ) : (
                                  <Badge color="yellow">Pending</Badge>
                              )}
                          </div>
                          <p className="text-xs text-slate-500 mb-2">Submitted: {new Date(sub.submittedAt).toLocaleDateString()}</p>
                          <div className="flex items-center text-xs text-slate-600">
                               <FileText className="h-3 w-3 mr-1" />
                               Assignment ID: {sub.lessonId}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Grading View */}
          <div className="lg:col-span-2">
              {selectedSubmission ? (
                  <Card className="p-6 h-full flex flex-col">
                      <div className="border-b border-slate-100 pb-4 mb-6">
                          <h2 className="text-xl font-bold text-slate-900 mb-1">Submission Details</h2>
                          <div className="flex items-center text-sm text-slate-500 space-x-4">
                              <span>Student: {selectedSubmission.studentName}</span>
                              <span>•</span>
                              <span>{new Date(selectedSubmission.submittedAt).toLocaleString()}</span>
                          </div>
                      </div>

                      <div className="flex-1 space-y-6">
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                              <h3 className="font-medium text-slate-900 mb-2">Student Response:</h3>
                              <p className="text-slate-700 whitespace-pre-wrap">{selectedSubmission.content}</p>
                              
                              {selectedSubmission.fileName && (
                                  <div className="mt-4 flex items-center p-3 bg-white rounded border border-slate-200">
                                      <FileText className="h-5 w-5 text-green-500 mr-2" />
                                      <span className="text-sm font-medium text-slate-700 flex-1">{selectedSubmission.fileName}</span>
                                      <Button size="sm" variant="ghost" icon={Download}>Download</Button>
                                  </div>
                              )}
                          </div>

                          {selectedSubmission.status === 'graded' ? (
                              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                  <div className="flex items-center mb-4">
                                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                                      <h3 className="text-lg font-bold text-green-900">Graded: {selectedSubmission.grade}/100</h3>
                                  </div>
                                  <div>
                                      <h4 className="font-medium text-green-800 text-sm">Instructor Feedback:</h4>
                                      <p className="text-green-700 mt-1">{selectedSubmission.feedback}</p>
                                  </div>
                              </div>
                          ) : (
                              <div className="bg-white border-t border-slate-100 pt-6">
                                  <h3 className="font-bold text-slate-900 mb-4">Instructor Evaluation</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                      <div className="md:col-span-1">
                                          <Input 
                                            label="Grade (0-100)" 
                                            type="number" 
                                            min="0" 
                                            max="100"
                                            value={grade}
                                            onChange={(e) => setGrade(e.target.value)}
                                          />
                                      </div>
                                      <div className="md:col-span-3">
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Feedback</label>
                                          <textarea 
                                              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                                              rows={3}
                                              value={feedback}
                                              onChange={(e) => setFeedback(e.target.value)}
                                              placeholder="Provide constructive feedback..."
                                          />
                                      </div>
                                  </div>
                                  <div className="flex justify-end">
                                      <Button onClick={handleGradeSubmit} disabled={!grade}>Submit Grade</Button>
                                  </div>
                              </div>
                          )}
                      </div>
                  </Card>
              ) : (
                  <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                      <div className="text-center text-slate-500">
                          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Select a submission to review</p>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default Assessment;