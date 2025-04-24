import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Flag, Plus, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TaskManagementProps {
  tasks: Task[];
  refetch: () => void;
}

export function TaskManagement({ tasks, refetch }: TaskManagementProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mine' | 'team' | 'ai'>('all');
  const { toast } = useToast();
  
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const res = await apiRequest('PATCH', `/api/tasks/${id}`, { completed });
      return res.json();
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update task: ${error}`,
      });
    },
  });

  const handleTaskToggle = (task: Task) => {
    updateTaskMutation.mutate({
      id: task.id,
      completed: !task.completed
    });
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mine' && task.assignedTo === 'ZB') return true;
    if (activeFilter === 'team' && task.assignedTo !== 'ZB' && task.assignedTo !== 'AI') return true;
    if (activeFilter === 'ai' && task.assignedTo === 'AI') return true;
    return false;
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Tasks & Projects</CardTitle>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30"
          >
            <Plus className="h-3 w-3 mr-1" />
            <span>New Task</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1 mb-4">
          <Button 
            size="sm"
            variant={activeFilter === 'all' ? 'secondary' : 'outline'}
            className="px-2.5 py-1 text-xs font-medium"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
          <Button 
            size="sm"
            variant={activeFilter === 'mine' ? 'secondary' : 'outline'}
            className="px-2.5 py-1 text-xs font-medium"
            onClick={() => setActiveFilter('mine')}
          >
            Mine
          </Button>
          <Button 
            size="sm"
            variant={activeFilter === 'team' ? 'secondary' : 'outline'}
            className="px-2.5 py-1 text-xs font-medium"
            onClick={() => setActiveFilter('team')}
          >
            Team
          </Button>
          <Button 
            size="sm"
            variant={activeFilter === 'ai' ? 'secondary' : 'outline'}
            className="px-2.5 py-1 text-xs font-medium"
            onClick={() => setActiveFilter('ai')}
          >
            AI
          </Button>
        </div>
        
        {/* Tasks List */}
        <div className="space-y-2">
          {filteredTasks.slice(0, 4).map((task) => (
            <div key={task.id} className="flex items-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded-md">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => handleTaskToggle(task)}
                className="mr-2 h-4 w-4"
              />
              <div className="flex-1 ml-1">
                <div className={cn(
                  "text-sm font-medium",
                  task.completed 
                    ? "line-through text-slate-500 dark:text-slate-400" 
                    : "text-slate-800 dark:text-white"
                )}>
                  {task.title}
                </div>
                <div className="flex items-center mt-1">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium mr-1.5",
                      task.category === 'Marketing' && "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
                      task.category === 'AI Ops' && "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400",
                      task.category === 'Content' && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400"
                    )}
                  >
                    {task.category}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {task.completed 
                      ? 'Completed' 
                      : task.dueDate 
                        ? new Date(task.dueDate).toLocaleDateString('en-US', { weekday: 'long' })
                        : 'No due date'}
                  </span>
                </div>
              </div>
              <div className="flex items-center ml-2">
                <div className={cn(
                  "inline-flex items-center h-6 w-6 rounded-full justify-center mr-1",
                  task.completed && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400",
                  !task.completed && task.priority === 'High' && "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
                  !task.completed && task.priority === 'Medium' && "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400",
                  !task.completed && task.priority === 'Low' && "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                )}>
                  {task.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <Flag className="h-3 w-3" />
                  )}
                </div>
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-xs",
                  task.assignedTo === 'AI' 
                    ? "bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-400" 
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                )}>
                  {task.assignedTo === 'AI' ? <Bot className="h-3 w-3" /> : task.assignedTo}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {filteredTasks.slice(0, 4).length} of {tasks.length} tasks shown
            </div>
            <Button variant="link" size="sm" className="text-xs text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 p-0">
              View All Tasks
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
