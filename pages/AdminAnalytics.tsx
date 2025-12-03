import React from 'react';
import { Card } from '../components/Common';
import { BarChart, Activity, TrendingUp, Users, PieChart } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">System Analytics</h1>
      <p className="text-slate-500">In-depth insights into platform usage and learning effectiveness.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Learning Gap Analysis
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2 px-2 pb-2 border-b border-l border-slate-200">
                  {/* Mock Chart */}
                  {[65, 40, 75, 55, 90, 30, 80].map((h, i) => (
                      <div key={i} className="w-full bg-green-100 rounded-t hover:bg-green-200 transition-colors relative group">
                          <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-green-500 rounded-t"></div>
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-1 rounded">
                              {h}% Score
                          </div>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>React</span>
                  <span>UI/UX</span>
                  <span>Python</span>
                  <span>JS</span>
                  <span>SQL</span>
                  <span>DevOps</span>
                  <span>Cloud</span>
              </div>
              <p className="text-sm text-slate-500 mt-4">Average assessment scores per category showing knowledge gaps in DevOps.</p>
          </Card>

          <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  User Engagement
              </h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Daily Active Users</span>
                      <span className="text-lg font-bold text-slate-900">842</span>
                  </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                       <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                   </div>
                   
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Course Completion Rate</span>
                      <span className="text-lg font-bold text-slate-900">68%</span>
                  </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                       <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                   </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Avg. Session Duration</span>
                      <span className="text-lg font-bold text-slate-900">45m</span>
                  </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                       <div className="bg-purple-500 h-2 rounded-full" style={{width: '60%'}}></div>
                   </div>
              </div>
          </Card>
      </div>

       <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
              Enrollment Trends (Last 6 Months)
          </h3>
          <div className="h-48 flex items-center justify-center bg-slate-50 border border-slate-200 border-dashed rounded-lg text-slate-400">
               <p>Chart Visualization Placeholder</p>
          </div>
       </Card>
    </div>
  );
};

export default AdminAnalytics;