import {IObject} from "./IObject"
import {IConsts} from "./IConsts"
import {IVariables} from "./IVariables"

export interface IApp {
    tanks: IObject[]
    bullets:  IObject[]
    bulletsIndex: number
    mainTank: IObject
    const: IConsts
    variables: IVariables
}