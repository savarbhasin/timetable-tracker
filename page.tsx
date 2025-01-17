'use client'

import { useState, useEffect } from 'react';
import { TimetableStep } from './components/TimetableStep';
import { useTimetableProgress } from './hooks/useTimetableProgress';
import { TimetableData } from './types';
import { Button } from "@/components/ui/button"

const timetableData: TimetableData = {
  steps: [
    {
      id: 3,
      title: "Arrays",
      dates: "11th January – 17th January",
      tasks: [
        { id: "3-1", date: "11th Jan (Sat)", description: "Complete", count: 10 },
        { id: "3-2", date: "12th Jan (Sun)", description: "Complete", count: 12 },
        { id: "3-3-1", date: "13th Jan (Mon)", description: "Complete 3 questions", count: 3 },
        { id: "3-3-2", date: "14th Jan (Tue)", description: "Complete 3 questions", count: 3 },
        { id: "3-3-3", date: "15th Jan (Wed)", description: "Complete 3 questions", count: 3 },
        { id: "3-3-4", date: "16th Jan (Thu)", description: "Complete 3 questions", count: 3 },
        { id: "3-4", date: "17th Jan (Fri)", description: "Complete", count: 6 }
      ],
    },
    {
      id: 4,
      title: "Binary Search, 2D Arrays, Search Space",
      dates: "18th January – 23rd January",
      tasks: [
        { id: "4-1", date: "18th Jan (Sat)", description: "Complete", count: 8 },
        { id: "4-2", date: "19th Jan (Sun)", description: "Complete", count: 8 },
        { id: "4-3", date: "20th Jan (Mon)", description: "Complete", count: 4 },
        { id: "4-4", date: "21st Jan (Tue)", description: "Complete", count: 4 },
        { id: "4-5", date: "22nd Jan (Wed)", description: "Complete ", count: 4 },
        { id: "4-6", date: "23rd Jan (Thu)", description: "Complete", count: 4 },
      ],
    },
    {
      id: 5,
      title: "Strings",
      dates: "24th January – 27th January",
      tasks: [
        { id: "5-1", date: "24th Jan (Fri)", description: "Complete", count: 5 },
        { id: "5-2", date: "25th Jan (Sat)", description: "Complete", count: 5 },
        { id: "5-3", date: "26th Jan (Sun)", description: "Complete", count: 5 },
      ],
    },
    {
      id: 6,
      title: "Linked List",
      dates: "28th January – 30th January",
      tasks: [
        { id: "6-1", date: "28th–30th Jan (Tue–Thu)", description: "Complete 4 questions/day", count: 8 },
        { id: "6-2", date: "31st Jan (Fri)", description: "Complete", count: 3 },
      ],
    },
    {
      id: 7,
      title: "Recursion",
      dates: "1st February – 7th February",
      tasks: [
        { id: "7-1", date: "1st Feb (Sat)", description: "Complete", count: 8 },
        { id: "7-2", date: "2nd Feb (Sun)", description: "Complete", count: 8 },
        { id: "7-3", date: "3rd–6th Feb (Mon–Thu)", description: "Complete 2 questions/day", count: 8 },
        { id: "7-4", date: "7th Feb (Fri)", description: "Complete", count: 1 },
      ],
    },
    {
      id: 8,
      title: "Bit Manipulation",
      dates: "8th February – 11th February",
      tasks: [
        { id: "8-1", date: "8th Feb (Sat)", description: "Complete", count: 6 },
        { id: "8-2", date: "9th Feb (Sun)", description: "Complete", count: 6 },
        { id: "8-3", date: "10th–11th Feb (Mon–Tue)", description: "Complete 3 questions/day", count: 6 },
      ],
    },
    {
      id: 9,
      title: "Stack and Queues",
      dates: "12th February – 18th February",
      tasks: [
        { id: "9-1", date: "12th–13th Feb (Wed–Thu)", description: "Complete 3 questions/day", count: 6 },
        { id: "9-2", date: "14th Feb (Fri)", description: "Complete", count: 6 },
        { id: "9-3", date: "15th–16th Feb (Sat–Sun)", description: "Complete 8 questions/day", count: 16 },
        { id: "9-4", date: "17th Feb (Mon)", description: "Complete", count: 2 },
      ],
    },
    {
      id: 10,
      title: "Sliding Window & Two Pointer Problems",
      dates: "19th February – 21st February",
      tasks: [
        { id: "10-1", date: "19th–20th Feb (Wed–Thu)", description: "Complete 4 questions/day", count: 8 },
        { id: "10-2", date: "21st Feb (Fri)", description: "Complete", count: 4 },
      ],
    },
    {
      id: 11,
      title: "Heaps",
      dates: "22nd February – 24th February",
      tasks: [
        { id: "11-1", date: "22nd Feb (Sat)", description: "Complete", count: 5 },
        { id: "11-2", date: "23rd Feb (Sun)", description: "Complete", count: 5 },
        { id: "11-3", date: "24th Feb (Mon)", description: "Complete", count: 7 },
      ],
    },
    {
      id: 12,
      title: "Greedy Algorithms",
      dates: "25th February – 27th February",
      tasks: [
        { id: "12-1", date: "25th–26th Feb (Tue–Wed)", description: "Complete 6 questions/day", count: 12 },
        { id: "12-2", date: "27th Feb (Thu)", description: "Complete", count: 4 },
      ],
    },
    {
      id: 13,
      title: "Binary Trees",
      dates: "28th February – 7th March",
      tasks: [
        { id: "13-1", date: "28th Feb (Fri)", description: "Complete", count: 6 },
        { id: "13-2", date: "1st–2nd March (Sat–Sun)", description: "Complete 8 questions/day", count: 16 },
        { id: "13-3", date: "3rd–6th March (Mon–Thu)", description: "Complete 3 questions/day", count: 12 },
        { id: "13-4", date: "7th March (Fri)", description: "Complete", count: 5 },
      ],
    },
    {
      id: 14,
      title: "Binary Search Trees",
      dates: "8th March – 10th March",
      tasks: [
        { id: "14-1", date: "8th March (Sat)", description: "Complete", count: 6 },
        { id: "14-2", date: "9th March (Sun)", description: "Complete", count: 6 },
        { id: "14-3", date: "10th March (Mon)", description: "Complete", count: 4 },
      ],
    },
    {
      id: 15,
      title: "Graphs",
      dates: "11th March – 23rd March",
      tasks: [
        { id: "15-1", date: "11th–14th March (Tue–Fri)", description: "Complete 3 questions/day", count: 12 },
        { id: "15-2", date: "15th–16th March (Sat–Sun)", description: "Complete 8 questions/day", count: 16 },
        { id: "15-3", date: "17th–20th March (Mon–Thu)", description: "Complete 4 questions/day", count: 16 },
        { id: "15-4", date: "21st–23rd March (Fri–Sun)", description: "Complete 10 questions/day", count: 30 },
      ],
    },
    {
      id: 16,
      title: "Dynamic Programming",
      dates: "24th March – 6th April",
      tasks: [
        { id: "16-1", date: "24th–27th March (Mon–Thu)", description: "Complete 3 questions/day", count: 12 },
        { id: "16-2", date: "28th–30th March (Fri–Sun)", description: "Complete 8 questions/day", count: 24 },
        { id: "16-3", date: "31st March–3rd April (Mon–Thu)", description: "Complete 4 questions/day", count: 16 },
        { id: "16-4", date: "4th–6th April (Fri–Sun)", description: "Complete 4 questions/day", count: 4 },
      ],
    },
    {
      id: 17,
      title: "Tries",
      dates: "7th April – 8th April",
      tasks: [
        { id: "17-1", date: "7th April (Mon)", description: "Complete", count: 4 },
        { id: "17-2", date: "8th April (Tue)", description: "Complete", count: 3 },
      ],
    },
    {
      id: 18,
      title: "Strings Review",
      dates: "9th April – 10th April",
      tasks: [
        { id: "18-1", date: "9th–10th April (Wed–Thu)", description: "Complete 5 questions (Wed) + 4 questions (Thu)", count: 9 },
      ],
    },
  ],
};

