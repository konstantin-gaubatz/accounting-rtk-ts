import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {updateUser} from "../../features/api/accountApi.ts";

interface EditProfileProps {
    close: () => void;
}

const EditProfile = ({close}: EditProfileProps) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();

    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }

    const handleClickSave = () => {
        dispatch(updateUser({firstName, lastName}));
        close();
    }

    return (
        <>
            <label>
                First Name:
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last Name:
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
                <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default EditProfile;