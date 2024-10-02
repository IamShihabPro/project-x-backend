export type TSignUp = {
    name: string;
    email: string;
    image: string;
    role: 'user' | 'admin';
    password: string;
    isDeleted: boolean;
}

// export type TSignin = {   
//     email: string;
//     password: string;
// }