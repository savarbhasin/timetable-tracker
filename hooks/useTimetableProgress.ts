import { useState, useEffect } from 'react';
import { TimetableData, Task } from '../types';

export function useTimetableProgress(timetableData: TimetableData) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const storedProgress = localStorage.getItem('timetableProgress');
    if (storedProgress) {
      setCompletedTasks(new Set(JSON.parse(storedProgress)));
    }
    const storedStepIndex = localStorage.getItem('currentStepIndex');
    if (storedStepIndex) {
      setCurrentStepIndex(Number(storedStepIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timetableProgress', JSON.stringify(Array.from(completedTasks)));
    localStorage.setItem('currentStepIndex', currentStepIndex.toString());
  }, [completedTasks, currentStepIndex]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const getStepProgress = (stepId: number) => {
    const step = timetableData.steps.find(s => s.id === stepId);
    if (!step) return 0;
    const totalTasks = step.tasks.reduce((sum, task) => sum + task.count, 0);
    const completedTasksCount = step.tasks.reduce((sum, task) => 
      sum + (completedTasks.has(task.id) ? task.count : 0), 0);
    return (completedTasksCount / totalTasks) * 100;
  };

  const getOverallProgress = () => {
    const totalQuestions = timetableData.steps.reduce((sum, step) => 
      sum + step.tasks.reduce((sum, task) => sum + task.count, 0), 0);
    const completedQuestionsCount = timetableData.steps.reduce((sum, step) => 
      sum + step.tasks.reduce((sum, task) => 
        sum + (completedTasks.has(task.id) ? task.count : 0), 0), 0);
    return (completedQuestionsCount / totalQuestions) * 100;
  };

  const moveToNextStep = () => {
    if (currentStepIndex < timetableData.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const moveToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const currentStep = timetableData.steps[currentStepIndex];
    if (currentStep) {
      const isStepCompleted = currentStep.tasks.every(task => completedTasks.has(task.id));
      if (isStepCompleted) {
        moveToNextStep();
      }
    }
  }, [completedTasks, currentStepIndex, timetableData.steps]);

  return { 
    completedTasks, 
    toggleTask, 
    getStepProgress, 
    getOverallProgress, 
    currentStepIndex,
    moveToNextStep,
    moveToPreviousStep
  };
}
