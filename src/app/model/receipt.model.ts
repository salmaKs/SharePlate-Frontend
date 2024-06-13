import {user} from "./user.model";
import {donation} from "./donation.model";

export interface receipt{
  dateReceived: Date,
  quantity: number,
  unit: string,
  receiver: user,
  donation: donation
}
