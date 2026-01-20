import CreateBannerForm from '@/components/banner/CreateBannerForm'
import React from 'react'
import {createCategoryAction} from "../(actions)/addNewCategory"
import CreateCategoryForm from '@/components/categories/CreateCategoryForm'
function page() {
  return (
    <div className='w-full' >
      <CreateCategoryForm action={createCategoryAction}/>
    </div>
  )
}

export default page