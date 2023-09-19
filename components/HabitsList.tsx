import React, { SetStateAction, useState } from "react";
import HabitCard from "./HabitCard";

interface HabitType {
    id: number
    name: string
    description: string
    completed: boolean
}
interface HabitsListProps {
    habits: HabitType[];
    setHabits: (value: SetStateAction<HabitType[]>) => void
  }

function HabitsList({habits, setHabits}: HabitsListProps) {

    return (
        <HabitCard habits={habits} setHabits={setHabits}/>
    )
}

export default HabitsList