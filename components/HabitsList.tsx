import React, { useState } from "react";
import HabitCard from "./HabitCard";

function HabitsList () {
    const [habitsList, setHabitsList] = useState()

    return (
        <HabitCard/>
    )
}

export default HabitsList