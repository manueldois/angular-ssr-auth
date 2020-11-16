import { URL } from "url";

export interface User {
    username: string,
    password: string,
    movies?: string[],
    profilePicPath?: string
}

export interface Movie {
    title: string,
    likes: number
}