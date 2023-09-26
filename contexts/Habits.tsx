import { createContext, useState, ReactNode } from 'react';
import { Habit, HabitsContextType } from '../types';

export const HabitsContext = createContext<HabitsContextType | null>(null);

export const HabitsProvider = ({ children }: {children: ReactNode}) => {
  const testDataHabits: Habit[] = [
    {
      id: 1, name: "Exercise", description: "20 minutes of movement",
      category: "Activity",
      occurrence: ["Monday", "Wednesday", "Friday"],
      completed: false,
    },
    { 
      id: 2, name: "Read", description: "minimum 3 pages", 
      category: "Education",
      occurrence: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      completed: false 
    },
    {
      id: 3, name: "Meditate", description: "minimum 5 minutes",
      category: "Relaxation",
      occurrence: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      completed: false,
    },
  ]
  const [habits, setHabits] = useState<Habit[]>(testDataHabits);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
};