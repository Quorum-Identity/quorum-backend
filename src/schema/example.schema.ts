export type Params = {
    page: String,
    id: String
};
export type PayLoadPages = {
    body: {
        page: Params['page']
    }
};
export type PayLoadCharacter = {
    body: {
        id: Params['id']
    }
};






