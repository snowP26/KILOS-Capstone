import { ComNav } from "./components/community/nav";
import { Title } from "./components/community/title";


export default function Home() {
  return (
    <div>
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <Title />
      </div>
    </div>
  );
}
