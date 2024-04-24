import {AddressModel} from "./address.model";
import {RepresentationModel} from "./representation.model";


export class UserModel extends RepresentationModel{

    public firstName: string
    public lastName: string
    public emailAddress: string
    public password: string
    public confirmPassword: string
    public uuid: string

}