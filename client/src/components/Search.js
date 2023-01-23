import { useState } from "react";
import Form from "react-bootstrap/Form";

function Search({ filterNfts }) {
    const [searchQuery, setSearchQuery] = useState("")

    const handleChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        filterNfts(e.target.value.toLowerCase());
    }

    return (
        <div id="search-input" className="col-3" style={{ margin: "2% 0 0 2%" }}>
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