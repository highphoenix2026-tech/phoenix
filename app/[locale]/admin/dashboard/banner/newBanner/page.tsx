import CreateBannerForm from '@/components/banner/CreateBannerForm'
import React from 'react'
import {addBannerAction} from "../(actions)/addBanner"
function page() {
  return (
    <div className='w-full' >
      <CreateBannerForm action={addBannerAction}/>
    </div>
  )
}

export default page