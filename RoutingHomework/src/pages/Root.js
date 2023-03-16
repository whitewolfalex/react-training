import { Outlet } from "react-router-dom";
import Home from "./Home";
import NavigationBar from "./NavigationBar";

function Root() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default Root;