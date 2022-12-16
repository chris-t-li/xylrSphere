import { useState } from "react";
import Form from "react-bootstrap/Form";

function Search({ filterNfts }) {
    const [searchQuery, setSearchQuery] = useState("")

    const handleChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        if (searchQuery.length >= 2) {
            filterNfts(searchQuery);
        } else {
            filterNfts("")
        }
    }

    return (
        <div id="search-input" className="col-3">
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="search"
                        value={searchQuery}
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Search;