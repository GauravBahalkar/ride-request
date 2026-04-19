import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  } | React.ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 h-full w-full">
      <SearchX className="w-12 h-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-sm">{description}</p>
      {action && (
        <div>
          {typeof action === 'object' && 'href' in action ? (
            <Link to={action.href}>
              <Button variant="secondary" className="px-6">
                {action.label}
              </Button>
            </Link>
          ) : (
            action
          )}
        </div>
      )}
    </div>
  );
};
