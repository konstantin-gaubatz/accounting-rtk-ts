import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {useRegisterUserMutation} from "../../features/api/accountApi.ts";
import {setToken} from "../../features/token/tokenSlice.ts";
import {createToken} from "../../utils/constants.ts";

const SignUp = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useAppDispatch();
    const [registerUser] = useRegisterUserMutation();


    const handleClickSignUp = async () => {
        try {
            const data = await registerUser({login, password, firstName, lastName}).unwrap();
            dispatch(setToken(createToken(data.login, password)));
        } catch (error){
            console.log(error);
        }
    }

    const handleClickClear = () => {
        setLogin("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }

    return (
        // Это контролируемый компонент.
        <>
            <label>
                Login
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                First Name
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last Name
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleClickSignUp}>Sign Up</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
}

export default SignUp;