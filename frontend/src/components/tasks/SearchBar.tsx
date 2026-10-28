interface Props {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

export function SearchBar({ searchFilter, setSearchFilter }: Props) {
  return <div className="search-bar-container">
    <input
      className="search-bar"
      value={searchFilter}
      onChange={(event) => setSearchFilter(event.target.value)}
      placeholder="🔍 Search tasks..."
      maxLength={60}
    />
  </div>;
}
