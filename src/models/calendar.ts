export interface CalendarModel extends Document{
    from_id: string,
    to_id: string,
    note: string,
    start: string,
    end: string,
    from_name: string,
    to_name: string
}