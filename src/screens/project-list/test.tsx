import { useSearchParams } from "react-router-dom";

export function SearchResults() {
  let list = [1, 2, 3, 4];
  list.reduce((pre, data) => {
    console.log({ data: 1, [data]: 0 });
    return 1;
  }, 0);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event: any) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value;
    setSearchParams({ q: searchQuery });
  };

  const hand = (event: any) => {
    const searchQuery = event.target.value;
    setSearchParams({ q: searchQuery });
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" onInput={hand} />
        <button type="submit">Search</button>
      </form>
      <p>Search results for: {searchParams.get("q")}</p>
    </div>
  );
}
