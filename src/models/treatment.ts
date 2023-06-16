export interface TreatmentModel extends Document{
    from_id: string,
    to_id: string,
    note: string,
    from_name: string,
    to_name: string,
    email: string
}