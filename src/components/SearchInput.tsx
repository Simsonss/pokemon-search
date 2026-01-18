"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Get initial value from URL
  const initialQuery = searchParams.get("name")?.toString() || "";
  const [term, setTerm] = useState(initialQuery);

  // Sync state if URL changes (external navigation)
  useEffect(() => {
    setTerm(searchParams.get("name")?.toString() || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="input-group">
      <input
        className="search-input"
        placeholder="Search Pokémon (e.g. Charmander)..."
        onChange={(e) => {
            setTerm(e.target.value);
            handleSearch(e.target.value);
        }}
        value={term}
        aria-label="Search Pokémon"
      />
    </div>
  );
}
