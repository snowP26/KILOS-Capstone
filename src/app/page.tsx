import { ComNav } from "./components/community/nav";
import { Title } from "./components/community/title";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()

  return (
    <div>
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <Title />
        <h1>UPCOMING EVENTS</h1>
      </div>
    </div>
  );
}
