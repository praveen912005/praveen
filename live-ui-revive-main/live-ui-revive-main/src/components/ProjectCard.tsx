
import { Project } from "@/data/mockData";
import { format } from "date-fns";
import { useState } from "react";
import ProjectStatusBadge from "./ProjectStatusBadge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`transition-shadow duration-300 ${isHovered ? 'shadow-lg' : 'shadow'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <ProjectStatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">Progress</span>
            <span className="text-xs font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>{project.tasks.length} tasks</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex -space-x-2">
          {project.team.map((user) => (
            <Avatar key={user.id} className="h-7 w-7 border-2 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Updated {format(project.updatedAt, 'MMM d, h:mm a')}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
