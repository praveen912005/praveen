
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  ChevronLeft, Home, Layout, CheckSquare, 
  Calendar, Users, Settings, Search, BarChart 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Projects", icon: Layout, active: false },
    { name: "Tasks", icon: CheckSquare, active: false },
    { name: "Calendar", icon: Calendar, active: false },
    { name: "Team", icon: Users, active: false },
    { name: "Reports", icon: BarChart, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <div className="font-semibold text-lg">Methodify</div>
        )}
        <Button
          variant="ghost" 
          size="sm" 
          className="ml-auto p-0 h-8 w-8"
          onClick={toggleSidebar}
        >
          <ChevronLeft 
            className={`h-5 w-5 transition-transform duration-300 ease-in-out ${collapsed ? 'rotate-180' : ''}`} 
          />
        </Button>
      </div>

      <div className="mt-4 flex flex-col flex-grow">
        <div className="px-3">
          <Button 
            variant="secondary" 
            className={cn(
              "w-full justify-start mb-4",
              collapsed ? "px-0 justify-center" : ""
            )}
          >
            <Search className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Search</span>}
          </Button>
        </div>

        <nav className="flex-1">
          <ul className="px-2 space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed ? "px-0 justify-center" : "",
                    item.active && "font-medium"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", item.active ? "text-primary" : "text-muted-foreground")} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
            AM
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Alex Morgan</p>
              <p className="text-xs text-muted-foreground">Product Manager</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
