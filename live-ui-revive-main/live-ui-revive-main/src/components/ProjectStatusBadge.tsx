
import { cn } from "@/lib/utils";
import { CircleDashed, CheckCircle2, AlertTriangle, CircleCheck } from "lucide-react";

interface ProjectStatusBadgeProps {
  status: 'active' | 'on-track' | 'at-risk' | 'completed';
  className?: string;
  showIcon?: boolean;
}

const ProjectStatusBadge = ({ 
  status, 
  className,
  showIcon = true 
}: ProjectStatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'on-track':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'at-risk':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on-track':
        return 'On Track';
      case 'at-risk':
        return 'At Risk';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return <CircleDashed className="h-3 w-3 mr-1" />;
      case 'on-track':
        return <CheckCircle2 className="h-3 w-3 mr-1" />;
      case 'at-risk':
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      case 'completed':
        return <CircleCheck className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border shadow-sm transition-all",
        getStatusColor(),
        className
      )}
    >
      {showIcon && getStatusIcon()}
      {getStatusLabel()}
    </span>
  );
};

export default ProjectStatusBadge;
