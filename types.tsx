import { Dispatch, SetStateAction } from "react"

export interface Habit {
    id: number
    name: string
    description: string
    category: string
    occurrence: string[]
    completed: boolean
}

export type HabitSetter = Dispatch<SetStateAction<Habit>>
export type HabitListSetter = Dispatch<SetStateAction<Habit[]>>

export interface HabitChanges {
    name: string
    description: string
    category: string
    occurrence: string[]
}

export interface HabitCompletedType {
    id: number
    date: string
    completed: boolean
}

export type HabitCompletionSetter = Dispatch<SetStateAction<HabitCompletedType[]>>

export type HabitsContextType = {
    habits: Habit[],
    setHabits: HabitListSetter
}

export type HabitCompletionContextType = {
    habitCompletionData: HabitCompletedType[],
    setHabitCompletionData: HabitCompletionSetter
}