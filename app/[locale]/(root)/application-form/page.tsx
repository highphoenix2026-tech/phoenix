import React from 'react'
import {newApplicationAction} from "./(actions)/newApplication"
import NewApplicationForm from '@/components/applications/NewApplicationForm'
import {} from "@/app/server/applications/services"

interface Props {
  params: Promise<{locale:"en" |"ar"}>
}

async function page({params}:Props) {
  const locale= (await params).locale
    
  return (
    <div>
      <NewApplicationForm action={newApplicationAction}  locale={locale}/>
    </div>
  )
}

export default page