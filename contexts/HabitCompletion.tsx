import { createContext, useState, ReactNode } from 'react';
import { HabitCompletedType, HabitCompletionContextType } from '../types';

export const HabitCompletionContext = createContext<HabitCompletionContextType | null>(null);

export const HabitCompletionProvider = ({ children }: {children: ReactNode}) => {
  const [habitCompletionData, setHabitCompletionData] = useState<HabitCompletedType[]>([])

  return (
    <HabitCompletionContext.Provider value={{ habitCompletionData, setHabitCompletionData }}>
      {children}
    </HabitCompletionContext.Provider>
  );
};