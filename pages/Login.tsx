import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/store';
import { MOCK_USER, MOCK_INSTRUCTOR, MOCK_ADMIN } from '../constants';

import { 
  BookOpen, 
  User, 
  Lock, 
  ArrowRight, 
  MapPin, 
  Phone, 
  AlertCircle,
  Trophy,
  BarChart
} from 'lucide-react';

const ONBOARDING_FEATURES = [
  {
    id: 0,
    icon: BookOpen,
    title: "World-Class E-Learning",
    description: "Access high-quality courses and resources from Mbeya University of Science and Technology anywhere, anytime."
  },
  {
    id: 2,
    icon: Trophy,
    title: "Gamified Progress",
    description: "Earn badges, track your XP, and climb the leaderboard as you master new skills and complete assignments."
  },
  {
    id: 3,
    icon: BarChart,
    title: "Real-time Assessment",
    description: "Instructors can grade submissions instantly, and students receive immediate insights into their performance."
  }
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const useDispatchHook = useDispatch();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ONBOARDING_FEATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const detectRole = () => {
    const id = studentId.toLowerCase();
    if (id.startsWith('ins')) return 'instructor';
    if (id.startsWith('adm')) return 'admin';
    return 'student';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentId || !password) {
      setError('Please enter both your ID and password.');
      return;
    }

    const role = detectRole();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (role === 'instructor') useDispatchHook(login(MOCK_INSTRUCTOR));
      else if (role === 'admin') useDispatchHook(login(MOCK_ADMIN));
      else useDispatchHook(login(MOCK_USER));

      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-slate-800 overflow-hidden">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden">

        {/* Light Background Shape */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0 pointer-events-none">
          <svg className="absolute -top-20 -left-20 w-80 h-80 text-green-800" fill="currentColor" viewBox="0 0 200 200">
            <path d="M45.7,29.9C13,62.6-13,122.6,29.9,155.3s102.6,13,135.3-29.9s-13-102.6-29.9-135.3S32.6-13,45.7,29.9z"/>
          </svg>
        </div>

        {/* MUST HEADER */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-x-4">
            <div className="bg-white/80 p-2 rounded-xl shadow-sm backdrop-blur-sm">
              <img 
                src="https://sims.must.ac.tz/assets/images/logo.png"
                alt="MUST Logo" 
                className="w-16 h-16 object-contain" 
              />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-green-900 uppercase tracking-wide leading-tight">
                Mbeya University of<br/>Science and Technology
              </h1>
              <p className="text-emerald-700 font-medium text-sm md:text-base mt-1">
                Learning Management System
              </p>
            </div>
          </div>
        </div>

        {/* FEATURE SLIDER */}
        <div className="relative z-10 py-4 flex-1 flex flex-col justify-center mt-4">
          {ONBOARDING_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id}
                className={`transition-all duration-700 absolute w-full transform ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentSlide 
                      ? 'opacity-0 -translate-x-10' 
                      : 'opacity-0 translate-x-10'
                }`}
                style={{ position: index === currentSlide ? 'relative' : 'absolute' }}
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 inline-block mb-4 shadow-sm">
                  <Icon className="w-8 h-8 text-green-700" />
                </div>

                <h2 className="text-2xl font-bold text-green-900 mb-2">{feature.title}</h2>
                <p className="text-lg text-green-900/80 max-w-md">
                  {feature.description}
                </p>
              </div>
            );
          })}

          {/* Slider Dots */}
          <div className="flex space-x-2 mt-6">
            {ONBOARDING_FEATURES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-green-600' : 'w-2 bg-green-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 text-sm text-green-800 border-t border-green-200/50 pt-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>P.O. Box 131, Mbeya</span>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+255 25 295 7544</span>
            </div>
          </div>

          <p className="text-xs text-green-700/70 mt-1">
            © {new Date().getFullYear()} Mbeya University of Science & Technology
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 bg-white flex flex-col items-center justify-center p-4 md:p-8 lg:p-10">

        {/* System Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-800 tracking-wide">
            MUST LMS
          </h1>
          <p className="text-sm text-green-600 uppercase tracking-widest font-semibold mt-1">
            Learning Management System
          </p>
          <div className="h-1 w-14 bg-green-300 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-full mb-3 text-green-700">
              <User className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <div className="flex items-center p-3 text-sm text-red-800 bg-red-50 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                placeholder="Student / Staff ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>

            {/* Demo Credentials */}
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border">
              <p className="font-semibold text-slate-700">Demo Login (Password: "pass")</p>

              <div className="flex justify-between mt-2">
                <div>
                  <span className="text-[10px] uppercase text-slate-400">Student ID</span>
                  <p className="font-bold text-slate-700">std123</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-slate-400">Instructor ID</span>
                  <p className="font-bold text-slate-700">ins123</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-slate-400">Admin ID</span>
                  <p className="font-bold text-slate-700">adm123</p>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type="password"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-sm font-semibold rounded-xl text-white bg-green-700 hover:bg-green-800 shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Having trouble?{" "}
            <a className="font-semibold text-green-700 hover:text-green-800 hover:underline" href="#">
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;