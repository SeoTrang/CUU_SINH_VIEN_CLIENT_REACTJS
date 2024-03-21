import userAPI from "../../services/api/userAPI";
import { FETCH_USER_DATA } from "../constant/constant";

const fetchUserData = () => {
    return async (dispatch) => {
        try {
            let user = await userAPI.getUser();
            dispatch({
                type: FETCH_USER_DATA,
                user: user,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
}

export {
    fetchUserData
}