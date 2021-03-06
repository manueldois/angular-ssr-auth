import { Movie, User } from "./interfaces";

export const users: User[] =
    [
        {
            username: 'Ana',
            password: 'ana123',
            profilePicPath: 'static/ana.jpg'
        },
        {
            username: 'Andrea',
            password: 'andrea123',
            profilePicPath: 'static/andrea.jpg'
        },
        {
            username: 'Martin',
            password: 'martin123',
            profilePicPath: 'static/martin.jpg'
        }
    ]

export const movies: Movie[] = [
    {
        title: 'Barb Wire',
        likes: 40
    },
    {
        title: 'Blood of Heroes, The (Salute of the Jugger, The)',
        likes: 68
    },
    {
        title: 'Dust to Glory',
        likes: 75
    },
    {
        title: 'Rape of Europa, The',
        likes: 38
    },
    {
        title: 'On the Outs',
        likes: 20
    },
    {
        title: 'Buried Alive',
        likes: 99
    },
    {
        title: 'Paper Soldier (Bumazhnyy soldat)',
        likes: 39
    },
    {
        title: 'Love & Sex',
        likes: 58
    },
    {
        title: 'The Tomb',
        likes: 95
    },
    {
        title: 'Assassination Bureau, The',
        likes: 68
    }
]