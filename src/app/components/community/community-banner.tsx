import React from 'react'
import { Button } from "@/components/ui/button"

type CommunityBannerProps = {
  id: string;
  onButtonClick: () => void;
  isOpen: boolean;
};

export const CommunityBanner = ({ id, onButtonClick, isOpen }: CommunityBannerProps) => {
  let image = '';

  switch (id) {
    case 'Naga City':
      image = '/NagaYOBanner.jpg'
      break
    case 'Bula':
      image = '/BulaYOBanner.jpg'
      break
    case 'Pili':
      image = '/PiliYOBanner.jpg'
      break
  }

  return (
    <div className="flex flex-col h-full mb-20 mx-5 sm:flex sm:flex-col sm:h-full sm:w-fit sm:mb-20 md:flex md:flex-col md:h-full md:mx-20 md:mb-20 lg:flex lg:flex-row lg:h-60">
      <div className="h-50 w-full mb-5 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] relative mr-3 sm:w-full sm:h-[56.25%] lg:w-[70%] lg:h-full flex items-center justify-center">
        <img
          src={image}
          alt=""
          className="object-contain object-center max-h-full max-w-full rounded-md"
        />
        <p className="text-2xl font-medium ml-3 absolute bottom-0 left-0 pl-2 pb-2">
          {id}
        </p>
      </div>

      <div className="h-fit rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] bg-blue-100 sm:w-full sm:h-full lg:w-[30%] lg:h-full">
        <p className="m-3 mb-5 text-sm">
          <strong>{id} </strong>is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </p>
        <div className="flex justify-center mb-3">
          <Button className="bg-[#052659] cursor-pointer hover:text-[#052659] hover:bg-white hover:border-black hover:border"
            onClick={onButtonClick}
          >
            {isOpen ? 'View Community Feedback' : 'View Current Youth Officials'}
          </Button>
        </div>
      </div>
    </div>
  );
};
