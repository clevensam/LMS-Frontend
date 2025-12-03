export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  points: number;
  level: number;
  badges: string[];
  bio?: string;
  department?: string;
  phone?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  totalStudents: number;
  modules: CourseModule[];
  progress?: number; // 0-100
  isPublished?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'reading' | 'assignment';
  duration: string;
  completed: boolean;
  questions?: QuizQuestion[];
  assignmentInstructions?: string;
  videoUrl?: string; // Added for YouTube videos
  content?: string; // Added for reading content
}

// In ../types.ts
export interface Submission {
  id: string;
  lessonId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  fileName?: string;
  status: 'pending' | 'reviewed' | 'graded'; // Add all your statuses here
  grade?: number;
  feedback?: string;
}
export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  likedBy: string[]; // Array of user IDs
  comments: Comment[];
  time: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  code: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'course' | 'exam' | 'holiday' | 'maintenance';
  description?: string;
}