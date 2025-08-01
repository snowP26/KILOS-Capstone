import { ComNav } from "./components/community/nav";
import { Title } from "./components/community/title";
import { Events } from "./components/community/upcoming-events";

export default function Home() {

  return (
    <div className="pb-16">
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <Title />
        <Events />
      </div>
    </div>
  );
}
