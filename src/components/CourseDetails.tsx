import React from "react";

interface CourseDetailsProps {
  duration: string | number;
  lessonsCount: number;
  category: string;
  certificate?: boolean;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  duration,
  lessonsCount,
  category,
  certificate = true,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Course Details</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Duration</span>
          <span className="font-medium">
            {duration} {typeof duration === "number" ? "min" : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Lessons</span>
          <span className="font-medium">{lessonsCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Category</span>
          <span className="font-medium">{category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Certificate</span>
          <span className="font-medium">
            {certificate ? "Included" : "Not Included"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
