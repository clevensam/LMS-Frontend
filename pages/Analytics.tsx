import React from 'react';
import { Card } from '../components/Common';

// Feature has been removed.
const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
      <Card className="p-8 text-center text-slate-500">
        <p>This feature is currently unavailable.</p>
      </Card>
    </div>
  );
};

export default Analytics;