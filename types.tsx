import { Dispatch, SetStateAction } from "react"

export interface Habit {
    id: number
    name: string
    description: string
    category: string
    occurence: string[]
    completed: boolean
}

export type HabitSetter = Dispatch<SetStateAction<Habit>>
export type HabitListSetter = Dispatch<SetStateAction<Habit[]>>

export interface HabitChanges {
    name: string
    description: string
    category: string
    occurence: string[]
}