import ProfileData from "./ProfileData.tsx";
import UpdateUser from "./UpdateUser.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {clearToken} from "../../features/token/tokenSlice.ts";

const Profile = () => {

    const dispatch = useAppDispatch();

    const handleClickLogOut = () => {
        dispatch(clearToken());
    }

    return (
        <div>
            <ProfileData/>
            <button onClick={handleClickLogOut}>Logout</button>
            <UpdateUser/>
        </div>
    );
};

export default Profile;