
// Mock data for our real-time workspace UI

export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee?: User;
  dueDate?: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on-track' | 'at-risk' | 'completed';
  progress: number; // 0-100
  tasks: Task[];
  team: User[];
  updatedAt: Date;
}

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Morgan&background=0D8ABC&color=fff',
    online: true,
  },
  {
    id: '2',
    name: 'Jamie Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jamie+Smith&background=2E7D32&color=fff',
    online: false,
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    avatar: 'https://ui-avatars.com/api/?name=Taylor+Wilson&background=C2185B&color=fff',
    online: true,
  },
  {
    id: '4',
    name: 'Casey Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Casey+Johnson&background=5E35B1&color=fff',
    online: false,
  },
];

// Mock tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design new dashboard layout',
    description: 'Create wireframes and mockups for the new dashboard design',
    priority: 'high',
    status: 'in-progress',
    assignee: users[0],
    dueDate: new Date('2025-06-10'),
  },
  {
    id: '2',
    title: 'Implement authentication flow',
    description: 'Set up user login, registration, and password reset flows',
    priority: 'high',
    status: 'review',
    assignee: users[2],
    dueDate: new Date('2025-05-15'),
  },
  {
    id: '3',
    title: 'Fix responsive layout issues',
    description: 'Address UI bugs on mobile devices',
    priority: 'medium',
    status: 'todo',
    assignee: users[1],
    dueDate: new Date('2025-05-20'),
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all endpoints for developer reference',
    priority: 'low',
    status: 'done',
    assignee: users[3],
    dueDate: new Date('2025-05-05'),
  },
  {
    id: '5',
    title: 'Set up continuous integration',
    description: 'Configure GitHub Actions workflow',
    priority: 'medium',
    status: 'in-progress',
    assignee: users[2],
    dueDate: new Date('2025-05-18'),
  },
];

// Mock projects
export const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with new branding',
    status: 'active',
    progress: 65,
    tasks: [tasks[0], tasks[2], tasks[3]],
    team: [users[0], users[1], users[3]],
    updatedAt: new Date('2025-05-07T10:30:00'),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Create iOS and Android applications for customers',
    status: 'at-risk',
    progress: 42,
    tasks: [tasks[1], tasks[4]],
    team: [users[0], users[2]],
    updatedAt: new Date('2025-05-08T09:15:00'),
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate payment processing and shipping APIs',
    status: 'on-track',
    progress: 78,
    tasks: [tasks[1], tasks[3], tasks[4]],
    team: [users[1], users[2], users[3]],
    updatedAt: new Date('2025-05-08T14:45:00'),
  },
  {
    id: '4',
    name: 'Data Migration',
    description: 'Transfer customer data to new database system',
    status: 'completed',
    progress: 100,
    tasks: [tasks[3]],
    team: [users[0], users[3]],
    updatedAt: new Date('2025-05-06T16:20:00'),
  },
];

// Function to simulate real-time updates
export const getRandomUpdate = () => {
  const projectIndex = Math.floor(Math.random() * projects.length);
  const taskIndex = Math.floor(Math.random() * tasks.length);
  const userIndex = Math.floor(Math.random() * users.length);
  
  const updateTypes = [
    `${users[userIndex].name} commented on task "${tasks[taskIndex].title}"`,
    `"${tasks[taskIndex].title}" status changed to ${tasks[taskIndex].status}`,
    `${users[userIndex].name} joined project "${projects[projectIndex].name}"`,
    `Project "${projects[projectIndex].name}" progress updated to ${projects[projectIndex].progress}%`,
  ];
  
  return {
    id: Date.now().toString(),
    message: updateTypes[Math.floor(Math.random() * updateTypes.length)],
    timestamp: new Date(),
  };
};
