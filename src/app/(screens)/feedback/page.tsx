import { ComNav } from "../../components/community/nav"
import { CityMuniCard } from "../../components/community/city-muniCard"

export default function Feedback(){
    return (
       <div>
            <ComNav />
            <h1 className="mt-15 mb-10 mx-25 font-bold text-2xl">Select City or Municipality</h1>

            <div className="mx-25">
                <div className="flex flex-wrap justify-center gap-5">
                    <CityMuniCard />
                    <CityMuniCard />
                    <CityMuniCard />
                </div>
            </div>
        </div>

    )
}