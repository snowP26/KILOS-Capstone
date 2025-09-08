import { Suspense } from "react";
import SearchPage from "./search-page";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search data...</div>}>
      <SearchPage />
    </Suspense>
  );
}
