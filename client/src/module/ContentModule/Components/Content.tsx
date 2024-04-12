import React from "react";
import "./style/content_style.css";
import { servicesJWTdecodeAndValidity } from "../../utils";
import { useNavigate } from "react-router-dom";
import { LogOut, ColorSwitcher, TittleBar } from "../../HeaderModule";
import { Calendar } from "../../CalendarModule";
import { MessageList } from "../../MessageModule";
import { SubtText, Clock, CurrentAllEvent } from "../../SubtitleModule";
import { Container } from "../../ContainerModule";
import { readData_API } from "../../apis/index.";

function Content(): JSX.Element {
    const { appData, setAppData } = React.useContext(Container.Context)
    const NAVIGATE = useNavigate();
    const themedDivRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const JWT = localStorage.getItem("JWT");
        if (JWT !== null) {
            !servicesJWTdecodeAndValidity(JWT) && NAVIGATE("/LoginPage")
        } else {
            NAVIGATE("/LoginPage")
        };
    }, [NAVIGATE]);


    React.useEffect(() => {
        loadDataAPI()
    }, []);

    async function loadDataAPI() {
        const USER_NAME = localStorage.getItem("USER_NAME");
        if (USER_NAME !== null) {
            try {
                const LOAD_DATA = await readData_API(USER_NAME);
                if (LOAD_DATA) {
                    setAppData(prevAppData => ({
                        ...prevAppData, 
                        userLogData: {
                            ...prevAppData.userLogData, 
                            appTheme: LOAD_DATA.data.theme 
                        },
                        allEvents: LOAD_DATA.data.events, 
                        allMessage: LOAD_DATA.data.messages 
                    }));
                };
            } catch (error) {
                console.log("Chyba pri načítavaní udalostí:", error);
            };
        }
    };




    return (
        <div
            ref={themedDivRef}
            data-theme=""
            className=" w-full h-full flex bg-white flex-col justify-center items-center bg-background_App bg-fullApp bg-no-repeat">
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
                        <SubtText />
                    </div>
                    <div className=" w-[5%] min-w-[200px] rounded-l-3xl h-full flex justify-end items-center  border-b-2 border-purple-300 ">
                        <CurrentAllEvent />
                    </div>
                    <div className=" w-[15%] min-w-[200px] h-full flex justify-end items-center  border-b-2 border-purple-300">
                        <Clock />
                    </div>
                </div>
            </header>
            <article className=" w-full h-auto p-5 bg-transparent  flex justify-center items-center">
                <div className=" w-[90%] h-auto flex justify-center items-center">
                    <Calendar />
                </div>
            </article>
            <footer className=" w-full h-auto flex justify-center items-center p-5">
                <div className=" w-[90%] min-h-[600px] flex justify-center items-center">
                    <MessageList />
                </div>
            </footer>
        </div>
    )
};

export default Content;

