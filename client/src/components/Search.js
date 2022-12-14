import { useState } from "react";

function Search({ filterNfts }) {
    const [searchQuery, setSearchQuery] = useState("")

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        if (searchQuery.length > 2) {
            filterNfts(searchQuery);
        } else {
            filterNfts("")
        }
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    name="search"
                    placeholder="search"
                    value={searchQuery}
                    onChange={handleChange}
                ></input>
            </form>
        </div>
    )
}

export default Search;