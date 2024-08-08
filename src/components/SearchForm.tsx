import useSearchTextContext from "../hooks/searchTextHook";

export default function Searchform() {
  //React.formEvent<HTMLformElement>
  const { searchText, handleSearchText } = useSearchTextContext();
  const handleSearchJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchText("");
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        value={searchText}
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={handleSearchJob}
      />
    </form>
  );
}
