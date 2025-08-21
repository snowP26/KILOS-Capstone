import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogPortal,
    DialogFooter,
} from "@/components/ui/dialog"

export const PostFeedbackCard = () => {
    return (
        <div className="bg-[#052659] cursor-pointer text-white py-2 px-4 rounded-2xl hover:bg-white hover:text-[#052659] hover:border-black hover:border">
            <Dialog>
                <DialogTrigger className="cursor-pointer">Post a Feedback</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-3xl">Post your Feedback</DialogTitle>
                        <hr className="border-t border-black w-[100%] mx-auto my-3" />
                            <form>
                                <Input
                                    className="max-w-[100%] wrap-anywhere border-black placeholder:italic" placeholder="Feedback Header"
                                    name="title"
                                />
                                <Textarea className="max-w-[100%] h-50 wrap-anywhere mt-5 border-black placeholder:italic" placeholder="Feedback Body"></Textarea>
                            </form>
                            <div className="flex flex-row gap-2 justify-end mt-5">
                                <Button className="bg-[#AD0F0F] cursor-pointer hover:bg-white hover:text-[#AD0F0F] hover:border-black hover:border">Cancel</Button>
                                <Button className="bg-[#052659] cursor-pointer hover:bg-white hover:text-[#052659] hover:border-black hover:border">Submit</Button>
                            </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    )
}