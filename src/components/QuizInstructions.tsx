import { AlertTriangle } from "lucide-react";
import React from "react";

interface QuizInstructionsProps {
  passingScore: number;
}

const QuizInstructions: React.FC<QuizInstructionsProps> = ({
  passingScore,
}) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-900 mb-2">Quiz Instructions</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• You have 5 minutes to complete the quiz</li>
            <li>• You need {passingScore}% or higher to pass</li>
            <li>• You can retake the quiz if you don't pass</li>
            <li>• Select the best answer for each question</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
