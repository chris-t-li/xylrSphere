import { useState, useEffect } from "react";
import Table from "react-bootstrap/table";
import PortoflioListItem from "./PortfolioListItem";
import ThumbnailLineChart from "./ThumbnailLineChart";


function Portfolio({ user, autoLogin, portfolioList, fetchPortfolio, reFetch, setReFetch }) {
    const [portfolioPriceData, setPortfolioPriceData] = useState([]);

    useEffect(() => autoLogin(), [])
    useEffect(() => fetchPortfolio(), [user, reFetch])
    useEffect(() => {
        if (!user) {
            return
        }

        fetch(`/portfolio_pricings/${user.id}`)
            .then(r => r.json())
            .then(priceData => {
                // console.log(priceData)
                setPortfolioPriceData(priceData)
            })
    }, [user])

    const renderMyPortfolio = portfolioList.map(nft => {

        return <PortoflioListItem
            key={nft.id}
            nft={nft}
            user={user}
            setReFetch={setReFetch}
            portfolioPriceData={portfolioPriceData}
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
                        <th style={{ width: "3%" }}>Chart</th>
                        <th style={{ width: "3%" }}>Move</th>
                        <th style={{ width: "3%" }}>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {renderMyPortfolio}
                </tbody>
            </Table>
            {/* <ThumbnailLineChart portfolioPriceData={portfolioPriceData} /> */}

        </div>
    )
}

export default Portfolio