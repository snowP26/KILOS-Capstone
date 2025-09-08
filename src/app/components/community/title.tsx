
import { Search as SearchIcon } from "lucide-react";
import LocationSelect from "./locselect";
import { Button } from "@/components/ui/button";

const Search = () => {
    return <SearchIcon size={24} />
}

export const Title = () => {
    return (
        <div className="flex flex-col items-center pb-80">
            <h1 className="text-center mt-15 text-[50px] m-5 sm:mt-20 sm:m-0 sm:text-[48px] font-bold">
                <strong className="text-[#0073FF]">K</strong>
                <a className="hidden sm:inline">abataan&apos;s </a> 
                <strong className="text-[#0073FF]">I</strong>
                <a className="hidden sm:inline">ntegrated </a>
                <strong className="text-[#0073FF]">L</strong>
                <a className="hidden sm:inline">eadership & </a> 
                <strong className="text-[#0073FF]">O</strong>
                <a className="hidden sm:inline">rganizational </a>
                <strong className="text-[#0073FF]">S</strong>
                <a className="hidden sm:inline">ystem</a>
            </h1>
            <form className="flex flex-col gap-2 w-screen items-center justify-center md:flex-row">
                <LocationSelect />
                <div className="relative w-full max-w-full sm:max-w-[400px] md:max-w-[683px]">
                    <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
                        <Search />
                    </div>
                    <input
                        type="text"
                        name="Search-bar"
                        placeholder="Search for ordinances"
                        className="pl-13 p-3 bg-[#D9D9D9] rounded-lg w-full placeholder-gray-600"
                    />
                </div>
                <Button type="submit" className="cursor-pointer h-[100%] py-3 px-5 bg-[#052659] text-white rounded-lg hover:bg-white hover:text-[#052659] hover:border-black hover:border">
                    Search
                </Button>
            </form>
        </div>
    )
}