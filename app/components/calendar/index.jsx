'use client'

import './styled.css'

import { useState } from 'react'
import Calendar from "react-calendar"
import { add, format } from 'date-fns'

import { TIME_INTERVAL, RESTAURANT_OPENING_TIME, RESTAURANT_CLOSING_TIME } from '@/app/constants/config'

export default function Calendars() {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null
  })

  const getTimes = () => {
    if(!date.justDate) return

    const { justDate } = date

    const interval = TIME_INTERVAL
    const beginning = add(justDate, { hours: RESTAURANT_OPENING_TIME })
    const end = add(justDate, { hours: RESTAURANT_CLOSING_TIME })

    const times = []
    
    for(let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i)
    }

    return times
  }

  const times = getTimes()

  return (
    <div className='h-screen gap-4 flex flex-col items-center justify-center'>
      {date.justDate ? ( <div className='gap-4 flex flex-wrap items-center justify-center max-w-[400px]'>
        <h1 className='font-medium text-xl'>Please select the reservation time.</h1>
        {times?.map((time, index) => (
          <div key={`time-${index}`} className='p-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-all'>
            <button type='button' onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}>
              {format(time, 'kk:mm')}
            </button>
          </div>
        ))}
      </div> ) : (
        <>
          <h1 className='font-medium text-xl'>Please select the reservation date.</h1>
          <Calendar onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))} minDate={new Date()} view="month" />
        </>
      )}
    </div>
  )
}