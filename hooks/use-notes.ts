"use client";

import { useState, useEffect } from "react";

export function useNote(initialState, fn) {
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const notes = await fn();
        setState(notes);
      } catch (error) {
        setError(error);
      } finally {
        setIsPending(false);
      }
    }

    fetchData();
  }, [fn]);

  return { state, isPending, error };
}
