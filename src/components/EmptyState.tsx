import { EmptyStateProps } from "@/types/types";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            action.variant === "secondary"
              ? "bg-gray-500 text-white hover:bg-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {action.label}
        </button>
      )}

      {children}
    </div>
  );
}
