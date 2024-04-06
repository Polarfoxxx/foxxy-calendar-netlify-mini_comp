import React from "react";
import "./style/content_style.css";
import { servicesJWTdecodeAndValidity } from "../../utils";
import { useNavigate } from "react-router-dom";
import { LogOut, ColorSwitcher, TittleBar } from "../../HeaderModule";
import { Calendar } from "../../CalendarModule";
import { MessageList } from "../../MessageModule";
import { SubtTextModule, ClockModule, CurrentAllEvent } from "../../SubtitleModule";

function Content(): JSX.Element {
    const NAVIGATE = useNavigate();
    const themedDivRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const JWT = sessionStorage.getItem("JWT");
        if (JWT !== null) {
            servicesJWTdecodeAndValidity(JWT) ? NAVIGATE("/Content") : NAVIGATE("/LoginPage")
        } else {
            NAVIGATE("/LoginPage")
        };
    }, [NAVIGATE]);

    return (
        <div
            ref={themedDivRef}
            data-theme=""
            className=" w-full h-full flex flex-col justify-center items-center bg-background_App bg-fullApp">
            <header className=" w-full h-28  bg-transparent flex flex-col justify-center items-center ">
                <div className=" w-full h-full flex flex-row ">
                    <div className=" w-full min-w-64 h-full flex items-center justify-center ">
                        <LogOut />
                    </div>
                    <div className=" w-[30%] min-w-[300px] min-h-full flex items-center justify-center ">
                        <TittleBar />
                    </div>
                    <div className="w-[30%] min-w-64 min-h-full flex items-center justify-center">
                        <ColorSwitcher themedDivRef={themedDivRef} />
                    </div>
                </div>
                <div className="w-full h-1/2 flex flex-row justify-between items-center pl-6 pr-6 ">
                    <div className=" w-[100%] min-w-[300px] h-full flex justify-center items-center pr-4 ">
                        <SubtTextModule />
                    </div>
                    <div className=" w-[5%] min-w-[200px] rounded-l-3xl h-full flex justify-end items-center  border-b-2 border-purple-300 ">
                        <CurrentAllEvent />
                    </div>
                    <div className=" w-[15%] min-w-[200px] h-full flex justify-end items-center  border-b-2 border-purple-300">
                        <ClockModule />
                    </div>
                </div>
            </header>
            <article className=" w-full h-auto p-5 bg-transparent">
                <div>
                    <Calendar />
                </div>
            </article>
            <footer className=" w-full h-auto bg-green-600 flex justify-center items-center p-5">
                <div className=" w-[95%] min-h-[600px] bg-slate-400 flex justify-center items-center">
                    <MessageList />
                </div>
            </footer>
        </div>
    )
};

export default Content;
