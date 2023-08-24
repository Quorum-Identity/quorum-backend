export interface User extends Document{
    _id: string,
    email: string,
    password: string,
    name: string,
    lastname: string,
    votations: any,
    company: string,
    type: number,
    birth: string,
    placebirth: string,
    identification_number: string
}