import React from 'react'
import EventCalendar from '@/components/EventCalendar'
import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'

const StudentPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/*LEFT SIDE*/}
      <div className='w-full xl:w-2/3'>
        <div className='bg-white h-full rounded-md '>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      {/*RIGHT SIDE*/}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
      <EventCalendar />
      <Announcements />
      </div> 
    </div>
  )
}

export default StudentPage