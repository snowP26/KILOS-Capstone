import { Suspense } from "react";
import SearchPage from "./search-page";
import { ComNav } from "../../components/community/nav";

export default function Page() {
  return (
    <div className="bg-[#EEF2ED] min-h-screen max-h-full pb-20">
      <Suspense fallback={<div>Loading search data...</div>}>
        <ComNav />
        <SearchPage />
      </Suspense>
    </div>

  );
}
