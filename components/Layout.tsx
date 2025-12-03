import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  Bell,
  User as UserIcon,
  Compass,
  Trophy,
  MessageSquare,
  Users,
  ClipboardCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart,
  UserCircle,
  Megaphone,
  Calendar,
  FileText,
  Award,
  PieChart
} from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from '../store/store';

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  isCollapsed,
  onClick
}: {
  to: string;
  icon: any;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}) => (
  <div className="relative group">
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 
        ${isActive ? 'bg-green-50 text-green-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
      }
    >
      {/* ICON ALWAYS VISIBLE */}
      <div className="min-w-[24px] flex justify-center">
        <Icon className="h-5 w-5" />
      </div>

      {/* LABEL */}
      <span
        className={`ml-3 whitespace-nowrap transition-all duration-300 
        ${isCollapsed ? 'opacity-0 -translate-x-3 pointer-events-none' : 'opacity-100 translate-x-0'}`}
      >
        {label}
      </span>
    </NavLink>

    {/* Tooltip */}
    {isCollapsed && (
      <span className="absolute left-20 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {label}
      </span>
    )}
  </div>
);

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (location.pathname === '/login') return <Outlet />;

  /** NAVIGATION BY ROLE **/
  const studentNav = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/my-learning', icon: BookOpen, label: 'My Learning' },
    { to: '/catalog', icon: Compass, label: 'Browse Courses' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/achievements', icon: Trophy, label: 'Achievements' },
    { to: '/leaderboard', icon: BarChart, label: 'Leaderboard' },
    { to: '/community', icon: MessageSquare, label: 'Community' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' }
  ];

  const instructorNav = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/instructor/courses', icon: BookOpen, label: 'Course Management' },
    { to: '/instructor/assessments', icon: ClipboardCheck, label: 'Assessments' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/community', icon: MessageSquare, label: 'Community' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' }
  ];

  const adminNav = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/courses', icon: BookOpen, label: 'Course Oversight' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/analytics', icon: PieChart, label: 'Analytics' },
    { to: '/admin/reports', icon: FileText, label: 'Reports' },
    { to: '/admin/certificates', icon: Award, label: 'Certificates' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/community', icon: MessageSquare, label: 'Community' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' }
  ];

  const navItems =
    user?.role === 'instructor'
      ? instructorNav
      : user?.role === 'admin'
      ? adminNav
      : studentNav;

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-slate-200
          transform transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <img
            src="../Assests/MUST_LOGO.jpg"
            alt="MUST Logo"
            className={`h-10 w-10 object-contain transition-all duration-300 ${
              isCollapsed ? 'mx-auto' : 'mr-3'
            }`}
          />

          {!isCollapsed && (
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              MUST LMS
            </span>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-7 w-7 bg-white border border-slate-200 rounded-full shadow hover:bg-slate-50 transition-colors items-center justify-center"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-slate-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          )}
        </button>

        {/* Navigation */}
        <div className="p-4 flex flex-col h-[calc(100vh-4rem)] justify-between overflow-y-auto">

          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
                onClick={closeSidebar}
              />
            ))}

            <div
              className={`pt-4 mt-4 border-t border-slate-100 ${
                isCollapsed ? 'border-transparent' : ''
              }`}
            >
              <SidebarItem
                to="/profile"
                icon={UserCircle}
                label="Profile"
                isCollapsed={isCollapsed}
                onClick={closeSidebar}
              />
              <SidebarItem
                to="/settings"
                icon={Settings}
                label="Settings"
                isCollapsed={isCollapsed}
                onClick={closeSidebar}
              />
            </div>
          </nav>

          {/* Logout */}
          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => dispatch(logout())}
              className="flex w-full items-center px-4 py-3 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <div className="min-w-[24px] flex justify-center">
                <LogOut className="h-5 w-5" />
              </div>
              {!isCollapsed && 'Logout'}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-gradient-to-r from-green-900 to-emerald-600 shadow-md h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-green-100 hover:text-white hover:bg-green-700/50 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 flex items-center">
            <h1 className="text-white font-medium text-lg hidden sm:block tracking-wide">
              Learning Management System
            </h1>
            <span className="text-white font-medium text-lg sm:hidden">MUST LMS</span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-green-100 hover:text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-green-800" />
            </button>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 pl-4 border-l border-green-700/50 cursor-pointer"
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-white leading-none">{user?.name}</p>
                  <p className="text-xs text-green-200 capitalize mt-1 opacity-90">
                    {user?.role}
                  </p>
                </div>

                <div className="h-9 w-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center overflow-hidden shadow-sm">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-green-50" />
                  )}
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-green-200 hidden md:block transition-transform ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-50 md:hidden bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-3 text-slate-400" />
                    Your Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3 text-slate-400" />
                    Settings
                  </Link>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => dispatch(logout())}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
