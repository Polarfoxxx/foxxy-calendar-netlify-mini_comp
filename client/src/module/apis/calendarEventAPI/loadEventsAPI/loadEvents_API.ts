import axios from "axios";
import { Type_from_loadEvent_API } from "./types";
import { BASE_URL } from "../../BASE_URL";

async function loadEvent_API(user: string): Promise<Type_from_loadEvent_API | undefined> {
 
    try {
        const LOAD_DATA = await axios.get(`${BASE_URL}loadEvents/events`, {
            params: {
                userName: user
            }
        });
        console.log(LOAD_DATA.data);

        return {
            status: LOAD_DATA.status,
            data: LOAD_DATA.data.message
        };
    } catch (error) {
        console.error(error);
        return undefined;
    };
};

export default loadEvent_API;
