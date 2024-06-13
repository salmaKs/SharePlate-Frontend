import {receipt} from "./receipt.model";
import {donation} from "./donation.model";

export enum role{
  donor= 'donor',
  receiver = 'receiver'
}
export enum typeDonor{
  hotel= 'hotel',
  restaurant= 'restaurant',
  campaign= 'campaign',
  person = 'person'

}
export enum gouvTun{
  Ariana='Ariana',
  Béjà='Béjà',
  Ben_Arous='Ben_Arous',
  Bizerte='Bizerte',
  Gabes='Gabes',
  Gafsa='Gafsa',
  Jendouba='Jendouba',
  Kairouan='Kairouan',
  Kasserine='Kasserine',
  Kebili='Kebili',
  Kef='Kef',
  Mehdia='Mehdia',
  Mannouba='Mannouba',
  Mestir='Mestir',
  Mednine='Mednine',
  Monastir='Monastir',
  Nabeul='Nabeul',
  Sfax='Sfax',
  Sidi_bouzid='Sidi_bouzid',
  Siliana='Siliana',
  Sousse='Sousse',
  Tataouine='Tataouine',
  Touzeur='Touzeur',
  Tunis='Tunis',
  Zaghouen='Zaghouen'
}
export interface  user {
nom: string,
  prenom: string,
  dateNaissance: Date,
  mail: string,
  role: role,
  typeDonor: typeDonor,
  tel: number,
  password: string,
  CIN: number,
  gouvTun: gouvTun,
  receipts: Array<receipt>
  donations: Array<donation>
}
