import { TimetableStep as TimetableStepType, Task } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface TimetableStepProps {
  step: TimetableStepType;
  completedTasks: Set<string>;
  onToggleTask: (taskId: string) => void;
  progress: number;
}

export function TimetableStep({ step, completedTasks, onToggleTask, progress }: TimetableStepProps) {
  return (
    <Card className="mb-6 bg-gray-800 text-white border border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Step {step.id}: {step.title}</CardTitle>
        <CardDescription className="text-gray-400">{step.dates}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pt-1 mb-4">
          <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-700">
            <div 
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-in-out"
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs font-semibold inline-block text-indigo-300">
              {progress.toFixed(2)}% complete
            </span>
            <span className="text-xs font-semibold inline-block text-gray-400">
              {step.tasks.reduce((sum, task) => sum + task.count, 0)} questions total
            </span>
          </div>
        </div>
        <ul className="space-y-2">
          {step.tasks.map((task) => (
            <li 
              key={task.id} 
              className={`text-sm cursor-pointer p-3 rounded-lg transition-all duration-200 ease-in-out ${
                completedTasks.has(task.id) 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 shadow-lg' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => onToggleTask(task.id)}
            >
              {task.date}: {task.description} ({task.count} questions)
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

