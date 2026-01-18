"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getPokemonSuggestions } from "@/lib/pokemonData";

import styles from './SearchInput.module.css';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Get initial value from URL
  const initialQuery = searchParams.get("name")?.toString() || "";
  const [term, setTerm] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync state if URL changes (external navigation)
  useEffect(() => {
    setTerm(searchParams.get("name")?.toString() || "");
  }, [searchParams]);

  // Handle outside click to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
    // Hide suggestions after search is triggered (debounce) ? 
    // Usually we want to keep them while typing, but hide on selection.
    // If typing matches exactly, maybe hiding isn't necessary, but let's leave common logic.
  }, 500);

  const onInputChange = (val: string) => {
      setTerm(val);
      if (val.length >= 2) {
          const matches = getPokemonSuggestions(val);
          setSuggestions(matches);
          setShowSuggestions(true);
      } else {
          setSuggestions([]);
          setShowSuggestions(false);
      }
      handleSearch(val);
  };

  const selectSuggestion = (name: string) => {
      setTerm(name);
      setSuggestions([]);
      setShowSuggestions(false);
      
      // Immediate search on selection
      const params = new URLSearchParams(searchParams);
      params.set("name", name);
      replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="input-group" ref={wrapperRef}>
      <input
        className="search-input"
        placeholder="Search Pokémon (e.g. Charmander)..."
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={() => {
            if (term.length >= 2) setShowSuggestions(true);
        }}
        value={term}
        aria-label="Search Pokémon"
      />
      {showSuggestions && suggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
              {suggestions.map((name) => (
                  <li key={name} onClick={() => selectSuggestion(name)} className={styles.suggestionItem}>
                      {name}
                  </li>
              ))}
          </ul>
      )}
    </div>
  );
}
