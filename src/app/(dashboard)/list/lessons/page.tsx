import TableSearch from '@/components/TableSearch'
import React from 'react'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { role, lessonsData } from '@/lib/data'
import Link from 'next/link'
import FormModal from '@/components/FormModal'

type Lesson = {
  id:number;
  subject:string;
  class:string;
  teacher:string;
}

const columns = [
  {
    header:"Subject Name", accessor:"name"
  },
  {
    header:"Class", accessor:"class",
  },
  {
    header:"Teacher", accessor:"teacher",classname:'hidden md:table-cell',
  },
  {
    header:"Actions", accessor:"action", 
  },

]

const LessonListPage = () => {

  const RenderRow = (item:Lesson) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text:sm hover:bg-lamaPurple'>
      <td className='flex items-center gap-4 p-4'>{item.subject}</td>
      <td >{item.class}</td>
      <td className='hidden md:table-cell'>{item.teacher}</td>
      <td>
        <div className='flex item-center gap-2'>
          {/*<Link href={'/list/teachers/${item.id}'}>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
            <Image src="/edit.png" alt="" width={16} height={16} />
          </button>
          </Link> */}
          {role==="admin" && (
            //<button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
            //<Image src="/delete.png" alt="" width={16} height={16} />
          //</button>
          <>
              <FormModal table="lesson" type="update" data={item}/>
              <FormModal table="lesson" type="delete" id={item.id}/>
            </>
        )}
        </div>
      </td>
    </tr>

      );

  return (
    <div className='bg-white p-4 rounded-lg flex-1 m-4 mt-0'>
      {/* TOP*/}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block text-lg semi-bold'>All Lessons</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto '>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>
            {role==="admin" && //<button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              //<Image src='/plus.png' alt='' width={14} height={14} />
            //</button>
            <FormModal table="lesson" type="create"/>
            }
          </div>
        </div>
      </div>
      {/* LIST */}
      <div>
        <Table columns={columns} renderRow={RenderRow} data={lessonsData}/>
      </div>
      {/* PAGINATION */}
      <div>
        <Pagination />
      </div>
    </div>
  )
}

export default LessonListPage