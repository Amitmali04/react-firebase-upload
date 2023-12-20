// src/components/SearchBar.tsx

import React, { useState } from 'react';
import { Input, Button } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button variant="outlined" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
