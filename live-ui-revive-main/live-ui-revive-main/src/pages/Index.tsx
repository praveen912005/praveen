
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskList from "@/components/TaskList";
import { projects, tasks } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { GitBranch, CircleDot, GitMerge, CheckCircle2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [activeProjects, setActiveProjects] = useState(projects);
  const [activeTasks, setActiveTasks] = useState(tasks);
  const [buildProgress, setBuildProgress] = useState(0);
  const [pipelineStatus, setPipelineStatus] = useState<"idle" | "building" | "testing" | "deploying" | "completed">("idle");

  // Simulate real-time data updates
  useEffect(() => {
    // Show welcome toast on first load
    setTimeout(() => {
      toast({
        title: "Welcome to Methodify",
        description: "Your real-time project management dashboard",
      });
    }, 1000);

    // Simulate project updates
    const interval = setInterval(() => {
      const updatedProjects = [...activeProjects];
      const randomIndex = Math.floor(Math.random() * updatedProjects.length);
      
      // Random progress update
      if (updatedProjects[randomIndex].status !== 'completed') {
        const newProgress = Math.min(updatedProjects[randomIndex].progress + Math.floor(Math.random() * 5), 100);
        
        updatedProjects[randomIndex] = {
          ...updatedProjects[randomIndex],
          progress: newProgress,
          updatedAt: new Date(),
        };
        
        // If progress reaches 100%, mark as completed
        if (newProgress === 100) {
          updatedProjects[randomIndex].status = 'completed';
          
          toast({
            title: "Project Completed! 🎉",
            description: `${updatedProjects[randomIndex].name} has been marked as completed.`,
          });

          // Simulate pipeline
          simulateCICDPipeline();
        }
        
        setActiveProjects(updatedProjects);
      }
    }, 45000); // Update every 45 seconds
    
    return () => clearInterval(interval);
  }, [activeProjects, toast]);
  
  // Simulate CI/CD pipeline
  const simulateCICDPipeline = () => {
    setPipelineStatus("building");
    setBuildProgress(0);
    
    const buildInterval = setInterval(() => {
      setBuildProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(buildInterval);
          setPipelineStatus("testing");
          
          setTimeout(() => {
            setPipelineStatus("deploying");
            
            setTimeout(() => {
              setPipelineStatus("completed");
              
              setTimeout(() => {
                setPipelineStatus("idle");
              }, 8000);
              
              toast({
                title: "Deployment Successful!",
                description: "Changes have been deployed to production.",
              });
            }, 3000);
          }, 3000);
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  const renderPipelineStatus = () => {
    if (pipelineStatus === "idle") {
      return null;
    }
    
    return (
      <Card className="mb-6 overflow-hidden border-t-4 border-t-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            CI/CD Pipeline Status
            {pipelineStatus === "completed" && (
              <span className="ml-2 text-green-600 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Deployment Complete
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex items-center ${pipelineStatus === "building" || pipelineStatus === "testing" || pipelineStatus === "deploying" || pipelineStatus === "completed" ? "text-blue-600" : "text-slate-400"}`}>
              <GitBranch className="w-4 h-4 mr-1" /> Build
            </div>
            <Separator className="w-8" />
            <div className={`flex items-center ${pipelineStatus === "testing" || pipelineStatus === "deploying" || pipelineStatus === "completed" ? "text-blue-600" : "text-slate-400"}`}>
              <CircleDot className="w-4 h-4 mr-1" /> Test
            </div>
            <Separator className="w-8" />
            <div className={`flex items-center ${pipelineStatus === "deploying" || pipelineStatus === "completed" ? "text-blue-600" : "text-slate-400"}`}>
              <GitMerge className="w-4 h-4 mr-1" /> Deploy
            </div>
          </div>
          
          {pipelineStatus === "building" && (
            <div className="space-y-1">
              <div className="text-xs text-slate-500">Building application...</div>
              <Progress value={buildProgress} className="h-1.5" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="max-w-7xl mx-auto">
            {renderPipelineStatus()}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {projects.filter(p => p.status !== 'completed').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-green-500 shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Tasks in Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-purple-500 shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4</div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="projects" className="space-y-4">
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tasks">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TaskList tasks={activeTasks} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
