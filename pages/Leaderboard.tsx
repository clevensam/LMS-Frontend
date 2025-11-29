import React from 'react';
import { Card } from '../components/Common';
import { Trophy, Crown, Medal, Award } from 'lucide-react';
import { LEADERBOARD } from '../constants';

const Leaderboard: React.FC = () => {
  const sortedUsers = [...LEADERBOARD].sort((a, b) => b.points - a.points);
  const topThree = sortedUsers.slice(0, 3);
  const restUsers = sortedUsers.slice(3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
        <p className="text-slate-500">Top learners this week.</p>
      </div>

      {/* Podium for Top 3 */}
      <div className="flex justify-center items-end space-x-4 pb-8">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
            <div className="relative mb-2">
                <img src={topThree[1]?.avatar} alt={topThree[1]?.name} className="w-20 h-20 rounded-full border-4 border-slate-200 object-cover" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                    2
                </div>
            </div>
            <div className="bg-white p-6 rounded-t-2xl shadow-sm border border-slate-100 text-center w-36 h-48 flex flex-col justify-between">
                <div>
                    <p className="font-bold text-slate-900 truncate">{topThree[1]?.name.split(' ')[0]}</p>
                    <p className="text-sm text-slate-500">{topThree[1]?.points} XP</p>
                </div>
                <Medal className="h-8 w-8 text-slate-400 mx-auto" />
            </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center z-10 -mb-4">
             <div className="relative mb-2">
                 <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-8 text-yellow-500 animate-bounce" />
                <img src={topThree[0]?.avatar} alt={topThree[0]?.name} className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-white">
                    1
                </div>
            </div>
            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-t-2xl shadow-md border border-yellow-100 text-center w-48 h-60 flex flex-col justify-between">
                <div>
                    <p className="font-bold text-lg text-slate-900">{topThree[0]?.name}</p>
                    <p className="text-sm font-semibold text-yellow-700">{topThree[0]?.points} XP</p>
                </div>
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
            </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
            <div className="relative mb-2">
                <img src={topThree[2]?.avatar} alt={topThree[2]?.name} className="w-20 h-20 rounded-full border-4 border-amber-600 object-cover" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                    3
                </div>
            </div>
            <div className="bg-white p-6 rounded-t-2xl shadow-sm border border-slate-100 text-center w-36 h-40 flex flex-col justify-between">
                <div>
                    <p className="font-bold text-slate-900 truncate">{topThree[2]?.name.split(' ')[0]}</p>
                    <p className="text-sm text-slate-500">{topThree[2]?.points} XP</p>
                </div>
                <Award className="h-8 w-8 text-amber-600 mx-auto" />
            </div>
        </div>
      </div>

      {/* Rest of the list */}
      <Card className="max-w-3xl mx-auto overflow-hidden">
         <div className="divide-y divide-slate-100">
             {restUsers.map((user, idx) => (
                 <div key={user.id} className="p-4 flex items-center hover:bg-slate-50 transition-colors">
                     <div className="w-12 text-center font-bold text-slate-400">
                         {idx + 4}
                     </div>
                     <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover mr-4" />
                     <div className="flex-1">
                         <h3 className="font-medium text-slate-900">{user.name}</h3>
                     </div>
                     <div className="text-right">
                         <span className="font-bold text-slate-700">{user.points} XP</span>
                     </div>
                 </div>
             ))}
         </div>
      </Card>
    </div>
  );
};

export default Leaderboard;