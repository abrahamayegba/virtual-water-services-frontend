import { LucideIcon } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  companyId: string;
  roleId: string;
  avatar?: string;
  passwordHash?: string | null;
  passwordSetAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonType {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCourseLesson {
  id: string;
  userCourseId: string;
  title: string;
  type?: LessonType;
  lessonId: string;
  startedAt?: string | null; // ISO date string
  spentTime: number;
  completed: boolean;
  completedAt?: string | null;
  lesson: {
    id: string;
    title: string;
    content: string;
    typeId: number;
    duration: number;
    file?: string | null;
    courseId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  duration: number;
  category?: {
    id: string;
    categoryName: string;
  };
  Quizzes: Quiz[];
  Lessons: Lesson[];
  completed?: boolean;
  progress?: number;
}

export interface CourseObjective {
  id: string;
  objective: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCourse {
  id: string;
  courseId: string;
  score: string;
  completed: boolean;
  progress: number;
  course: Course;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  courseName: string;
  completedAt: Date;
  score: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  typeId: number;
  duration?: number;
  file: string | null;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  type: {
    id: number;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  progress: {
    lessonId: string;
    completed: boolean;
    startedAt: string;
    spentTime: number;
    completedAt?: string;
  };
}

export interface CourseCategory {
  id: string;
  categoryName: string;
}

export interface CourseCategoryResponse {
  success: boolean;
  category: CourseCategory;
}

// Question option
export interface QuestionOption {
  id: string;
  option: string;
  isCorrect: boolean;
  questionId: string;
  createdAt: string;
  updatedAt: string;
}

// Quiz question
export interface Question {
  id: string;
  question: string;
  quizId: string;
  Options: QuestionOption[];
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  companyName: string;
  companyEmail: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  // other fields as needed
}

export interface Role {
  id: string;
  roleName: string;
  roleDescription: string;
  createdAt: string;
  updatedAt: string;
  // other fields as needed
}

// Quiz
export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  course: Course;
  passingScore: number;
  Questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export type Option = {
  id: string;
  option: string;
  isCorrect: boolean;
  questionId: string;
};

// API response wrapper
export interface GetQuizResponse {
  success: boolean;
  quizzes: Quiz[];
}

export interface QuizOption {
  id: string;
  text: string;
}

// Frontend-friendly Question
export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: number; // index of correct option
}

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  children?: React.ReactNode;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string;
  maxSize?: number; // in MB
  currentFile?: File | string;
  onRemove?: () => void;
  label: string;
}

export interface PDFViewerProps {
  file: string; // Path or URL to PDF
  title: string;
}

export interface QuizResultsProps {
  passed: boolean;
  score: number;
  correctAnswers: number;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  quizPassingScore: number;
  courseId: string;
  onRetake: () => void;
}

export interface RecentCertificatesAndProgressProps {
  certificates: Certificate[];
  completedCoursesCount: number;
  userCoursesCount: number;
  userId: string; // Add userId
}

export interface VideoPlayerProps {
  src: string | File;
  title?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<User | null>; // changed here
  register: (userData: {
    name: string;
    email: string;
    password: string;
    companyId: string;
    roleId: string;
  }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface CourseObjectivesResponse {
  success: boolean;
  objectives: CourseObjective[];
};

export interface LoginResponse {
  success: boolean;
  user: User | null;
  accessToken?: string;
  sessionId?: string;
}

