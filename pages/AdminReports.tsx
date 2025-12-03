import React from 'react';
import { Card, Button } from '../components/Common';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

const AdminReports: React.FC = () => {
  const reports = [
    { title: 'User Activity Report', desc: 'Login history, session duration, and active status.' },
    { title: 'Course Performance', desc: 'Enrollment numbers, completion rates, and feedback.' },
    { title: 'Assessment Results', desc: 'Detailed grades, pass rates, and question analysis.' },
    { title: 'Financial Summary', desc: 'Revenue (if applicable) and resource allocation.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-500">Generate and customize system reports.</p>
      </div>

      <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Custom Report Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
                  <select className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last Quarter</option>
                      <option>Year to Date</option>
                  </select>
              </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Report Type</label>
                  <select className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border">
                      <option>All Data</option>
                      <option>Summary Only</option>
                  </select>
              </div>
               <div className="flex items-end">
                   <Button icon={Filter} className="w-full">Apply Filters</Button>
               </div>
          </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
              <Card key={idx} className="p-6 flex justify-between items-center">
                  <div>
                      <div className="flex items-center space-x-2 mb-1">
                          <FileText className="h-5 w-5 text-slate-400" />
                          <h3 className="font-bold text-slate-900">{report.title}</h3>
                      </div>
                      <p className="text-sm text-slate-500">{report.desc}</p>
                  </div>
                  <Button variant="secondary" size="sm" icon={Download}>Export CSV</Button>
              </Card>
          ))}
      </div>
    </div>
  );
};

export default AdminReports;