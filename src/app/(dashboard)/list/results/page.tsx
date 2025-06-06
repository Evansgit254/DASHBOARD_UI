import TableSearch from '@/components/TableSearch'
import React from 'react'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { role, resultsData } from '@/lib/data'
import Link from 'next/link'
import FormModal from '@/components/FormModal'
import { ITEM_PER_PAGE } from '@/lib/settings'
import prisma from '@/lib/prisma'
import { Class, Lesson, Prisma, Subject, Teacher, Assignment } from '@prisma/client'
import { time } from 'console'
import { start } from 'repl'

type ResultList = {
  id: number;
  title: string;
  studentName:string;
  studentSurname:string;
  teacherName:string;
  teacherSurname:string;
  score:number;
  startTime: Date;
  className:string;
}

const columns = [
  {
    header:"Title", accessor:"title"
  },
  {
    header:"Student", accessor:"student",
  },
  {
    header:"Score", accessor:"score",classname:'hidden md:table-cell',
  },
  {
    header:"Class", accessor:"class",classname:'hidden md:table-cell',
  },
  {
    header:"Teacher", accessor:"teacher",classname:'hidden md:table-cell',
  },
  {
    header:"Date", accessor:"date",classname:'hidden md:table-cell',
  },
  {
    header:"Actions", accessor:"action", 
  },

]

const RenderRow = (item:ResultList) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text:sm hover:bg-lamaPurple'>
    <td className='flex items-center gap-4 p-4'>{item.title}</td>
    <td className='hidden md:table-cell'>{item.studentName + "" + item.studentSurname}</td>
    <td className='hidden md:table-cell'>{item.score}</td>
    <td className='hidden md:table-cell'>{item.teacherName + "" + item.teacherSurname}</td>
    <td className='hidden md:table-cell'>{item.className}</td>
    <td className='hidden md:table-cell'>{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
    <td>
      <div className='flex item-center gap-2'>
       {/* <Link href={'/list/teachers/${item.id}'}>
        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
          <Image src="/edit.png" alt="" width={16} height={16} />
        </button>
        </Link> */}
        {role==="admin" && (
          //<button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
          //<Image src="/delete.png" alt="" width={16} height={16} />
        //</button>
        <>
            <FormModal table="result" type="update" data={item}/>
            <FormModal table="result" type="delete" id={item.id}/>
          </>
      )}
      </div>
    </td>
  </tr>

    );

const ResultListPage = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) => {
    const { page, ...queryParams } = searchParams;
  
    const p = page ? parseInt(page) : 1;
  
    //URL PARAMS CONDITIONS
    const query: Prisma.ResultWhereInput = {};
  
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {  // Ensure value is not undefined
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
            case "search":
              query.OR = [
                { exam: { title: { contains: value, mode: "insensitive" } } },
                { student: { name: { contains: value, mode: "insensitive" } } },
              ];
              break;
            default:
              break;
             
        }
      }
    }
  }
  
    
  
    const [dataRes, count] = await prisma.$transaction([
      prisma.result.findMany({
        where: query,
        include: {
          student:{
            select:{name:true, surname:true}},
          exam:{
            include:{
              lesson:{
                select:{
                  class: {select: {name:true}},
                  teacher: {select: {name:true, surname:true}},
                },
              },
            }
          },
          assignment:{
            include:{
              lesson:{
                select:{
                  class: {select: {name:true}},
                  teacher: {select: {name:true, surname:true}},
                },
              },
            }
          }
        },
        
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
  
      prisma.result.count({ where: query }),
    ]);

    const data = dataRes.map(item => {
      const assessment = item.assignment || item.exam;

      if (!assessment) return null;

      const isExam = "startTime" in assessment;

      return {
        id: item.id,
        title:assessment.title,
        studentName:item.student.name,
        studentSurname:item.student.surname,
        teacherName:assessment.lesson.teacher.name,
        teacherSurname:assessment.lesson.teacher.surname,
        class:assessment.lesson.class.name,
        score:item.score,
        startTime: isExam ? assessment.startTime : assessment.startDate,
      }
      });
    
    
  return (
    <div className='bg-white p-4 rounded-lg flex-1 m-4 mt-0'>
      {/* TOP*/}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block text-lg semi-bold'>All Results</h1>
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
            <FormModal table="result" type="create"/>
            }
          </div>
        </div>
      </div>
      {/* LIST */}
      <div>
        <Table columns={columns} renderRow={RenderRow} data={data}/>
      </div>
      {/* PAGINATION */}
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  )
}

export default ResultListPage