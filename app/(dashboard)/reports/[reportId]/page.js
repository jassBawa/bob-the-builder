"use client"
import React from 'react'

function page({params}) {
    const {reportId} = params;
    console.log(params);
  return (
    <div>page</div>
  )
}

export default page

