export interface HistoryModel extends Document{
  from_id: String,
  to_id: String,
  from__name: String,
  to_name: String,
  ammount: String | Number,
  type: String,
  by_id: String,
  by_name: String
}