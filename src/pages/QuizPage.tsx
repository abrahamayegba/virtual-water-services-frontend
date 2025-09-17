import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Clock } from "lucide-react";
import { Question, Option, QuizQuestion, QuizOption } from "@/types/types";
import QuizInstructions from "@/components/QuizInstructions";
import QuizResults from "@/components/QuizResults";
import { updateUserCourseByUserId } from "@/api/userCourses";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import { useQuizByCourseId } from "@/hooks/useUserCourses";

export default function QuizPage() {
  const { courseId, userCourseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { quiz, isLoading } = useQuizByCourseId(courseId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const questions: QuizQuestion[] = quiz?.Questions
    ? quiz.Questions.map((q: Question) => {
        const options: QuizOption[] = q.Options.map((opt) => ({
          id: opt.id,
          text: opt.option,
        }));

        const correctAnswerIndex = options.findIndex(
          (opt) => opt.id === q.Options.find((o) => o.isCorrect)?.id
        );

        return {
          id: q.id,
          question: q.question,
          options,
          correctAnswer: correctAnswerIndex,
        };
      })
    : [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!quiz || !quiz.Questions) {
    return <div>Quiz not found</div>;
  }

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmitQuiz = async () => {
    const correctAnswers = questions.reduce((count, question) => {
      const userAnswerIndex = question.options.findIndex(
        (opt) => opt.id === answers[question.id]
      );

      return count + (userAnswerIndex === question.correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= quiz.passingScore;
    if (!userCourseId) {
      throw new Error("UserCourse not found for this course");
    }

    if (passed) {
      await updateUserCourseByUserId(user!.id, userCourseId, {
        courseId,
        score,
        completed: true,
      });
      navigate(`/certificate?userId=${user!.id}&courseId=${courseId}`);
    } else {
      setShowResults(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const correctAnswers = questions.reduce((count, question) => {
    // Find the index of the selected option ID in the options array
    const userSelectedIndex = question.options.findIndex(
      (opt) => opt.id === answers[question.id]
    );

    // Compare indices
    return count + (userSelectedIndex === question.correctAnswer ? 1 : 0);
  }, 0);

  const score = Math.round((correctAnswers / questions.length) * 100);
  const passed = score >= quiz.passingScore;

  const currentQuestionItem = quiz.Questions[currentQuestion];
  if (!currentQuestionItem) {
    return <div>Invalid question selected</div>;
  }

  if (showResults) {
    return (
      <QuizResults
        passed={passed}
        score={score}
        correctAnswers={correctAnswers}
        questions={questions}
        answers={answers}
        quizPassingScore={quiz.passingScore}
        courseId={courseId!}
        onRetake={() => {
          setAnswers({});
          setCurrentQuestion(0);
          setShowResults(false);
          setTimeLeft(300);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Final Assessment
              </h1>
              <p className="text-gray-600">{quiz.course.title}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span className="font-mono font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.Questions.length}
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) / quiz.Questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {currentQuestion === 0 && Object.keys(answers).length === 0 && (
          <QuizInstructions passingScore={quiz?.passingScore} />
        )}

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            {currentQuestionItem.question}
          </h2>

          <div className="space-y-3">
            {currentQuestionItem.Options.map(
              (option: Option, index: number) => (
                <button
                  key={option.id}
                  onClick={() =>
                    handleAnswerSelect(currentQuestionItem.id, option.id)
                  }
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    answers[currentQuestionItem.id] === option.id
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestionItem.id] === option.id
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[currentQuestionItem.id] === option.id && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option.option}</span>
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {quiz.Questions.map((q: Question, index: number) => (
              <div
                key={q.id}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestion
                    ? "bg-blue-500"
                    : answers[q.id] !== undefined
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          {currentQuestion === quiz.Questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(answers).length !== quiz.Questions.length}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              disabled={
                !answers.hasOwnProperty(quiz.Questions[currentQuestion].id)
              }
              onClick={() =>
                setCurrentQuestion(
                  Math.min(quiz.Questions.length - 1, currentQuestion + 1)
                )
              }
              className="px-6 disabled:cursor-not-allowed disabled:opacity-50 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
