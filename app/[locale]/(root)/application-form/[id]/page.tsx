import { getCourseById } from '@/app/server/courses/services'
import { notFound } from 'next/navigation'
import React from 'react'
import NewApplicationForm from '@/components/applications/NewApplicationForm'
import {newApplicationAction} from "../(actions)/newApplication"
import { NewCourse } from '@/types'


interface Props {
    params: Promise<{id:string ,locale:"en"| "ar"}>
}
async function page({params}:Props) {
 const id= (await params).id
 const locale= (await params).locale
 const selectedCourse= await getCourseById(id)
 if(selectedCourse.data===null) return notFound()
  return (
    <NewApplicationForm action={newApplicationAction}  locale={locale} course={selectedCourse.data as NewCourse}/>
  )
}

export default page