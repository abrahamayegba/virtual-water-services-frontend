import React from "react";
import type { Certificate } from "@/types/types";
import { Award, Calendar, FileText } from "lucide-react";

interface CertificatePreviewProps {
  certificate: Certificate;
  userName: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  certificate,
  userName,
}) => (
  <div className="bg-white border-4 border-blue-500 rounded-lg p-8 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

    <div className="text-center">
      <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        CERTIFICATE OF COMPLETION
      </h3>
      <p className="text-gray-600 mb-4">Safety Training Certification</p>

      <p className="text-gray-700 mb-2">This is to certify that</p>
      <h4 className="text-xl font-bold text-blue-600 mb-2">{userName}</h4>
      <p className="text-gray-700 mb-4">
        has successfully completed the course
      </p>

      <h5 className="text-lg font-bold text-gray-900 mb-4">
        "{certificate.courseName}"
      </h5>

      {/* <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 mb-4">
        <div className="text-center">
          <Calendar className="h-4 w-4 mx-auto mb-1" />
          <p className="font-medium">Date Completed</p>
          <p>{certificate.completedAt.toLocaleDateString()}</p>
        </div>

        {certificate.score && (
          <div className="text-center">
            <Award className="h-4 w-4 mx-auto mb-1" />
            <p className="font-medium">Score</p>
            <p>{certificate.score}%</p>
          </div>
        )}

        <div className="text-center">
          <FileText className="h-4 w-4 mx-auto mb-1" />
          <p className="font-medium">Certificate ID</p>
          <p className="font-mono text-xs">{certificate.id}</p>
        </div>
      </div> */}

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">Virtual Water Services Ltd</p>
        <p className="text-xs text-gray-500">Certification Authority</p>
      </div>
    </div>
  </div>
);
