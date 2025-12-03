import React from 'react';
import { Card } from '../components/Common';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Calendar: React.FC = () => {
  const { events } = useSelector((state: RootState) => state.admin);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Mock grid for October 2023
  const dates = Array.from({length: 31}, (_, i) => i + 1);
  const startOffset = 0; // Starts on Sunday

  const getEventTypeColor = (type: string) => {
      switch(type) {
          case 'exam': return 'bg-red-100 text-red-800 border-red-200';
          case 'holiday': return 'bg-purple-100 text-purple-800 border-purple-200';
          case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          default: return 'bg-blue-100 text-blue-800 border-blue-200';
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Calendar</h1>
          <p className="text-slate-500">Events, exams, and holidays.</p>
        </div>
        <div className="flex items-center space-x-4">
             <div className="flex space-x-2">
                 <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="h-5 w-5" /></button>
                 <span className="font-bold text-slate-900">October 2023</span>
                 <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="h-5 w-5" /></button>
             </div>
             <button className="px-3 py-1 bg-white border border-slate-300 rounded text-sm font-medium">Today</button>
        </div>
      </div>

      <Card className="p-6">
          <div className="grid grid-cols-7 gap-4 mb-4 text-center">
              {days.map(d => <div key={d} className="font-bold text-slate-500 uppercase text-xs">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
              {/* Padding days */}
              {Array.from({length: startOffset}).map((_, i) => <div key={`empty-${i}`} className="h-32 bg-slate-50/50 rounded-lg"></div>)}
              
              {dates.map(date => {
                  const dateStr = `2023-10-${date.toString().padStart(2, '0')}`;
                  const dayEvents = events.filter(e => e.date === dateStr);
                  
                  return (
                      <div key={date} className="h-32 border border-slate-100 rounded-lg p-2 hover:bg-slate-50 transition-colors relative">
                          <span className={`text-sm font-medium ${new Date().getDate() === date ? 'bg-green-600 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-700'}`}>
                              {date}
                          </span>
                          <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px]">
                              {dayEvents.map(ev => (
                                  <div key={ev.id} className={`text-[10px] px-1 py-0.5 rounded border truncate ${getEventTypeColor(ev.type)}`}>
                                      {ev.title}
                                  </div>
                              ))}
                          </div>
                      </div>
                  );
              })}
          </div>
      </Card>
    </div>
  );
};

export default Calendar;