import { createContext, useState, ReactNode } from 'react';
import { Habit, HabitsContextType } from '../types';

export const HabitsContext = createContext<HabitsContextType | null>(null);

export const HabitsProvider = ({ children }: {children: ReactNode}) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
};