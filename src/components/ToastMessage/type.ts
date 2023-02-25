export type MessageType = 'Info' | 'Success' | 'Warning' | 'Error' ;
export type createMessageFunc = ( type:MessageType ,message : string ) => void ;