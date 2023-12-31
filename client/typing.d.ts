export interface serverToClient {
    serverMsg : (data : {msg : string ; room : string}) => void
}
export interface clientToServer {
    clientMsg : (data : {msg : string ; room : string}) => void
}