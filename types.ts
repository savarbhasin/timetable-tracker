export interface Task {
  id: string;
  date: string;
  description: string;
  count: number;
}

export interface TimetableStep {
  id: number;
  title: string;
  dates: string;
  tasks: Task[];
}

export interface TimetableData {
  steps: TimetableStep[];
}

