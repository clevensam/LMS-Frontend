import { Course, User, Achievement, Post } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@lumina.edu',
  role: 'student',
  avatar: 'https://picsum.photos/id/64/200/200',
  points: 1250,
  level: 5,
  badges: ['quick-learner', 'week-streak'],
  bio: 'Computer Science sophomore passionate about AI and Web Development.',
  department: 'Computer Science',
  phone: '+255 123 456 789'
};

export const MOCK_INSTRUCTOR: User = {
  id: 'u2',
  name: 'Sarah Drasner',
  email: 'sarah@lumina.edu',
  role: 'instructor',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  points: 0,
  level: 10,
  badges: ['top-instructor'],
  bio: 'Senior Lecturer with 10 years of industry experience in Full Stack Development.',
  department: 'Information Technology',
  phone: '+255 987 654 321'
};

export const MOCK_ADMIN: User = {
  id: 'u3',
  name: 'System Admin',
  email: 'admin@lumina.edu',
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff',
  points: 0,
  level: 99,
  badges: ['admin-access'],
  department: 'IT Support'
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'quick-learner', name: 'Quick Learner', icon: '🚀', description: 'Completed a module in under 1 hour' },
  { id: 'week-streak', name: '7 Day Streak', icon: '🔥', description: 'Logged in for 7 consecutive days' },
  { id: 'quiz-master', name: 'Quiz Master', icon: '🧠', description: 'Scored 100% on a quiz' },
  { id: 'contributor', name: 'Top Contributor', icon: '💬', description: '100+ Community posts' },
  { id: 'early-bird', name: 'Early Bird', icon: '🌅', description: 'Completed a lesson before 8 AM' },
];

export const LEADERBOARD = [
  { id: 'u1', name: 'Alex Johnson', points: 1250, avatar: 'https://picsum.photos/id/64/200/200' },
  { id: 'u3', name: 'Maria Garcia', points: 1100, avatar: 'https://picsum.photos/id/65/200/200' },
  { id: 'u4', name: 'James Smith', points: 950, avatar: 'https://picsum.photos/id/68/200/200' },
  { id: 'u5', name: 'Linda Chen', points: 900, avatar: 'https://picsum.photos/id/76/200/200' },
  { id: 'u6', name: 'Michael Brown', points: 850, avatar: 'https://picsum.photos/id/100/200/200' },
];

export const COMMUNITY_POSTS: Post[] = [
  { 
    id: 'p1', 
    author: 'Maria Garcia', 
    avatar: 'https://picsum.photos/id/65/200/200', 
    title: 'Tips for React Performance?', 
    content: 'I am struggling with re-renders in a large list. Any advice on when to use useMemo vs React.memo?', 
    likes: 12, 
    likedBy: [],
    comments: [
        { 
          id: 'c1', 
          author: 'James Smith', 
          avatar: 'https://picsum.photos/id/68/200/200', 
          content: 'Use React.memo for components that render often with same props.', 
          time: '1h ago',
          replies: []
        }
    ], 
    time: '2h ago' 
  },
  { 
    id: 'p2', 
    author: 'James Smith', 
    avatar: 'https://picsum.photos/id/68/200/200', 
    title: 'Just finished the UX Course!', 
    content: 'Highly recommend the Color Theory module. It really changed how I look at interfaces.', 
    likes: 24, 
    likedBy: ['u1'],
    comments: [], 
    time: '5h ago' 
  },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced React Patterns',
    description: 'Master modern React with advanced design patterns, performance optimization, and state management techniques.',
    instructor: 'Sarah Drasner',
    thumbnail: 'https://picsum.photos/id/1/800/600',
    category: 'Development',
    duration: '6h 30m',
    level: 'Advanced',
    rating: 4.8,
    totalStudents: 1234,
    progress: 45,
    isPublished: true,
    modules: [
      {
        id: 'm1',
        title: 'Compound Components',
        lessons: [
          { id: 'l1', title: 'Introduction to Compound Components', type: 'video', duration: '10:00', completed: true },
          { id: 'l2', title: 'Context API usage', type: 'video', duration: '15:00', completed: true },
          { id: 'l3', title: 'Implementation Exercise', type: 'reading', duration: '5:00', completed: false },
        ]
      },
      {
        id: 'm2',
        title: 'Render Props',
        lessons: [
          { id: 'l4', title: 'Why Render Props?', type: 'video', duration: '12:00', completed: false },
          { id: 'l5', title: 'Reusability Patterns', type: 'quiz', duration: '20:00', completed: false },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the core principles of user interface and user experience design to build beautiful applications.',
    instructor: 'Gary Simon',
    thumbnail: 'https://picsum.photos/id/20/800/600',
    category: 'Design',
    duration: '4h 15m',
    level: 'Beginner',
    rating: 4.9,
    totalStudents: 3400,
    progress: 10,
    isPublished: true,
    modules: [
      {
        id: 'm1',
        title: 'Color Theory',
        lessons: [
          { id: 'l1', title: 'Understanding the Color Wheel', type: 'video', duration: '08:00', completed: true },
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Machine Learning Basics',
    description: 'A gentle introduction to the world of AI and Machine Learning using Python.',
    instructor: 'Andrew Ng',
    thumbnail: 'https://picsum.photos/id/48/800/600',
    category: 'Data Science',
    duration: '10h 00m',
    level: 'Beginner',
    rating: 4.7,
    totalStudents: 890,
    progress: 0,
    isPublished: true,
    modules: []
  },
  {
    id: 'c4',
    title: 'Fullstack Next.js',
    description: 'Build production ready apps with the App Router and Server Actions.',
    instructor: 'Lee Robinson',
    thumbnail: 'https://picsum.photos/id/60/800/600',
    category: 'Development',
    duration: '8h 45m',
    level: 'Intermediate',
    rating: 4.9,
    totalStudents: 2100,
    progress: 0,
    isPublished: false,
    modules: []
  }
];