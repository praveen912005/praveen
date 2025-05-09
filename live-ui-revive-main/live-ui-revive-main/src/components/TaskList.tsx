
import { Task } from "@/data/mockData";
import { format } from "date-fns";
import { CheckCircle, Clock, Loader2, FileEdit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return <Clock className="h-4 w-4 text-slate-500" />;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'review':
        return <FileEdit className="h-4 w-4 text-amber-500" />;
      case 'done':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-slate-100 hover:bg-slate-100">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'review':
        return 'In Review';
      case 'done':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">{getStatusIcon(task.status)}</div>
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  
                  <div className="flex items-center mt-3 space-x-3">
                    {task.assignee && (
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback className="text-xs">{task.assignee.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${task.assignee.online ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                      </div>
                    )}
                    
                    {task.dueDate && (
                      <div className="text-xs text-muted-foreground">
                        Due {format(task.dueDate, 'MMM d')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 items-center">
                {getPriorityBadge(task.priority)}
                <Badge variant="secondary" className="text-xs">{getStatusLabel(task.status)}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
