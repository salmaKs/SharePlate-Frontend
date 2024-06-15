import {review} from "./review.model";
import {user} from "./user.model";

export enum donationType{
  vegetables ='vegetables',
  fruits='fruits',
  medecine='medecine',
  prepared_plates='prepared_plates',
  clothing='clothing',
  baby_supplies='baby_supplies',
  hygiene_products='hygiene_products'
}
export interface donation{
  id: number,
  donationType: donationType,
  quantity: number,
  unit: string,
  availability: Date,
  pickupLocation: string,
  description: string,
  donor: user,
  review: Array<review>
}
