export interface User extends Document{
    _id: string,
    from_id: string,
    email: string;
    password: string;
    name: string;
    lastname: string,
    type: number,
    birth: string,
    placebirth: string,
    telefono: string,
    cellulare: string,
    direction: string,
    city: string,
    prov: string,
    cap: string,
    special: string
}