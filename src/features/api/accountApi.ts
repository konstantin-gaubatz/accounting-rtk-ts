import {base_url} from "../../utils/constants.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {UserData, UserProfile, UserRegister} from "../../utils/types";

export const accountApi = createApi({
    reducerPath: "account",
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: user => ({
                url: '/accounter/register',
                method: "POST",
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: "/account/login",
                method: "POST",
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['profile']
        }),
        updateUser: builder.mutation<UserProfile, {login: string, token: string, userData: Omit<UserData, 'login'>}>({
            query: ({userData, login, token}) => ({
                url: `/account/user/${login}`,
                method: "PATCH",
                body: userData,
                headers: {
                    Authorization: token
                }
            }),
            invalidatesTags: ['profile']
        }),
        changePassword: builder.mutation<void, {newPassword: string, token: string}>({
            query: ({newPassword, token}) => ({
                url: '/account/password',
                    method: "PATCH",
                headers: {
                    Authorization: token
                },
                body: {
                    password: newPassword
                }
            }),
            invalidatesTags: ['profile']
        })
    })
})

export const {useLazyFetchUserQuery, useRegisterUserMutation, useFetchUserQuery, useChangePasswordMutation, useUpdateUserMutation} = accountApi;

/*
export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/accounter/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // В кавычках потому что в названии поля есть - или иные символы.
            },
            body: JSON.stringify(user)
        });
        if (response.status === 409) {
            throw new Error(`User ${user.login} already exists`)
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        return {
            user: data,
            token
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/account/login`, {
            method: 'POST',
            headers: {
                Authorization: token
            }
        })
        if (response.status === 401) {
            throw new Error('Login or password incorrect')
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        const data = await response.json();
        return {
            user: data,
            token
        }
    }
)

type UserUpdate = Omit<UserData, 'login'>

export const updateUser = createAsyncThunk<UserProfile, UserUpdate, {state: RootState}>(
    'user/update',
    async (user: UserUpdate, {getState}) => {
        const response = await fetch(`${base_url}/account/user/${getState().user.login}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().token
            },
        body: JSON.stringify(user)
    })
        if (response.status === 401) {
            throw new Error('Login or password incorrect')
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        return await response.json();
    }
)

export const changePassword = createAsyncThunk<string, {newPassword: string, oldPassword: string }, {state: RootState}>(
    'user/password',
    async ({newPassword, oldPassword}, {getState}) => {
        const response = await fetch(`${base_url}/account/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: createToken(getState().user.login, oldPassword)
            },
            body: JSON.stringify({password: newPassword})
        })
        if (response.status === 401) {
            throw new Error('Login or password incorrect')
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`)
        }
        return createToken(getState().user.login, newPassword)
    }
)

 */