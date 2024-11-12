'use client'
import React, { createContext, useContext, useState } from 'react';

interface FilterContextProps {
  search: string;
  tags: string[];
  upvotes: { min: number; max?: number };
  setSearch: (value: string) => void;
  setTags: (value: string[]) => void;
  setUpvotes: (value: { min: number; max?: number }) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [upvotes, setUpvotes] = useState<{ min: number; max?: number }>({ min: 0 });

  return (
    <FilterContext.Provider value={{ search, tags, upvotes, setSearch, setTags, setUpvotes }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
