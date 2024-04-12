import React from 'react';
import { createData_API } from '../../../apis/index.';
import { Container } from '../../../ContainerModule';
import { Type_for_saveDataTheme, Type_for_colorSwitcher } from './types';


function ColorSwitcher(props: Type_for_colorSwitcher): JSX.Element {
    const { appData } = React.useContext(Container.Context);
    const [app_theme, setApp_theme] = React.useState("");

    /* nacitanie nstavej farby z db */
    React.useEffect(() => {
        const LOAD_THEME = appData.userLogData.appTheme;
        LOAD_THEME &&
            props.themedDivRef.current?.setAttribute("data-theme", LOAD_THEME);
        setApp_theme(LOAD_THEME)
    }, [appData.userLogData.appTheme]);

    const handleColorChange = (selectTheme: string) => {
        props.themedDivRef.current?.setAttribute("data-theme", selectTheme);
        setApp_theme(selectTheme);
        /*    createAsynctheme(selectTheme); */
    };

    async function createAsynctheme(selectTheme: string) {
        const USER_NAME = appData.userLogData.userName
        const CREATE_DATA: Type_for_saveDataTheme = {
            custom: {
                theme: selectTheme
            },
        };
        try {
            const CREATE = await createData_API({ USER_NAME, CREATE_DATA });
            console.log('Result:', CREATE);
        } catch (error) {
            console.error('Error:', error);
        };
    };

    return (
        <div className=' w-full h-full flex flex-row items-center gap-3 justify-end p-2 pr-8 bg-transparent'>
            <label
                className=' text-thems-defaultTextColorDark'
                htmlFor="colorSwitcher">
                Color theme:
            </label>
            <select
                className=' w-16 text-center rounded-md cursor-pointer'
                id="colorSwitcher"
                value={app_theme}
                onChange={(e) => handleColorChange(e.target.value)}>
                <option value="light">light</option>
                <option value="dark">dark</option>
            </select>
        </div>
    );
};

export default ColorSwitcher;
