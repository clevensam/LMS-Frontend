import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, Button, Badge } from '../components/Common';
import { Award, Download, Search, Plus } from 'lucide-react';

const AdminCertificates: React.FC = () => {
  const { certificates } = useSelector((state: RootState) => state.admin);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certificate Management</h1>
          <p className="text-slate-500">Manage and issue e-certificates to students.</p>
        </div>
        <Button icon={Plus}>Issue Certificate</Button>
      </div>

      <Card className="p-6">
          <div className="flex items-center mb-6">
              <div className="relative w-full max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                     type="text" 
                     placeholder="Search by student or code..." 
                     className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                 />
             </div>
         </div>

         <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-slate-200">
                 <thead className="bg-slate-50">
                     <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificate Code</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student Name</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Issue Date</th>
                         <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-slate-200">
                     {certificates.map((cert) => (
                         <tr key={cert.id} className="hover:bg-slate-50">
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">
                                 {cert.code}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                 {cert.studentName}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                 {cert.courseTitle}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                 {cert.issueDate}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                 <button className="text-green-600 hover:text-green-800 flex items-center justify-end w-full">
                                     <Download className="h-4 w-4 mr-1" /> PDF
                                 </button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
             {certificates.length === 0 && (
                 <div className="text-center py-12 text-slate-500">
                     <Award className="h-12 w-12 mx-auto mb-3 opacity-30" />
                     <p>No certificates issued yet.</p>
                 </div>
             )}
         </div>
      </Card>
    </div>
  );
};

export default AdminCertificates;