import { useEffect } from "react";
import Table from "react-bootstrap/table";
import PortoflioListItem from "./PortfolioListItem";

function Portfolio({ user, portfolioList, fetchPortfolio, reFetch, setReFetch }) {
    useEffect(() => fetchPortfolio(), [user, reFetch])

    const renderMyPortfolio = portfolioList.map(nft => {
        return <PortoflioListItem
            key={nft.id}
            nft={nft}
            user={user}
            setReFetch={setReFetch}
        />
    })

    return (
        <div id="watchlist-container"
            style={{
                marginLeft: "210px",
                maxWidth: "90vw"

            }}>
            <h2>My Portfolio</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th style={{ width: "3%" }}>#</th>
                        <th style={{ width: "5%" }}>Icon</th>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "5%" }}>Coin</th>
                        <th>Last Price</th>
                        <th>Purchase Price</th>
                        <th>Rating</th>
                        <th>Change</th>
                        <th>Price Graph</th>
                        <th style={{ width: "3%" }}>Move</th>
                        <th style={{ width: "3%" }}>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {renderMyPortfolio}
                </tbody>
            </Table>
        </div>
    )
}

export default Portfolio