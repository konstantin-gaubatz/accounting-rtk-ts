import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";
import {clearToken, setToken} from "../../features/token/tokenSlice.ts";

interface ChangePasswordProps {
    close: () => void;
}


const ChangePassword = ({close}: ChangePasswordProps) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [changePassword] = useChangePasswordMutation();
    const token = useAppSelector(state => state.token);
    const {data} = useFetchUserQuery(token)

    const dispatch = useAppDispatch();

    const handleClickClear = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmedPassword('');
    }

    const handleClickSave = async () => {
        if (oldPassword &&
            newPassword &&
            confirmedPassword &&
            newPassword === confirmedPassword) {
            dispatch(clearToken());
            const token = createToken(data!.login, oldPassword);
            try {
                await changePassword({token, newPassword});
                dispatch(setToken(createToken(data!.login, newPassword)));
            } catch (error) {
                console.log('change password error', error);
            }
            close();
        } else {
            alert('All fields must be filled');
        }
    }

    return (
        <>
            <label>Old Password:
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </label>
            <label>New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <label>Confirm Password:
                <input
                    type="password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                />
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;