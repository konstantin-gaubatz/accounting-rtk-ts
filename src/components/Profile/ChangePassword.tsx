import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";

interface ChangePasswordProps {
    close: () => void;
}


const ChangePassword = ({close}: ChangePasswordProps) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const dispatch = useAppDispatch();

    const handleClickClear = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmedPassword('');
    }

    const handleClickSave = () => {
        if (newPassword === confirmedPassword) {
            dispatch(changePassword({newPassword, oldPassword}));
            close();
        } else {
            alert('Passwords do not match');
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