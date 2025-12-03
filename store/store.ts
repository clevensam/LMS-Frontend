import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Course, Achievement, Lesson, Submission, Post, Comment, Certificate, CalendarEvent } from '../types';
import { MOCK_USER, COURSES, ACHIEVEMENTS, COMMUNITY_POSTS } from '../constants';

// --- Auth Slice ---
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
        if (state.user) {
            state.user = { ...state.user, ...action.payload };
        }
    }
  },
});

export const { login, logout, updateUser } = authSlice.actions;

// --- Course Slice ---
interface CourseState {
  catalog: Course[];
  enrolled: Course[];
  currentCourse: Course | null;
  submissions: Submission[];
  filter: string;
}

const initialCourseState: CourseState = {
  catalog: COURSES,
  enrolled: COURSES.filter(c => (c.progress ?? 0) > 0),
  currentCourse: null,
  submissions: [
      {
          id: 's1',
          lessonId: 'l100',
          studentId: 'u1',
          studentName: 'Alex Johnson',
          submittedAt: new Date().toISOString(),
          content: 'Here is my essay on React Hooks.',
          status: 'pending'
      }
  ],
  filter: 'All',
};

const courseSlice = createSlice({
  name: 'courses',
  initialState: initialCourseState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<string>) => {
      state.currentCourse = state.catalog.find(c => c.id === action.payload) || null;
    },
    enrollCourse: (state, action: PayloadAction<string>) => {
      const course = state.catalog.find(c => c.id === action.payload);
      if (course && !state.enrolled.find(c => c.id === course.id)) {
        const enrolledCourse = { ...course, progress: 0 };
        state.enrolled.push(enrolledCourse);
      }
    },
    updateProgress: (state, action: PayloadAction<{courseId: string, progress: number}>) => {
        const course = state.catalog.find(c => c.id === action.payload.courseId);
        const enrolledCourse = state.enrolled.find(c => c.id === action.payload.courseId);
        
        if (course) {
            course.progress = action.payload.progress;
        }
        if (enrolledCourse) {
            enrolledCourse.progress = action.payload.progress;
        } else if (course && action.payload.progress > 0) {
             state.enrolled.push(course);
        }
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.catalog.unshift(action.payload);
    },
    addModule: (state, action: PayloadAction<{courseId: string, title: string}>) => {
        const course = state.catalog.find(c => c.id === action.payload.courseId);
        if (course) {
            const newModule = {
                id: `m${Date.now()}`,
                title: action.payload.title,
                lessons: []
            };
            course.modules.push(newModule);
        }
    },
    addLesson: (state, action: PayloadAction<{courseId: string, moduleId: string, lesson: Lesson}>) => {
         const course = state.catalog.find(c => c.id === action.payload.courseId);
         if (course) {
             const module = course.modules.find(m => m.id === action.payload.moduleId);
             if (module) {
                 module.lessons.push(action.payload.lesson);
             }
         }
    },
    togglePublish: (state, action: PayloadAction<{courseId: string, isPublished: boolean}>) => {
        const course = state.catalog.find(c => c.id === action.payload.courseId);
        if (course) {
            course.isPublished = action.payload.isPublished;
        }
    },
    submitAssignment: (state, action: PayloadAction<Submission>) => {
        state.submissions.push(action.payload);
    },
    gradeSubmission: (state, action: PayloadAction<{id: string, grade: number, feedback: string}>) => {
        const sub = state.submissions.find(s => s.id === action.payload.id);
        if (sub) {
            sub.status = 'graded';
            sub.grade = action.payload.grade;
            sub.feedback = action.payload.feedback;
        }
    }
  },
});

export const { setFilter, setCurrentCourse, enrollCourse, updateProgress, addCourse, addModule, addLesson, togglePublish, submitAssignment, gradeSubmission } = courseSlice.actions;

// --- Gamification Slice ---
interface GamificationState {
  points: number;
  badges: Achievement[];
}

const initialGamificationState: GamificationState = {
  points: MOCK_USER.points,
  badges: ACHIEVEMENTS.filter(a => MOCK_USER.badges.includes(a.id)),
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState: initialGamificationState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
  },
});

export const { addPoints } = gamificationSlice.actions;

// --- Community Slice ---
interface CommunityState {
  posts: Post[];
}

const initialCommunityState: CommunityState = {
  posts: COMMUNITY_POSTS,
};

const communitySlice = createSlice({
  name: 'community',
  initialState: initialCommunityState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    toggleLike: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
            const index = post.likedBy.indexOf(action.payload.userId);
            if (index > -1) {
                post.likedBy.splice(index, 1);
                post.likes--;
            } else {
                post.likedBy.push(action.payload.userId);
                post.likes++;
            }
        }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
            if (!post.comments) post.comments = [];
            post.comments.push(action.payload.comment);
        }
    },
    addReply: (state, action: PayloadAction<{ postId: string; commentId: string; reply: Comment }>) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
            const comment = post.comments.find(c => c.id === action.payload.commentId);
            if (comment) {
                if (!comment.replies) comment.replies = [];
                comment.replies.push(action.payload.reply);
            }
        }
    },
  },
});

export const { addPost, toggleLike, addComment, addReply } = communitySlice.actions;

// --- Admin Slice ---
interface AdminState {
  certificates: Certificate[];
  events: CalendarEvent[];
}

const initialAdminState: AdminState = {
  certificates: [
    { id: 'cert1', studentName: 'Maria Garcia', courseTitle: 'UI/UX Design Fundamentals', issueDate: '2023-10-10', code: 'MUST-UI-2023-001' }
  ],
  events: [
    { id: 'ev1', title: 'System Maintenance', date: '2023-10-28', type: 'maintenance' },
    { id: 'ev2', title: 'End of Semester Exams', date: '2023-11-15', type: 'exam' },
    { id: 'ev3', title: 'Public Holiday', date: '2023-12-09', type: 'holiday' }
  ]
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialAdminState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    issueCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload);
    }
  }
});

export const { addEvent, issueCertificate } = adminSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    courses: courseSlice.reducer,
    gamification: gamificationSlice.reducer,
    community: communitySlice.reducer,
    admin: adminSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;