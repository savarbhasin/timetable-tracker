'use client'

import { useState, useEffect } from 'react';
import { TimetableStep } from './components/TimetableStep';
import { useTimetableProgress } from './hooks/useTimetableProgress';
import { TimetableData } from './types';
import { Button } from "@/components/ui/button"

const timetableData: TimetableData = {
  "steps": [
    {
      "id": 3,
      "title": "Arrays",
      "dates": "11th January – 17th January",
      "tasks": [
        { "id": "3-1", "date": "11th Jan (Sat)", "description": "Complete", "count": 10 },
        { "id": "3-2", "date": "12th Jan (Sun)", "description": "Complete", "count": 12 },
        { "id": "3-3-1", "date": "13th Jan (Mon)", "description": "Complete 3 questions", "count": 3 },
        { "id": "3-3-2", "date": "14th Jan (Tue)", "description": "Complete 3 questions", "count": 3 },
        { "id": "3-3-3", "date": "15th Jan (Wed)", "description": "Complete 3 questions", "count": 3 },
        { "id": "3-3-4", "date": "16th Jan (Thu)", "description": "Complete 3 questions", "count": 3 },
        { "id": "3-4", "date": "17th Jan (Fri)", "description": "Complete", "count": 6 }
      ]
    },
    {
      "id": 4,
      "title": "Binary Search, 2D Arrays, Search Space",
      "dates": "18th January – 23rd January",
      "tasks": [
        { "id": "4-1", "date": "18th Jan (Sat)", "description": "Complete", "count": 8 },
        { "id": "4-2", "date": "19th Jan (Sun)", "description": "Complete", "count": 8 },
        { "id": "4-3", "date": "20th Jan (Mon)", "description": "Complete", "count": 4 },
        { "id": "4-4", "date": "21st Jan (Tue)", "description": "Complete", "count": 4 },
        { "id": "4-5", "date": "22nd Jan (Wed)", "description": "Complete ", "count": 4 },
        { "id": "4-6", "date": "23rd Jan (Thu)", "description": "Complete", "count": 4 }
      ]
    },
    {
      "id": 5,
      "title": "Strings",
      "dates": "24th January – 30th January",
      "tasks": [
        { "id": "5-1", "date": "24th Jan (Fri)", "description": "Complete", "count": 5 },
        { "id": "5-2", "date": "25th Jan (Sat)", "description": "Complete", "count": 5 },
        { "id": "5-3", "date": "26th Jan (Sun)", "description": "Complete", "count": 5 },
        { "id": "5-4", "date": "27th–30th Jan (Mon–Thu)", "description": "Complete additional questions", "count": 5 }
      ]
    },
    {
      "id": 6,
      "title": "Linked List",
      "dates": "5th February – 11th February",
      "tasks": [
        { "id": "6-1", "date": "5th Feb (Wed)", "description": "Complete 4 questions", "count": 4 },
        { "id": "6-2", "date": "6th Feb (Thu)", "description": "Complete 4 questions", "count": 4 },
        { "id": "6-3", "date": "7th Feb (Fri)", "description": "Complete 6 questions", "count": 6 },
        { "id": "6-4", "date": "8th Feb (Sat)", "description": "Complete 8 questions", "count": 8 },
        { "id": "6-5", "date": "9th Feb (Sun)", "description": "Complete 8 questions", "count": 8 },
        { "id": "6-6", "date": "10th Feb (Mon)", "description": "Complete 1 question", "count": 1 }
      ]
    },
    {
      "id": 7,
      "title": "Recursion",
      "dates": "15th February – 21st February",
      "tasks": [
        { "id": "7-1", "date": "15th Feb (Sat)", "description": "Complete", "count": 8 },
        { "id": "7-2", "date": "16th Feb (Sun)", "description": "Complete", "count": 8 },
        { "id": "7-3", "date": "17th–20th Feb (Mon–Thu)", "description": "Complete 2 questions/day", "count": 8 },
        { "id": "7-4", "date": "21st Feb (Fri)", "description": "Complete", "count": 1 }
      ]
    },
    {
      "id": 8,
      "title": "Bit Manipulation",
      "dates": "22nd February – 25th February",
      "tasks": [
        { "id": "8-1", "date": "22nd Feb (Sat)", "description": "Complete", "count": 6 },
        { "id": "8-2", "date": "23rd Feb (Sun)", "description": "Complete", "count": 6 },
        { "id": "8-3", "date": "24th–25th Feb (Mon–Tue)", "description": "Complete 3 questions/day", "count": 6 }
      ]
    },
    {
      "id": 9,
      "title": "Stack and Queues",
      "dates": "26th February – 3rd March",
      "tasks": [
        { "id": "9-1", "date": "26th–27th Feb (Wed–Thu)", "description": "Complete 3 questions/day", "count": 6 },
        { "id": "9-2", "date": "28th Feb (Fri)", "description": "Complete", "count": 6 },
        { "id": "9-3", "date": "29th Feb–1st Mar (Sat–Sun)", "description": "Complete 8 questions/day", "count": 16 },
        { "id": "9-4", "date": "2nd Mar (Mon)", "description": "Complete", "count": 2 }
      ]
    },
    {
      "id": 10,
      "title": "Sliding Window & Two Pointer Problems",
      "dates": "4th March – 6th March",
      "tasks": [
        { "id": "10-1", "date": "4th–5th Mar (Wed–Thu)", "description": "Complete 4 questions/day", "count": 8 },
        { "id": "10-2", "date": "6th Mar (Fri)", "description": "Complete", "count": 4 }
      ]
    },
    {
      "id": 11,
      "title": "Heaps",
      "dates": "7th March – 9th March",
      "tasks": [
        { "id": "11-1", "date": "7th Mar (Sat)", "description": "Complete", "count": 5 },
        { "id": "11-2", "date": "8th Mar (Sun)", "description": "Complete", "count": 5 },
        { "id": "11-3", "date": "9th Mar (Mon)", "description": "Complete", "count": 7 }
      ]
    },
    {
      "id": 12,
      "title": "Greedy Algorithms",
      "dates": "10th March – 12th March",
      "tasks": [
        { "id": "12-1", "date": "10th–11th Mar (Tue–Wed)", "description": "Complete 6 questions/day", "count": 12 },
        { "id": "12-2", "date": "12th Mar (Thu)", "description": "Complete", "count": 4 }
      ]
    },
    {
      "id": 13,
      "title": "Binary Trees",
      "dates": "13th March – 22nd March",
      "tasks": [
        { "id": "13-1", "date": "13th Mar (Fri)", "description": "Complete", "count": 6 },
        { "id": "13-2", "date": "14th–15th Mar (Sat–Sun)", "description": "Complete 8 questions/day", "count": 16 },
        { "id": "13-3", "date": "16th–19th Mar (Mon–Thu)", "description": "Complete 3 questions/day", "count": 12 },
        { "id": "13-4", "date": "20th Mar (Fri)", "description": "Complete", "count": 5 }
      ]
    },
    {
      "id": 14,
      "title": "Binary Search Trees",
      "dates": "23rd March – 25th March",
      "tasks": [
        { "id": "14-1", "date": "23rd Mar (Sat)", "description": "Complete", "count": 6 },
        { "id": "14-2", "date": "24th Mar (Sun)", "description": "Complete", "count": 6 },
        { "id": "14-3", "date": "25th Mar (Mon)", "description": "Complete", "count": 4 }
      ]
    },
    {
      "id": 15,
      "title": "Graphs",
      "dates": "26th March – 7th April",
      "tasks": [
        { "id": "15-1", "date": "26th–29th Mar (Tue–Fri)", "description": "Complete 3 questions/day", "count": 12 },
        { "id": "15-2", "date": "30th–31st Mar (Sat–Sun)", "description": "Complete 8 questions/day", "count": 16 },
        { "id": "15-3", "date": "1st–4th Apr (Mon–Thu)", "description": "Complete 4 questions/day", "count": 16 },
        { "id": "15-4", "date": "5th–7th Apr (Fri–Sun)", "description": "Complete 10 questions/day", "count": 30 }
      ]
    },
    {
      "id": 16,
      "title": "Dynamic Programming",
      "dates": "8th April – 21st April",
      "tasks": [
        { "id": "16-1", "date": "8th–11th Apr (Mon–Thu)", "description": "Complete 3 questions/day", "count": 12 },
        { "id": "16-2", "date": "12th–14th Apr (Fri–Sun)", "description": "Complete 8 questions/day", "count": 24 },
        { "id": "16-3", "date": "15th–18th Apr (Mon–Thu)", "description": "Complete 4 questions/day", "count": 16 },
        { "id": "16-4", "date": "19th–21st Apr (Fri–Sun)", "description": "Complete 4 questions/day", "count": 4 }
      ]
    },
    {
      "id": 17,
      "title": "Tries",
      "dates": "22nd April – 23rd April",
      "tasks": [
        { "id": "17-1", "date": "22nd Apr (Mon)", "description": "Complete", "count": 4 },
        { "id": "17-2", "date": "23rd Apr (Tue)", "description": "Complete", "count": 3 }
      ]
    },
    {
      "id": 18,
      "title": "Strings Review",
      "dates": "24th April – 25th April",
      "tasks": [
        { "id": "18-1", "date": "24th–25th Apr (Wed–Thu)", "description": "Complete 5 questions (Wed) + 4 questions (Thu)", "count": 9 }
      ]
    }
  ]
}

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
