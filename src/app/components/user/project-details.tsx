import { ScrollArea } from "@/components/ui/scroll-area";

type details = {
    details: string;
}

export const ProjectDetails = ({ details }: details) => {
    return (
        <div className="flex flex-col bg-[#E6F1FF] mx-4 my-4 pt-2 rounded-md xl:mx-5 xl:mt-8 xl:pt-5 xl:px-10 xl:pb-8 xl:max-h-100">
            <p className="font-semibold text-xl text-center xl:text-2xl xl:text-start">
                Project Description:
            </p>

            {/* Scrollable text area */}
            <ScrollArea className="h-150 lg:h-80 mt-2 p-5 xl:p-0">
                <div className=" flex-1">
                    <p className="text-sm leading-relaxed pr-4">
                        {details}
                    </p>
                </div>
            </ScrollArea>
        </div>
    )
}