import React, { createContext, useContext, useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'pdf' | 'video' | 'powerpoint';
  duration: number;
  completed: boolean;
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
  createCourse: (course: Omit<Course, 'id' | 'progress' | 'completed'>) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  // const [courses, setCourses] = useState<Course[]>([
  //   {
  //     id: '1',
  //     title: 'Workplace Safety Fundamentals',
  //     description: 'Essential safety protocols and procedures for construction sites',
  //     category: 'Safety',
  //     duration: 120,
  //     progress: 0,
  //     completed: false,
  //     lessons: [
  //       {
  //         id: '1',
  //         title: 'Introduction to Workplace Safety',
  //         content: 'Overview of safety importance and basic concepts',
  //         type: 'powerpoint',
  //         duration: 30,
  //         completed: false
  //       },
  //       {
  //         id: '2',
  //         title: 'Personal Protective Equipment (PPE)',
  //         content: 'Proper use and maintenance of safety equipment',
  //         type: 'video',
  //         duration: 45,
  //         completed: false
  //       },
  //       {
  //         id: '3',
  //         title: 'Hazard Identification',
  //         content: 'Recognizing and reporting workplace hazards',
  //         type: 'pdf',
  //         duration: 45,
  //         completed: false
  //       }
  //     ],
  //     quiz: {
  //       id: '1',
  //       passingScore: 80,
  //       questions: [
  //         {
  //           id: '1',
  //           question: 'What is the minimum requirement for hard hat usage on construction sites?',
  //           options: ['Only when working at heights', 'At all times in work areas', 'Only when machinery is present', 'Only during inspection'],
  //           correctAnswer: 1
  //         },
  //         {
  //           id: '2',
  //           question: 'Who is responsible for workplace safety?',
  //           options: ['Only supervisors', 'Only safety officers', 'Everyone on site', 'Only the company owner'],
  //           correctAnswer: 2
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     id: '2',
  //     title: 'Equipment Operation Certification',
  //     description: 'Training for heavy machinery and equipment operation',
  //     category: 'Equipment',
  //     duration: 180,
  //     progress: 0,
  //     completed: false,
  //     lessons: [
  //       {
  //         id: '4',
  //         title: 'Equipment Safety Check',
  //         content: 'Pre-operation safety inspection procedures',
  //         type: 'powerpoint',
  //         duration: 60,
  //         completed: false
  //       },
  //       {
  //         id: '5',
  //         title: 'Operating Procedures',
  //         content: 'Standard operating procedures for construction equipment',
  //         type: 'video',
  //         duration: 90,
  //         completed: false
  //       },
  //       {
  //         id: '6',
  //         title: 'Maintenance Guidelines',
  //         content: 'Basic maintenance and troubleshooting',
  //         type: 'pdf',
  //         duration: 30,
  //         completed: false
  //       }
  //     ]
  //   }
  // ]);


  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Workplace Safety Fundamentals",
      description:
        "Essential safety protocols and procedures for construction sites",
      category: "Safety",
      duration: 120,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "1",
          title: "Introduction to Workplace Safety",
          content: "Overview of safety importance and basic concepts",
          type: "powerpoint",
          duration: 30,
          completed: false,
        },
        {
          id: "2",
          title: "Personal Protective Equipment (PPE)",
          content: "Proper use and maintenance of safety equipment",
          type: "video",
          duration: 45,
          completed: false,
        },
        {
          id: "3",
          title: "Hazard Identification",
          content: "Recognizing and reporting workplace hazards",
          type: "pdf",
          duration: 45,
          completed: false,
        },
      ],
      quiz: {
        id: "1",
        passingScore: 80,
        questions: [
          {
            id: "1",
            question:
              "What is the minimum requirement for hard hat usage on construction sites?",
            options: [
              "Only when working at heights",
              "At all times in work areas",
              "Only when machinery is present",
              "Only during inspection",
            ],
            correctAnswer: 1,
          },
          {
            id: "2",
            question: "Who is responsible for workplace safety?",
            options: [
              "Only supervisors",
              "Only safety officers",
              "Everyone on site",
              "Only the company owner",
            ],
            correctAnswer: 2,
          },
        ],
      },
    },
    {
      id: "2",
      title: "Equipment Operation Certification",
      description: "Training for heavy machinery and equipment operation",
      category: "Equipment",
      duration: 180,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "4",
          title: "Equipment Safety Check",
          content: "Pre-operation safety inspection procedures",
          type: "powerpoint",
          duration: 60,
          completed: false,
        },
        {
          id: "5",
          title: "Operating Procedures",
          content: "Standard operating procedures for construction equipment",
          type: "video",
          duration: 90,
          completed: false,
        },
        {
          id: "6",
          title: "Maintenance Guidelines",
          content: "Basic maintenance and troubleshooting",
          type: "pdf",
          duration: 30,
          completed: false,
        },
      ],
    },
    {
      id: "3",
      title: "Fire Safety and Emergency Response",
      description:
        "Learn fire prevention measures and emergency evacuation protocols",
      category: "Safety",
      duration: 90,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "7",
          title: "Fire Prevention Basics",
          content: "Identifying fire hazards and prevention techniques",
          type: "pdf",
          duration: 30,
          completed: false,
        },
        {
          id: "8",
          title: "Emergency Evacuation Plans",
          content: "Creating and following evacuation routes",
          type: "powerpoint",
          duration: 30,
          completed: false,
        },
        {
          id: "9",
          title: "Using Fire Extinguishers",
          content: "Types and correct use of fire extinguishers",
          type: "video",
          duration: 30,
          completed: false,
        },
      ],
    },
    {
      id: "4",
      title: "First Aid for Construction Sites",
      description:
        "Essential first aid knowledge tailored for construction environments",
      category: "Health",
      duration: 120,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "10",
          title: "Assessing the Situation",
          content: "Quick assessment and ensuring personal safety",
          type: "pdf",
          duration: 30,
          completed: false,
        },
        {
          id: "11",
          title: "Basic Life Support",
          content: "CPR and emergency breathing techniques",
          type: "video",
          duration: 45,
          completed: false,
        },
        {
          id: "12",
          title: "Treating Common Injuries",
          content: "Managing cuts, burns, and fractures",
          type: "powerpoint",
          duration: 45,
          completed: false,
        },
      ],
    },
    {
      id: "5",
      title: "Electrical Safety Awareness",
      description: "Guidelines for safe work around electrical installations",
      category: "Electrical",
      duration: 100,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "13",
          title: "Understanding Electrical Hazards",
          content: "Common risks and preventive measures",
          type: "video",
          duration: 40,
          completed: false,
        },
        {
          id: "14",
          title: "Lockout/Tagout Procedures",
          content: "Preventing accidental energization during maintenance",
          type: "pdf",
          duration: 30,
          completed: false,
        },
        {
          id: "15",
          title: "Safe Equipment Handling",
          content: "Handling electrical tools and cords safely",
          type: "powerpoint",
          duration: 30,
          completed: false,
        },
      ],
    },
    {
      id: "6",
      title: "Manual Handling and Ergonomics",
      description:
        "Best practices for lifting, carrying, and posture in the workplace",
      category: "Health",
      duration: 75,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "16",
          title: "Principles of Safe Lifting",
          content: "Techniques to avoid injury",
          type: "video",
          duration: 25,
          completed: false,
        },
        {
          id: "17",
          title: "Ergonomic Work Practices",
          content: "Workplace setups to prevent strain",
          type: "pdf",
          duration: 25,
          completed: false,
        },
        {
          id: "18",
          title: "Team Lifting and Equipment Use",
          content: "When and how to lift with others or use aids",
          type: "powerpoint",
          duration: 25,
          completed: false,
        },
      ],
    },
    {
      id: "7",
      title: "Confined Space Entry Training",
      description: "Safe procedures for working in confined or enclosed spaces",
      category: "Specialized",
      duration: 150,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "19",
          title: "Hazards in Confined Spaces",
          content: "Understanding oxygen deficiency, toxins, and fire risks",
          type: "pdf",
          duration: 50,
          completed: false,
        },
        {
          id: "20",
          title: "Entry Permits and Procedures",
          content: "Documentation and approval before entry",
          type: "powerpoint",
          duration: 50,
          completed: false,
        },
        {
          id: "21",
          title: "Emergency Rescue Readiness",
          content: "Preparing for and executing confined space rescues",
          type: "video",
          duration: 50,
          completed: false,
        },
      ],
    },
    {
      id: "8",
      title: "Working at Heights Certification",
      description:
        "Safety techniques for scaffolding, ladders, and elevated platforms",
      category: "Safety",
      duration: 130,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "22",
          title: "Fall Hazards and Prevention",
          content: "Identifying and minimizing fall risks",
          type: "video",
          duration: 45,
          completed: false,
        },
        {
          id: "23",
          title: "Harness Use and Inspection",
          content: "Proper use and maintenance of fall arrest systems",
          type: "pdf",
          duration: 45,
          completed: false,
        },
        {
          id: "24",
          title: "Safe Ladder Practices",
          content: "Correct setup and usage of ladders",
          type: "powerpoint",
          duration: 40,
          completed: false,
        },
      ],
    },
    {
      id: "9",
      title: "Site Environmental Awareness",
      description: "Environmental protection responsibilities on site",
      category: "Environment",
      duration: 90,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "25",
          title: "Waste Management",
          content: "Reducing, reusing, and proper disposal of materials",
          type: "pdf",
          duration: 30,
          completed: false,
        },
        {
          id: "26",
          title: "Pollution Prevention",
          content: "Avoiding contamination of air, soil, and water",
          type: "video",
          duration: 30,
          completed: false,
        },
        {
          id: "27",
          title: "Sustainable Practices",
          content: "Eco-friendly practices in construction",
          type: "powerpoint",
          duration: 30,
          completed: false,
        },
      ],
    },
    {
      id: "10",
      title: "Toolbox Talk Facilitation",
      description: "How to lead effective safety briefings on site",
      category: "Leadership",
      duration: 60,
      progress: 0,
      completed: false,
      lessons: [
        {
          id: "28",
          title: "Planning a Toolbox Talk",
          content: "Selecting topics and preparing materials",
          type: "pdf",
          duration: 20,
          completed: false,
        },
        {
          id: "29",
          title: "Engaging Your Audience",
          content: "Techniques for effective communication",
          type: "video",
          duration: 20,
          completed: false,
        },
        {
          id: "30",
          title: "Following Up and Recording Attendance",
          content: "Documenting and assessing talk effectiveness",
          type: "powerpoint",
          duration: 20,
          completed: false,
        },
      ],
    },
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const getCourse = (id: string) => courses.find(course => course.id === id);

  const updateLessonProgress = (courseId: string, lessonId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          );
          const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
          const progress = (completedLessons / updatedLessons.length) * 100;
          
          return {
            ...course,
            lessons: updatedLessons,
            progress
          };
        }
        return course;
      })
    );
  };

  const completeCourse = (courseId: string, score?: number): string => {
    const certificateId = Date.now().toString();
    const course = courses.find(c => c.id === courseId);
    
    if (course) {
      // Update course completion
      setCourses(prevCourses => 
        prevCourses.map(c => 
          c.id === courseId ? { ...c, completed: true, certificateId } : c
        )
      );

      // Create certificate
      const certificate: Certificate = {
        id: certificateId,
        userId: '1', // This would come from auth context
        courseId,
        courseName: course.title,
        completedAt: new Date(),
        score
      };
      
      setCertificates(prev => [...prev, certificate]);
    }
    
    return certificateId;
  };

  const createCourse = (courseData: Omit<Course, 'id' | 'progress' | 'completed'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      progress: 0,
      completed: false
    };
    setCourses(prev => [...prev, newCourse]);
  };

  return (
    <CourseContext.Provider value={{
      courses,
      certificates,
      getCourse,
      updateLessonProgress,
      completeCourse,
      createCourse
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}