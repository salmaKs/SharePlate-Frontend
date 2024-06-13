import {user} from "./user.model";
import {donation} from "./donation.model";

export interface review {
  rating: number,
  comment: string,
  user: user,
  donation: donation
}
