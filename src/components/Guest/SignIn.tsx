import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {useLazyFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

const SignIn = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const [fetchUser] = useLazyFetchUserQuery();

    const handleClickSignIn = async () => {
        const token = createToken(login, password);
        try {
            const {error} = await fetchUser(token);
            if (error) {
                throw error;}
            dispatch(setToken(token));
        } catch (error) {
            console.log('sign in error', error);
        }
    }

    const handleClickClear = () => {
        setLogin("");
        setPassword("");
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
            <button onClick={handleClickSignIn}>Sign In</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default SignIn;