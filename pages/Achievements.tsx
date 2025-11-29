import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, Badge, ProgressBar } from '../components/Common';
import { Trophy, Medal, Star, Target, Crown } from 'lucide-react';
import { LEADERBOARD } from '../constants';

const Achievements: React.FC = () => {
  const { points, badges } = useSelector((state: RootState) => state.gamification);
  const { user } = useSelector((state: RootState) => state.auth);

  const nextLevelPoints = 2000;
  const progressToNextLevel = (points / nextLevelPoints) * 100;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Stats Profile */}
        <Card className="lg:col-span-2 p-8 bg-gradient-to-r from-green-700 to-emerald-800 text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="h-24 w-24 rounded-full border-4 border-white/20 overflow-hidden shadow-xl">
                    <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                        <h1 className="text-3xl font-bold">{user?.name}</h1>
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                            Level {user?.level || 1}
                        </span>
                    </div>
                    <p className="text-green-100 mb-6">Keep learning to unlock new badges!</p>
                    
                    <div className="space-y-2 max-w-lg">
                        <div className="flex justify-between text-sm font-medium text-green-100">
                            <span>{points} XP</span>
                            <span>{nextLevelPoints} XP</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-3">
                            <div className="bg-yellow-400 h-3 rounded-full shadow-lg" style={{width: `${progressToNextLevel}%`}}></div>
                        </div>
                        <p className="text-xs text-green-200 mt-1">{nextLevelPoints - points} points needed for Level {(user?.level || 1) + 1}</p>
                    </div>
                </div>
            </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Global Rank</p>
                    <p className="text-2xl font-bold text-slate-900">#42</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-xl">
                    <Medal className="h-8 w-8 text-green-700" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Badges Earned</p>
                    <p className="text-2xl font-bold text-slate-900">{badges.length}</p>
                </div>
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Section */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Your Badges
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge) => (
                    <Card key={badge.id} className="p-4 flex items-center space-x-4 border-l-4 border-l-green-500">
                        <div className="text-4xl">{badge.icon}</div>
                        <div>
                            <h3 className="font-bold text-slate-900">{badge.name}</h3>
                            <p className="text-sm text-slate-500">{badge.description}</p>
                        </div>
                    </Card>
                ))}
                {/* Locked Badge Placeholder */}
                <Card className="p-4 flex items-center space-x-4 opacity-50 border border-dashed">
                    <div className="text-4xl grayscale">🏆</div>
                    <div>
                        <h3 className="font-bold text-slate-700">Course Finisher</h3>
                        <p className="text-sm text-slate-500">Complete 5 courses to unlock</p>
                    </div>
                </Card>
            </div>
        </div>

        {/* Leaderboard Section */}
        <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                Top Learners
            </h2>
            <Card className="overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {LEADERBOARD.map((learner, index) => (
                        <div key={learner.id} className={`p-4 flex items-center ${learner.id === user?.id ? 'bg-green-50' : ''}`}>
                            <div className={`w-8 text-center font-bold mr-2 ${index < 3 ? 'text-yellow-600' : 'text-slate-400'}`}>
                                {index + 1}
                            </div>
                            <img src={learner.avatar} alt={learner.name} className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                            <div className="ml-3 flex-1">
                                <p className={`text-sm font-medium ${learner.id === user?.id ? 'text-green-900' : 'text-slate-900'}`}>
                                    {learner.name} {learner.id === user?.id && '(You)'}
                                </p>
                            </div>
                            <div className="text-sm font-bold text-slate-600">
                                {learner.points} pts
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                    <button className="text-sm text-green-700 font-medium hover:text-green-800">View Full Leaderboard</button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Achievements;