import { useParams } from "next/navigation";

export default function Id() {
    const params = useParams();
    return <h1>{params.id}</h1>
}