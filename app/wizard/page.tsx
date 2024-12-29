import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
    const user = await currentUser();
        if (!user) {
            redirect("/sign-in");
        }

  return (
    <div className="container flex max-w-2xl flex-col
    items-center justify-betweem gap-4">
        <h1 className="text-center text-3xl">
            Welcome, 
            <span className="ml-3 font-bold">{user?.firstName} ✨👋
            </span>
        </h1>
        
    </div>
  )
}

export default page