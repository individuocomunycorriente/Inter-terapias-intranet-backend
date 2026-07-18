import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder, className }) => {
  const [draft, setDraft] = useState('');

  const submit = () => onSearch(draft.trim());

  return (
    <div className={`flex ${className ?? ''}`}>
      <input
        type="search"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder={placeholder ?? 'Buscar...'}
        className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
      />
      <button
        type="button"
        onClick={submit}
        aria-label="Buscar"
        className="px-3 bg-brand-green hover:bg-brand-green-dark text-white rounded-r-lg transition-colors shrink-0"
      >
        <Search size={16} />
      </button>
    </div>
  );
};

export default SearchInput;
