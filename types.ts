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
  completed?: boolean;
  content?: string; // Markdown or video URL
  questions?: QuizQuestion[]; // For quizzes
  assignmentInstructions?: string; // For assignments
}

export interface Submission {
  id: string;
  lessonId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content?: string; // Text submission
  fileUrl?: string; // Uploaded file
  fileName?: string;
  status: 'pending' | 'graded';
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