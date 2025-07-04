import Announcements from '@/components/Announcements'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'
import CountChart from '@/components/CountChart'
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendarContainer from '@/components/EventCalenderContainer'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'
import React from 'react'

const AdminPage
 = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* USER CARDS */}
      <div className='flex gap-4 flex-col lg:flex-row flex-wrap'>
        <UserCard type='admin'/>
        <UserCard type='student'/>
        <UserCard type='teacher'/>
        <UserCard type='parent'/>
      </div>
      {/* MIDDLE CHARTS */}
      <div className='flex gap-4 flex-col lg:flex-row '>
        {/* COUNT  CHART */}
        <div className='w-full lg:w-1/3 h-[450px]'>
          <CountChartContainer />
        </div>
        {/* ATTENDANCE CHART */}
        <div className='w-full lg:w-2/3 h-[450px]'>
          < AttendanceChartContainer />
        </div>
      </div>
      {/* BOTTOM CHARTS */}
      <div className='w-full h-[500px]'>
        <FinanceChart/>
      </div>
      {/* RIGHT */}
      </div>
      
      <div className='w-full lg:w-1/3 flex flex-col gap-8 '>
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  )
}

export default AdminPage
