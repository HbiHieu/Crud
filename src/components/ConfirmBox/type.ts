export type ConfirmBoxType = "warning" | "alert" ;
export interface ConfirmBoxAction {
    message : string ,
    yes : () => void ,
    no?: () => void ,
}
export type createConfirmFunc = ( type : ConfirmBoxType , action : ConfirmBoxAction ) => void ;
export type conFirmBoxFunc = ( action:ConfirmBoxAction ) => void ;