import React, { SetStateAction, useState } from "react";
import HabitCard from "./HabitCard";

interface HabitType {
    id: number
    name: string
    description: string
    completed: boolean
}

interface HabitCompletedType {
    id: number
    date: string
    completed: boolean
}
interface HabitsListProps {
    habits: HabitType[];
    setHabits: (value: SetStateAction<HabitType[]>) => void
    habitCompletionData: HabitCompletedType[]
    setHabitCompletionData: (value: SetStateAction<HabitCompletedType[]>) => void
  }

function HabitsList({habits, setHabits, habitCompletionData, setHabitCompletionData}: HabitsListProps) {

    return (
        <HabitCard habits={habits} setHabits={setHabits} habitCompletionData={habitCompletionData} setHabitCompletionData={setHabitCompletionData}/>
    )
}

export default HabitsList