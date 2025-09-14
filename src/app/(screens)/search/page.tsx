import { Suspense } from "react";
import SearchPage from "./search-page";
import { ComNav } from "../../components/community/nav";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search data...</div>}>
      <ComNav />
      <SearchPage />
    </Suspense>
  );
}
