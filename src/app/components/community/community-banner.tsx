import React from 'react'
import { Button } from "@/components/ui/button"

export const CommunityBanner = ({params} : {params: {id: string}}) => {
    const id = params.id
  return (
    <div className="flex flex-row  h-60 mx-25 mb-10">
        <div className="rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] relative w-4/5 mr-3">
            {/* <Image src="" alt=""></Image> */}
            <p className="text-2xl font-medium ml-3 absolute bottom-0 left-0 pl-2 pb-2">{id}</p>
        </div>

        <div className="rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] w-1/5 bg-blue-100">
            <p className="m-3 mb-7 text-sm">
                {id} is Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-center">
                <Button className="bg-blue-900">View Current Youth Officials</Button>
            </div>
            
        </div>
    </div>
  )
}
