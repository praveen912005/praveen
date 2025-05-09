
import { useState, useEffect } from "react";
import { Bell, Mail, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getRandomUpdate } from "@/data/mockData";

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initial notifications
    setNotifications([
      {
        id: '1',
        message: 'Jamie Smith commented on task "Fix responsive layout issues"',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: '2',
        message: 'Project "Website Redesign" progress updated to 65%',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      }
    ]);
    setUnreadCount(2);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const update = getRandomUpdate();
      setNotifications(prev => [update, ...prev].slice(0, 6));
      setUnreadCount(prev => prev + 1);
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleReadAll = () => {
    setUnreadCount(0);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Today</span>
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Mail className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-3 font-medium">Messages</div>
              <Separator />
              <div className="p-4 text-center text-sm text-muted-foreground">
                No new messages
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-3 flex items-center justify-between">
                <span className="font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleReadAll}>
                    Mark all as read
                  </Button>
                )}
              </div>
              <Separator />
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 hover:bg-muted/50">
                        <div className="text-sm">{notification.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button className="ml-4">
            <Plus className="h-4 w-4 mr-2" />
            <span>New Project</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
