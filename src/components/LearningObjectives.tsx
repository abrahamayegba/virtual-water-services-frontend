import { CourseObjective } from "@/types/types";
import { CheckCircle } from "lucide-react";
import React from "react";

interface LearningObjectivesProps {
  objectives: CourseObjective[];
}

const LearningObjectives: React.FC<LearningObjectivesProps> = ({
  objectives,
}) => {
  if (objectives.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Learning Objectives
      </h3>
      <ul className="text-sm text-gray-600 space-y-2">
        {objectives.map((obj) => (
          <li key={obj.id} className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{obj.objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningObjectives;
