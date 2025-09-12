import {ClimbingBoxLoader} from "react-spinners";

export default function LoadingSpinner() {
    return <div style={{paddingTop: 100, paddingBottom: 100,display: "flex", justifyContent: "center", alignContent: "center"}}><ClimbingBoxLoader color={"#2563eb"} speedMultiplier={1} size={30}></ClimbingBoxLoader></div>
}