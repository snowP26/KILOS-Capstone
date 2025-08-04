import { ComNav } from "@/src/app/components/community/nav"
import { CommunityBanner } from "@/src/app/components/community/community-banner"
import { FeedbackCard } from "@/src/app/components/community/feedbackCard"
import { Button } from "@/components/ui/button"

const page = ({ params } : { params: { id: string }}) => {


  return (
    <div>
        <ComNav />
        <div className="mt-10">
            <CommunityBanner params={params}/>
        </div>

        <p className="text-4xl font-bold text-center">Community Feedback</p>
        <div className="flex justify-center mt-5">
            <Button className="bg-blue-900">Post a Feedback</Button>
        </div>
        
        <div className="mx-25">
            <div className="flex flex-wrap justify-center">
                <FeedbackCard />
                <FeedbackCard/>
                <FeedbackCard />
                <FeedbackCard />
                <FeedbackCard/>
                <FeedbackCard />
                <FeedbackCard/>
                <FeedbackCard />
            </div>
        </div>
    </div>
    
  )
}

export default page