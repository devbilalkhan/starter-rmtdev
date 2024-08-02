export default function Searchform({ searchText, setSearchText }) {
  //React.formEvent<HTMLformElement>

  const handleSearchJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchText("");
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
