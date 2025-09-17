import { QuizResultsProps } from "@/types/types";
import { Award, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const QuizResults: React.FC<QuizResultsProps> = ({
  passed,
  score,
  correctAnswers,
  questions,
  answers,
  quizPassingScore,
  courseId,
  onRetake,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <Award className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? "Congratulations!" : "Quiz Incomplete"}
            </h1>
            <p className="text-lg text-gray-600">
              {passed
                ? "You have successfully passed the quiz!"
                : `You scored ${score}%. You need ${quizPassingScore}% to pass.`}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{score}%</p>
                <p className="text-sm text-gray-600">Final Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {correctAnswers}
                </p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {questions.length - correctAnswers}
                </p>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {quizPassingScore}%
                </p>
                <p className="text-sm text-gray-600">Required</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Question Review
            </h3>
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const userAnswerIndex = question.options.findIndex(
                (opt) => opt.id === userAnswer
              );
              const isCorrect = userAnswerIndex === question.correctAnswer;
              const showCorrectAnswer = isCorrect;

              return (
                <div key={question.id} className="border rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              showCorrectAnswer &&
                              optionIndex === question.correctAnswer
                                ? "bg-green-50 border-green-200 text-green-900"
                                : optionIndex === userAnswerIndex && !isCorrect
                                ? "bg-red-50 border-red-200 text-red-900"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span>{option.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              to={`/course/${courseId}`}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Review Course
            </Link>
            <button
              onClick={onRetake}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizResults;
