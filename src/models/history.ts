export interface HistoryModel extends Document{
  from_id: String,
  to_id: String,
  from__name: String,
  to_name: String,
  ammount: String | Number,
  data: String,
  type: String
}