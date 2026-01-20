import {addCourseAction} from "../(actions)/addCourse"
import CreateCourseForm from '@/components/courses/NewCourseForm'
import {getCategoryNameAndId} from "@/app/server/categories/services"
async function page() {
  const categoriesNameAndId=  (await getCategoryNameAndId()).data
  
  return (
    <div className='w-full' >
      <CreateCourseForm action={addCourseAction} categoriesNameAndId={categoriesNameAndId}/>
    </div>
  )
}

export default page