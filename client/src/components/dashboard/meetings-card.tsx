import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Meeting } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon, Plus, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MeetingsCardProps {
  meetings: Meeting[];
}

export function MeetingsCard({ meetings }: MeetingsCardProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Get day string for a meeting
  const getMeetingDay = (date: Date): string => {
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return format(date, 'EEEE'); // Weekday name
  };
  
  // Format time
  const formatTime = (date: Date): string => {
    return format(date, 'h:mm a');
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Upcoming Meetings</CardTitle>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30"
          >
            <Plus className="h-3 w-3 mr-1" />
            <span>Schedule</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {meetings.map((meeting) => {
            const meetingDay = getMeetingDay(new Date(meeting.startTime));
            const startTime = formatTime(new Date(meeting.startTime));
            const endTime = formatTime(new Date(meeting.endTime));
            const isToday = meetingDay === 'Today';
            
            return (
              <div 
                key={meeting.id} 
                className={cn(
                  "p-3 rounded-md",
                  isToday 
                    ? "bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-800/20" 
                    : "bg-slate-50 dark:bg-slate-700/30"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-slate-800 dark:text-white">{meeting.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {meetingDay} • {startTime} - {endTime}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium",
                      isToday 
                        ? "bg-secondary-100 dark:bg-secondary-900/40 text-secondary-800 dark:text-secondary-300" 
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    )}>
                      {meetingDay}
                    </Badge>
                    {isToday && meeting.meetingLink && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1 p-0 h-auto text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300"
                        asChild
                      >
                        <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                          <Video className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex -space-x-2">
                    {meeting.attendees.slice(0, 3).map((attendee, index) => (
                      <div key={index} className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center text-xs ring-2 ring-white dark:ring-slate-800",
                        attendee === 'ZB' && "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                        attendee === 'JL' && "bg-emerald-200 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400",
                        attendee === 'TK' && "bg-purple-200 dark:bg-purple-900/50 text-purple-800 dark:text-purple-400",
                        attendee === 'AI' && "bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-400"
                      )}>
                        {attendee === 'AI' ? (
                          <Robot className="h-3 w-3" />
                        ) : (
                          attendee
                        )}
                      </div>
                    ))}
                  </div>
                  {meeting.attendees.length > 3 && (
                    <div className="ml-2 text-xs text-slate-600 dark:text-slate-400">
                      <span>+{meeting.attendees.length - 3} others</span>
                    </div>
                  )}
                  
                  {meeting.aiReportReady && (
                    <div className="ml-auto">
                      <Badge variant="outline" className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400">
                        <LightbulbIcon className="h-3 w-3 mr-1" /> AI Brief Ready
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <Button variant="outline" className="w-full mt-4 border text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50">
          View Calendar
        </Button>
      </CardContent>
    </Card>
  );
}

function Robot({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}
