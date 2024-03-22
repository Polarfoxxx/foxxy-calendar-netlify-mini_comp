import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../Container";

function LogOutModule(): JSX.Element {
    const { appData } = React.useContext(Container.Context);
    const NAVIGATE = useNavigate();

    const handleClickLogOut = () => {
        sessionStorage.removeItem("JWT")
        NAVIGATE("/LoginPage");
    };


    return (
        <div className=" w-full h-full flex items-center justify-start  p-2 pl-8 ">
            <div>
                <button
                    className=" w-20 h-8 text-thems-color_button bg-thems-background_button hover:bg-slate-400"
                    onClick={handleClickLogOut}>
                    Log out
                </button>
            </div>
           
        </div>
    );
};

export default LogOutModule;