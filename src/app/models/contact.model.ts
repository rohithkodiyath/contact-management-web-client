import {AddressModel} from "./address.model";
import {RepresentationModel} from "./representation.model";


export class ContactModel extends RepresentationModel{

    public company: string
    public email: string
    public firstName: string
    public lastName: string
    public phone: string
    public uuid: string
    public website: string
    public address : AddressModel


}