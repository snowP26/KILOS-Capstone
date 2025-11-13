import { Card } from "./test-card"

export const Events = () => {
    return (
        <div className="px-14">
            <h1 className="text-3xl font-bold border-b-1 border-black pb-2 mb-10">Upcoming Events</h1>
            <div className="grid gap-2 grid-cols-4 justify-center place-items-center p-4 pt-0">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}