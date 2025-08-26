import React, { createContext, useContext, useState } from "react";

interface Lesson {
  id: string;
  title: string;
  content: string;
  type: "pdf" | "video" | "powerpoint";
  duration: number;
  completed: boolean;
  file?: File | string | null;
}

interface Quiz {
  id: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  passingScore: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  lessons: Lesson[];
  quiz?: Quiz;
  progress: number;
  completed: boolean;
  certificateId?: string;
  objectives?: string[]; // optional
}

interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  completedAt: Date;
  score?: number;
}

interface CourseContextType {
  courses: Course[];
  certificates: Certificate[];
  getCourse: (id: string) => Course | undefined;
  updateLessonProgress: (courseId: string, lessonId: string) => void;
  completeCourse: (courseId: string, score?: number) => string;
  createCourse: (course: Omit<Course, "id" | "progress" | "completed">) => void;
  updateCourse: (
    courseId: string,
    course: Omit<Course, "id" | "progress" | "completed">
  ) => void;
  deleteCourse: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "11",
      title: "Legionella Awareness Training",
      description:
        "Gain the knowledge and skills to carry out regular water hygiene checks and record-keeping to ensure safe water systems. This course covers key monitoring points, interpreting results, and taking corrective action to prevent contamination and meet compliance standards.",
      category: "Water Hygiene",
      duration: 90,
      progress: 0,
      completed: false,
      objectives: [
        "Understand water hygiene regulations",
        "Identify key monitoring points",
        "Accurately record and report results",
        "Take corrective action when needed",
      ],
      lessons: [
        {
          id: "31",
          title: "Water Quality Management Within The Built Environment",
          content: "Understanding the regulations and monitoring requirements",
          type: "pdf",
          duration: 30,
          completed: false,
        },
        // {
        //   id: "32",
        //   title: "Key Monitoring Points",
        //   content: "Identifying and assessing critical water system locations",
        //   type: "powerpoint",
        //   duration: 30,
        //   completed: false,
        // },
        // {
        //   id: "33",
        //   title: "Recording and Reporting Results",
        //   content: "Accurate documentation and escalation procedures",
        //   type: "video",
        //   duration: 30,
        //   completed: false,
        // },
      ],
      quiz: {
        id: "2",
        passingScore: 80,
        questions: [
          {
            id: "3",
            question: "Why is regular water hygiene monitoring important?",
            options: [
              "To make water taste better",
              "To ensure system efficiency",
              "To prevent contamination and meet regulations",
              "To reduce maintenance costs",
            ],
            correctAnswer: 2,
          },
          // {
          //   id: "4",
          //   question: "What should be done if test results exceed limits?",
          //   options: [
          //     "Ignore and retest later",
          //     "Immediately take corrective action",
          //     "Switch off the water supply permanently",
          //     "Only report to senior management",
          //   ],
          //   correctAnswer: 1,
          // },
        ],
      },
    },
    {
      id: "12",
      title: "Temperature Monitoring",
      description:
        "Learn how to measure, record, and interpret water temperatures to reduce the risk of Legionella growth. This course includes proper thermometer use, identifying temperature risks, and taking corrective measures when readings fall outside safe ranges.",
      category: "Water Hygiene",
      duration: 60,
      progress: 0,
      completed: false,
      objectives: [
        "Know safe temperature ranges",
        "Use thermometers correctly",
        "Respond to unsafe temperatures",
      ],
      lessons: [
        {
          id: "34",
          title: "Safe Temperature Ranges",
          content: "Understanding hot and cold water safety thresholds",
          type: "powerpoint",
          duration: 20,
          completed: false,
        },
        // {
        //   id: "35",
        //   title: "Using Thermometers Correctly",
        //   content: "Best practices for accurate temperature measurement",
        //   type: "video",
        //   duration: 20,
        //   completed: false,
        // },
        // {
        //   id: "36",
        //   title: "Responding to Unsafe Temperatures",
        //   content: "Actions to take when readings are outside safe limits",
        //   type: "pdf",
        //   duration: 20,
        //   completed: false,
        // },
      ],
      quiz: {
        id: "3",
        passingScore: 80,
        questions: [
          {
            id: "5",
            question: "What is the minimum safe temperature for hot water?",
            options: ["30°C", "50°C", "60°C", "70°C"],
            correctAnswer: 2,
          },
          {
            id: "6",
            question: "When should temperature monitoring be performed?",
            options: [
              "Only during winter",
              "Once a year",
              "At scheduled intervals based on risk assessment",
              "Only if Legionella is detected",
            ],
            correctAnswer: 2,
          },
        ],
      },
    },
    {
      id: "13",
      title: "Showerhead Cleaning & Disinfection (C&D)",
      description:
        "Master the techniques for effective cleaning and disinfection of showerheads to prevent bacterial growth and ensure user safety. This course covers frequency, approved cleaning agents, and step-by-step procedures.",
      category: "Water Hygiene",
      duration: 75,
      progress: 0,
      completed: false,
      objectives: [
        "Understand why C&D is important",
        "Perform cleaning procedures",
        "Apply safe disinfection techniques",
      ],
      lessons: [
        {
          id: "37",
          title: "Why Showerhead C&D is Important",
          content: "Understanding biofilm risks and Legionella prevention",
          type: "pdf",
          duration: 25,
          completed: false,
        },
        // {
        //   id: "38",
        //   title: "Cleaning Procedures",
        //   content: "Step-by-step process for removing scale and debris",
        //   type: "video",
        //   duration: 25,
        //   completed: false,
        // },
        // {
        //   id: "39",
        //   title: "Disinfection Techniques",
        //   content: "Using approved chemicals and safe handling practices",
        //   type: "powerpoint",
        //   duration: 25,
        //   completed: false,
        // },
      ],
      quiz: {
        id: "4",
        passingScore: 80,
        questions: [
          {
            id: "7",
            question:
              "How often should showerheads be cleaned and disinfected?",
            options: [
              "Every month",
              "Every 3 months or as per risk assessment",
              "Every year",
              "Only when visibly dirty",
            ],
            correctAnswer: 1,
          },
          {
            id: "8",
            question: "What is the main risk of not performing C&D?",
            options: [
              "Reduced water pressure",
              "Increased risk of Legionella",
              "Damage to plumbing",
              "Increased water bills",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "14",
      title: "Water Sampling",
      description:
        "Develop skills to collect, store, and transport water samples for laboratory analysis. This course covers correct sampling points, avoiding contamination, and understanding results for effective water safety management.",
      category: "Water Hygiene",
      duration: 90,
      progress: 0,
      completed: false,
      objectives: [
        "Understand the purpose of water sampling",
        "Follow proper sampling procedures",
        "Interpret laboratory results accurately",
      ],
      lessons: [
        {
          id: "40",
          title: "Purpose of Water Sampling",
          content: "Understanding when and why to take samples",
          type: "pdf",
          duration: 30,
          completed: false,
        },
        // {
        //   id: "41",
        //   title: "Sampling Procedures",
        //   content: "Best practices for accurate and uncontaminated samples",
        //   type: "video",
        //   duration: 30,
        //   completed: false,
        // },
        // {
        //   id: "42",
        //   title: "Interpreting Lab Results",
        //   content: "Understanding reports and corrective actions",
        //   type: "powerpoint",
        //   duration: 30,
        //   completed: false,
        // },
      ],
      quiz: {
        id: "5",
        passingScore: 80,
        questions: [
          {
            id: "9",
            question: "Why is proper water sampling technique important?",
            options: [
              "To save time",
              "To avoid contaminating the sample",
              "To make water taste better",
              "To reduce costs",
            ],
            correctAnswer: 1,
          },
          {
            id: "10",
            question: "Where should water samples typically be taken?",
            options: [
              "From any convenient tap",
              "From designated high-risk locations",
              "From storage tanks only",
              "From the boiler",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "15",
      title: "Tank Inspection",
      description:
        "Learn how to safely inspect cold water storage tanks for cleanliness, structural integrity, and compliance with hygiene standards. Includes identifying contamination risks and recording inspection results.",
      category: "Water Hygiene",
      duration: 75,
      progress: 0,
      completed: false,
      objectives: [
        "Understand inspection requirements",
        "Assess tank condition",
        "Record and report findings",
      ],
      lessons: [
        {
          id: "43",
          title: "Inspection Requirements",
          content: "Legal and best practice guidelines for tank checks",
          type: "pdf",
          duration: 25,
          completed: false,
        },
        // {
        //   id: "44",
        //   title: "Assessing Tank Condition",
        //   content: "Spotting damage, corrosion, and contamination risks",
        //   type: "video",
        //   duration: 25,
        //   completed: false,
        // },
        // {
        //   id: "45",
        //   title: "Reporting and Record Keeping",
        //   content: "Documenting inspections for compliance",
        //   type: "powerpoint",
        //   duration: 25,
        //   completed: false,
        // },
      ],
      quiz: {
        id: "6",
        passingScore: 80,
        questions: [
          {
            id: "11",
            question:
              "What should be done if a tank inspection reveals contamination?",
            options: [
              "Ignore until the next inspection",
              "Clean and disinfect immediately",
              "Replace the entire tank",
              "Report but take no action",
            ],
            correctAnswer: 1,
          },
          {
            id: "12",
            question:
              "How often should tanks be inspected according to most guidelines?",
            options: [
              "Every week",
              "Every 6 months or as per risk assessment",
              "Every 5 years",
              "Only after repairs",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "16",
      title: "Closed Systems Training",
      description:
        "Understand the operation, treatment, and maintenance of closed water systems to prevent corrosion, scaling, and microbiological growth. This course covers system types, treatment chemicals, and monitoring strategies.",
      category: "Water Hygiene",
      duration: 120,
      progress: 0,
      completed: false,
      objectives: [
        "Understand closed system fundamentals",
        "Apply correct water treatment",
        "Monitor and maintain system health",
      ],
      lessons: [
        {
          id: "46",
          title: "Closed System Fundamentals",
          content: "How closed systems operate and common issues",
          type: "powerpoint",
          duration: 40,
          completed: false,
        },
        // {
        //   id: "47",
        //   title: "Water Treatment in Closed Systems",
        //   content: "Using chemicals to control corrosion and scaling",
        //   type: "video",
        //   duration: 40,
        //   completed: false,
        // },
        // {
        //   id: "48",
        //   title: "Monitoring and Maintenance",
        //   content: "Regular checks to keep systems efficient and safe",
        //   type: "pdf",
        //   duration: 40,
        //   completed: false,
        // },
      ],
      quiz: {
        id: "7",
        passingScore: 80,
        questions: [
          {
            id: "13",
            question: "What is one key risk in untreated closed systems?",
            options: [
              "Loss of water pressure",
              "Corrosion and scaling",
              "Excessive water use",
              "Poor taste",
            ],
            correctAnswer: 1,
          },
          {
            id: "14",
            question:
              "How often should water quality in closed systems be checked?",
            options: [
              "Only after installation",
              "At regular intervals based on manufacturer guidelines",
              "Once every 5 years",
              "Never",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const getCourse = (id: string) => courses.find((course) => course.id === id);

  const updateLessonProgress = (courseId: string, lessonId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          );
          const completedLessons = updatedLessons.filter(
            (lesson) => lesson.completed
          ).length;
          const progress = (completedLessons / updatedLessons.length) * 100;

          return {
            ...course,
            lessons: updatedLessons,
            progress,
          };
        }
        return course;
      })
    );
  };

  const completeCourse = (courseId: string, score?: number): string => {
    const certificateId = Date.now().toString();
    const course = courses.find((c) => c.id === courseId);

    if (course) {
      // Update course completion
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === courseId ? { ...c, completed: true, certificateId } : c
        )
      );

      // Create certificate
      const certificate: Certificate = {
        id: certificateId,
        userId: "1", // This would come from auth context
        courseId,
        courseName: course.title,
        completedAt: new Date(),
        score,
      };

      setCertificates((prev) => [...prev, certificate]);
    }

    return certificateId;
  };

  const createCourse = (
    courseData: Omit<Course, "id" | "progress" | "completed">
  ) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      progress: 0,
      completed: false,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (
    courseId: string,
    courseData: Omit<Course, "id" | "progress" | "completed">
  ) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, ...courseData } : course
      )
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };
  return (
    <CourseContext.Provider
      value={{
        courses,
        certificates,
        getCourse,
        updateLessonProgress,
        completeCourse,
        createCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
