import {user} from "./user.model";
import {donation} from "./donation.model";

export interface receipt{
  id:number;
  dateReceived: Date,
  quantity: number,
  unit: string,
  receiver: user,
  donation: donation
}
