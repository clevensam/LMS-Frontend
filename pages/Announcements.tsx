import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/Common';
import { Megaphone, Calendar, AlertCircle, Info, CheckCircle, X } from 'lucide-react';

// Mock Announcements Data
const ANNOUNCEMENTS_DATA = [
  {
    id: 1,
    title: 'System Maintenance Scheduled',
    content: 'The MUST LMS will undergo scheduled maintenance this Saturday from 2:00 AM to 4:00 AM. Please save your work beforehand. During this time, access to course materials and assignment submissions will be unavailable. We apologize for any inconvenience caused.',
    date: '2023-10-25',
    type: 'critical',
    sender: 'IT Department'
  },
  {
    id: 2,
    title: 'New Course Available: Advanced Python',
    content: 'We are excited to announce a new course in the Data Science track. Enroll now to master advanced Python concepts including decorators, generators, and context managers. This course is recommended for 3rd-year students.',
    date: '2023-10-24',
    type: 'info',
    sender: 'Academic Office'
  },
  {
    id: 3,
    title: 'End of Semester Exams',
    content: 'The final exam schedule has been released. Check your dashboard for specific dates and times for your enrolled courses. Please ensure you have cleared all fee balances before the start of examinations. Good luck!',
    date: '2023-10-20',
    type: 'important',
    sender: 'Registrar'
  },
  {
    id: 4,
    title: 'Campus Wi-Fi Upgrade',
    content: 'We have upgraded the library Wi-Fi access points. You should experience faster connection speeds starting today. If you encounter any connectivity issues, please report them to the helpdesk immediately.',
    date: '2023-10-15',
    type: 'success',
    sender: 'IT Services'
  }
];

const Announcements: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof ANNOUNCEMENTS_DATA[0] | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="h-6 w-6 text-red-600" />;
      case 'success': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'info': return <Info className="h-6 w-6 text-blue-600" />;
      default: return <Megaphone className="h-6 w-6 text-yellow-600" />;
    }
  };

  const getBadgeColor = (type: string): 'red' | 'green' | 'yellow' | 'indigo' => {
     switch (type) {
      case 'critical': return 'red';
      case 'success': return 'green';
      case 'info': return 'indigo';
      default: return 'yellow';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500">Stay updated with the latest news and alerts.</p>
        </div>
      </div>

      <div className="space-y-4">
        {ANNOUNCEMENTS_DATA.map((announcement) => (
          <Card 
            key={announcement.id} 
            className="p-6 transition-all hover:scale-[1.01] duration-200 cursor-pointer hover:shadow-md"
            onClick={() => setSelectedAnnouncement(announcement)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full flex-shrink-0 bg-slate-50`}>
                {getIcon(announcement.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-slate-900">{announcement.title}</h3>
                    <Badge color={getBadgeColor(announcement.type)}>{announcement.type.toUpperCase()}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-slate-600 mb-3 line-clamp-2">{announcement.content}</p>
                <div className="flex items-center justify-between mt-2">
                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Posted by: {announcement.sender}
                  </p>
                  <span className="text-sm text-green-700 font-medium hover:underline">Read more</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50`}>
               <div className="flex items-center space-x-3">
                  {getIcon(selectedAnnouncement.type)}
                  <h2 className="text-xl font-bold text-slate-900">{selectedAnnouncement.title}</h2>
               </div>
               <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
               >
                 <X className="h-5 w-5" />
               </button>
            </div>
            
            <div className="p-8">
               <div className="flex items-center justify-between mb-6">
                  <Badge color={getBadgeColor(selectedAnnouncement.type)}>{selectedAnnouncement.type.toUpperCase()}</Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Posted on {new Date(selectedAnnouncement.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
               </div>
               
               <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                    {selectedAnnouncement.content}
                  </p>
               </div>
               
               <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-slate-500">From: </span>
                    <span className="font-semibold text-slate-900">{selectedAnnouncement.sender}</span>
                  </div>
                  <Button onClick={() => setSelectedAnnouncement(null)}>Close</Button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;