import { Type_for_newEventFrom_DB } from "../../CalendarModule";

export type Type_forProvider = {
    children: JSX.Element | JSX.Element[]
};

export type Type_for_appDataFromProvider = {
    userLogData: {
        userName: string,
        appTheme: string
    },
    allEvents: Type_for_newEventFrom_DB[]
};

export type Type_forContext = {
    appData: Type_for_appDataFromProvider,
    setAppData: React.Dispatch<React.SetStateAction<Type_for_appDataFromProvider>>
};

