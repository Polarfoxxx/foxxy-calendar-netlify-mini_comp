import React from "react";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { createData_API } from "../../../apis/index.";
import { NewRequest } from "../../../utils";
import { Container } from "../../../ContainerModule";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Type_for_newEventFor_API } from "../../../CalendarModule";
import { Type_for_newMesssageFrom_DB, Type_for_newMessageFor_API } from "./types";
import { ValidMessageList, InvalidMessageList } from "./router";
import { Route, Routes, Link, NavLink, Navigate, useNavigate } from "react-router-dom";

function MessageList(): JSX.Element {
    const [messageList, setMessageList] = React.useState<Type_for_newMesssageFrom_DB[]>([]);
    const [newMessage, setNewMessage] = React.useState<any>({ start: "", end: "" });
    const [contentSize, setContetntSize] = React.useState<boolean>();
    const { handleSubmit, reset } = useInputValue();
    const { appData, setAppData } = React.useContext(Container.Context);
    const divRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (appData.allMessage.length > 0) {
            setMessageList(appData.allMessage)
        };
    }, [JSON.stringify(appData.allMessage), appData.allMessage.length]);


    const submit = (v: TypeForInputsObject["v"]): void => {
        const NEW_REQ = new NewRequest({
            startDate_message: new Date(),
            title_message: v[0].inputValues.toString(),
            content_Message: v[1].inputValues.toString(),
            endDate_message: v[2].inputValues.toString()
        });
        const CREATE_DATA: Type_for_newEventFor_API | Type_for_newMessageFor_API | string = NEW_REQ.create();
        if (typeof CREATE_DATA !== "string" && "message" in CREATE_DATA) {
            createAsyncData(CREATE_DATA); reset();
            setAppData(prevAppData => ({
                ...prevAppData,
                allMessage: [...prevAppData.allMessage, CREATE_DATA.message]
            }));
        } else {
            alert(CREATE_DATA)
        };
    };

    async function createAsyncData(CREATE_DATA: Type_for_newMessageFor_API) {
        const USER_NAME = appData.userLogData.userName;
        try {
            const CREATE = await createData_API({ USER_NAME, CREATE_DATA });
            console.log(CREATE);
        }
        catch (error) {
            console.log(error);
        };
    };

    React.useEffect(() => {
        const updateWidth = () => {
            if (divRef.current) {
                if (divRef.current.offsetHeight < 600) {
                    setContetntSize(false)
                } else {
                    setContetntSize(true)
                };
            };
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);



    return (
        <div
            ref={divRef}
            id="messageContent"
            className='w-full h-full flex items-center justify-center'>
            <div className={
                contentSize
                    ? "w-full h-full flex items-center justify-start flex-col bg-thems-messageContent_background"
                    : "w-full h-full flex items-center justify-start flex-col bg-thems-messageContent_background p-4"
            }>
                <div className={
                    contentSize
                        ? "  w-full h-[10%] min-h-[80px] flex items-center justify-between flex-row"
                        : "  w-full min-h-[70%] flex items-center justify-between flex-row"
                }>
                    <div className={
                        contentSize
                            ? " w-[100%] h-[100%] bg-thems-minBackg_content flex items-center justify-center rounded-tl-[10px] rounded-tr-[10px]"
                            : " w-[100%] h-[100%] bg-thems-minBackg_content flex items-center justify-center  rounded-tl-[10px] rounded-tr-[10px]"
                    }>
                        <h2 className={
                            contentSize
                                ? "text-[25px] text-thems-defaultTextColor"
                                : "text-[30px] text-thems-defaultTextColor"
                        }>
                            Message
                        </h2>
                    </div>
                </div>
                <div className={
                    contentSize
                        ? " w-full h-[18%] flex items-center justify-center"
                        : "w-full min-h-[30%] flex items-center justify-center"
                }>
                    <form
                        className={
                            contentSize
                                ? "w-full h-[100%] p-2 flex justify-center rounded-tr-[10px] items-center flex-col gap-5 bg-thems-newMessageForm_Background"
                                : " hidden"
                        }
                        onSubmit={(e) => handleSubmit(e, submit)}>
                        <div className="w-full h-full flex justify-center items-center flex-row gap-2 ">
                            <div className="w-[300px] h-[100%] flex justify-center items-center flex-col">
                                <div className=" w-[100%] h-[20%] flex justify-center items-center">
                                    <h3 className=" text-thems-defaultTextColor">
                                        The title for new message
                                    </h3>
                                </div>
                                <div className=" w-[100%] h-[100%] flex justify-center items-center ">
                                    <input
                                        className=" w-[300px] h-[25px] text-center pl-2 pr-2 rounded-lg text-[14px]"
                                        placeholder="Title message"
                                        name="message"
                                        type="text" />
                                </div>
                            </div>
                            <div className="w-[850px] h-[100%] flex justify-center items-center flex-col">
                                <div className=" w-[100%] h-[20%] flex justify-center items-center">
                                    <h3 className=" text-thems-defaultTextColor">
                                        The content for new message
                                    </h3>
                                </div>
                                <div className=" w-[100%] h-[100%] flex justify-center items-center">
                                    <input
                                        className=" w-[100%] h-[25px] text-center pl-2 pr-2 rounded-lg text-[14px]"
                                        placeholder="Message"
                                        name="message"
                                        type="text" />
                                </div>
                            </div>
                            <div className="w-[300px] h-[100%] flex justify-center items-center flex-col">
                                <div className=" w-[100%] h-[20%] flex justify-center items-center">
                                    <h3 className=" text-thems-defaultTextColor">
                                        Last termin
                                    </h3>
                                </div>
                                <div className=" w-[100%] h-[100%] flex justify-center items-center">
                                    <DatePicker
                                        autoComplete="false"
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Čas"
                                        dateFormat="dd.MM.yyyy HH:mm"
                                        name="startDate"
                                        className=" w-[300px] h-[25px] rounded-lg pl-2 pr-2 text-center border border-thems-inputBorder text-[14px]"
                                        placeholderText="Due Date"
                                        selected={newMessage.start}
                                        onChange={(start) => setNewMessage({ ...newMessage, start })} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[100%] flex justify-center items-center flex-row">
                            <div className="w-full h-full flex justify-center items-center">
                                <button
                                    className=" w-[280px] h-[36px] border border-thems-minBackg_content rounded-xl bg-thems-background_button text-thems-defaultTextColorDark hover:bg-thems-background_button_hover"
                                    type="submit">
                                    Create new message
                                </button>
                            </div>
                            <div className=" w-full h-full flex items-center justify-around bg-thems-newMessageForm_Background">
                                <NavLink
                                    className="m-2 flex justify-center items-center text-[14px] w-[220px] h-[25px] border border-thems-minBackg_content rounded-xl  hover:bg-thems-background_button_hover"
                                    style={({ isActive }) => ({
                                        backgroundColor: isActive ? 'var(--minBackg_content)' : 'var(--background_button)',
                                        color: isActive ? 'var(--defaultTextColor)' : 'var(--defaultTextColorDark)',
                                    })}
                                    to="ValidMessageList">
                                    Your note
                                </NavLink>
                                <NavLink
                                    className="m-2 flex justify-center items-center text-[14px] w-[220px] h-[25px] border border-thems-minBackg_content rounded-xl hover:bg-thems-background_button_hover"
                                    style={({ isActive }) => ({
                                        backgroundColor: isActive ? 'var(--minBackg_content)' : 'var(--background_button)',
                                        color: isActive ? 'var(--defaultTextColor)' : 'var(--defaultTextColorDark)',
                                    })}
                                    to="InvalidMessageList"
                                >Fulfilled note
                                </NavLink>
                            </div>
                            <div className="w-full h-full flex justify-center items-center ">
                                <div className="w-[50%] h-[50%] flex justify-center items-center flex-row bg-thems-minBackg_content rounded-lg gap-6">
                                    <div className="w-[100%] h-[100%] flex justify-end items-center">
                                        <h2 className=" text-thems-defaultTextColor text-[14px]">
                                            All message count:
                                        </h2>
                                    </div>
                                    <div className="w-[30%] h-[25px] flex justify-start items-center">
                                        <h1 className=" text-[17px] text-thems-defaultTextColor">
                                            {appData.allMessage.length}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {
                        /* mini content--------------------------------------------------------- */
                        !contentSize &&
                        <div className="w-full h-[100%] flex justify-center items-center relative ">
                            <div className="w-[100%] h-[100%] flex justify-center items-center flex-row bg-thems-item_Background rounded-bl-[10px] rounded-br-[10px] gap-6">
                                <h2 className=" text-thems-defaultTextColorDark text-[16px]">
                                    All message count:
                                </h2>
                                <h1 className=" text-[20px] text-thems-defaultTextColorDark">
                                    {
                                        appData.allMessage.filter(item => item.status === true).length
                                    }
                                </h1>
                            </div>
                        </div>
                    }
                </div>

                <div className=" w-full h-[700px] h-max-[700px] overflow-x-auto min-h-[500px] flex items-start justify-center" >
                    <div className=" w-[100%] h-[100%] flex justify-center items-center  bg-thems-calendarContent_background rounded-br-[10px] rounded-bl-[10px]">
                        <Routes>
                            <Route
                                path="ValidMessageList"
                                element={
                                    <ValidMessageList
                                        messageList={messageList} />}
                            />
                            <Route
                                path="InvalidMessageList"
                                element={
                                    <InvalidMessageList
                                        messageList={messageList} />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MessageList;