import { useSearchParams } from "react-router-dom";

export default function useQ() {
  // This gets all the stuff that' in the query stirng (e.g. ?q=foo)
  const [searchParams] = useSearchParams();
  return searchParams.get("q");
}
// So, this gets the "q" (query?/query string) from the current searchparams.
