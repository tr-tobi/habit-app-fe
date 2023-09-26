import React, { useContext, useEffect, useState } from 'react'
import { Calendar } from "react-native-calendars"
import { HabitCompletionContext } from '../contexts/HabitCompletion'
import { HabitCompletionContextType } from '../types'

function HabitCalendar (){
  const { habitCompletionData } = useContext(HabitCompletionContext) as HabitCompletionContextType
  const [markedDates, setMarkedDates] = useState({})

  let stateObj:{[index:string]:object} = {}

  useEffect(() => {
      habitCompletionData.forEach((habit) => {
          const date = habit.date;
          const completionPercentage = calcCompletionPercentage(date);
          let highlight = 'red';
      
          if (completionPercentage >= 80) {
            highlight = 'green';
          } else if (completionPercentage >= 50) {
            highlight = 'yellow';
          }
      
          stateObj[date] = {color: highlight, startingDate: true, endingDate: true}
      
        });

        setMarkedDates(stateObj);

  }, [habitCompletionData])

      const calcCompletionPercentage = (date: string) => {
          const totalHabits = habitCompletionData.length;
          console.log(habitCompletionData);
          if(totalHabits === 0) return 0;

          const completedHabits = habitCompletionData.filter(({completed}) => completed).length
          return (completedHabits / totalHabits) * 100
      }

    return <Calendar markingType={"period"} markedDates={markedDates} onDayPress={(day) => 
      console.log(calcCompletionPercentage(day.dateString))
  } />;
}

export default HabitCalendar