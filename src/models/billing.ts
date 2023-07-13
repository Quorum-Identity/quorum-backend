export interface BillingModel extends Document{
    from_id: string,
    to_id: string,
    from_name: string,
    to_name: string,
    to_lastname: string,
    email: string,
    iva: string,
    phone: string,
    country: string,
    specialization: string,
    instagram: string
}