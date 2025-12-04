import React from 'react'
import { Button } from "@/components/ui/button"

type CommunityBannerProps = {
  id: string;
  onButtonClick: () => void;
  isOpen: boolean;
};

export const CommunityBanner = ({ id, onButtonClick, isOpen }: CommunityBannerProps) => {
  let image = '';
  let description = "";

  switch (id) {
    case 'Naga City':
      image = '/NagaYOBanner.jpg'
      description = "is a highly urbanized and culturally vibrant center known as the “Heart of Bicol.” It serves as a regional hub for education, commerce, and governance, offering modern amenities while preserving rich traditions. The city is also famous for the annual Peñafrancia Festival, which draws millions of devotees and tourists."
      break
    case 'Bula':
      image = '/BulaYOBanner.jpg'
      description = "is one of the oldest towns in Camarines Sur, characterized by its rural charm and strong agricultural heritage. The municipality is surrounded by lush fields and freshwater resources that support farming and fishing livelihoods. Its serene environment and tight-knit communities reflect a peaceful, countryside lifestyle."
      break
    case 'Pili':
      image = '/PiliYOBanner.jpg'
      description = "Pili is the provincial capital of Camarines Sur, strategically located at the center of the province. It is known for its growing commercial development, government institutions, and scenic natural attractions. The town also serves as a gateway to nearby destinations, including Mount Isarog and the wider Bicol region."
      break
  }

  return (
    <div className="flex flex-col h-full mb-20 mx-5 sm:flex sm:flex-col sm:h-full sm:w-fit sm:mb-20 md:flex md:flex-col md:h-full md:mx-20 md:mb-20 lg:flex lg:flex-row lg:h-60">
      <div className="h-50 w-full bg-white mb-5 rounded-md relative mr-3 sm:w-full sm:h-[56.25%] lg:w-[70%] lg:h-full flex items-center justify-center border">
        <img
          src={image}
          alt=""
          className="object-contain object-center max-h-full max-w-full sm:w-50"
        />
        <p className="text-2xl font-medium ml-3 absolute bottom-0 left-0 pl-2 pb-2">
          {id}
        </p>
      </div>

      <div className="h-fit rounded-md bg-white sm:w-full sm:h-full lg:w-[30%] lg:h-full border">
        <p className="m-3 mb-5 text-sm">
          <strong>{id} </strong>{description}
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