export default function Home() {
  const { 
    completedTasks, 
    toggleTask, 
    getStepProgress, 
    getOverallProgress, 
    currentStepIndex,
    moveToNextStep,
    moveToPreviousStep
  } = useTimetableProgress(timetableData);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const currentStep = timetableData.steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Step-by-Step Timetable Tracker
      </h1>
      <p className="text-xl mb-8 text-gray-300">{today}</p>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
        <div className="relative pt-1">
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-700">
            <div 
              style={{ width: `${getOverallProgress()}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-in-out"
            ></div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold inline-block text-indigo-300">
              {getOverallProgress().toFixed(2)}% complete
            </span>
            <span className="text-sm font-semibold inline-block text-gray-400">
              {timetableData.steps.length} steps total
            </span>
          </div>
        </div>
      </div>
      {currentStep && (
        <TimetableStep
          key={currentStep.id}
          step={currentStep}
          completedTasks={completedTasks}
          onToggleTask={toggleTask}
          progress={getStepProgress(currentStep.id)}
        />
      )}
      <div className="mt-4 flex space-x-4">
        {currentStepIndex > 0 && (
          <Button 
            onClick={moveToPreviousStep}
            className="bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-2 px-4 rounded-full hover:from-gray-700 hover:to-gray-900 transition-all duration-200 ease-in-out"
          >
            Previous Step
          </Button>
        )}
        {currentStepIndex < timetableData.steps.length - 1 && (
          <Button 
            onClick={moveToNextStep}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 ease-in-out"
          >
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
}
