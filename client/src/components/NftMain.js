import NftDetails from "./NftDetails";

function NftMain({ setReFetch }) {
    return (
        <div style={{ marginLeft: "50px" }}>
            <NftDetails setReFetch={setReFetch} />
        </div>
    )
}

export default NftMain;