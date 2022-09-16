
//Parameters which can be passed with the endpoint

//ACCOUNT
interface Account {
    id : number,
    fullName : string,
    birthdate : Date | number,
    addressId : number
    email : string,
    taxNumber : number,
    pinCode : number,
    createdAt : Date | number,
    balance : number,
    updatedAt : Date | number
}

//Address
interface Address {
    id : number,
    line1 : string,
    line2? : string,
    postalCode: string,      
    city : string, 
    district : string, 
    updatedAt : Date | number          
}

//TRANSFER  
interface Transfers {
    id : number
    date : Date | number,
    senderID :  number,              
    recieverId : number,
    amount : number,
    metadata : Record<string, string>,     
    notes : string, 
    image : HTMLImageElement | String | File    
    updatedAt : Date
}

//CARDS
interface Cards {
    id : number
    name : string, 
    expiryDate : Date | number, 
    pinCode : number,
    dateCreation : Date | number,
    //accountId : number, 
    createdAt : Date | number
}    

interface DirectDebit {
    id : number, 
    active : boolean, 
    amount : number, 
    date : Date | number, 
    receiverId : number, 
    senderId : number, 
    lastDebitId : number, 
    updatedAt : Date | number
}

interface StandingOrder {
    id : number, 
    date : Date | number, 
    receiverId : number, 
    amount : number, 
    frequency : Frequency, 
    senderId : number, 
    updatedAt : Date | number
}

type Frequency = "DAILY" |"WEEKLY" | "MONTHLY" | "YEARLY";

interface TelcoProviders {
    id : number, 
    nome : String, 
    updatedAt : Date | number
}

type TransactionType = "INCOME" | "EXPENSE";




type AuthenticatedError = TooManyRequestsError | UnauthenticatedError | UnauthorizedError;


type GetAccountError = GetUserBadRequestError | AuthenticatedError

type AccountResponse = GetAccountSuccess | GetAccountError

type AccountRequest = GetAccountSuccess | GetAccountError


type GetTransfertError = GetUserBadRequestError | AuthenticatedError | TooManyRequestsError

type GetTransactionsError = GetUserBadRequestError | AuthenticatedError | TooManyRequestsError

type GetDirectDebitError = GetUserBadRequestError | AuthenticatedError | TooManyRequestsError

type GetCardsError = GetUserBadRequestError | AuthenticatedError | TooManyRequestsError

type GetStandingOrderError = GetUserBadRequestError | AuthenticatedError | TooManyRequestsError



//ERRORS
interface GetAccountSuccess extends Account {
    id : number,
    code : 200
}

interface GetAccountRedirect extends Account {
    id : number,
    code : 300
}

interface GetUserBadRequestError {
    code: 400
    description : "user.badRequest"
}


interface UnauthenticatedError {
    code : 401,
    description : 'apiError.unauthenticated', 
    message : "The request requires authentication or valid credentials"
}

interface ForbiddenError {
    code : 403,
    description : 'apiError.forbidden'
    message : "Received valid credentials that are not adequate to gain access"
}

interface NotFoundError {
    code : 404,
    description : 'apiError.notFound'
    message : "Page not found"
}

interface HasBalanceError {
    code : 422,
    description : 'apiError.unprocessableEntity'
    message : "Unprocessed request due to semantic error"
}

interface ConflictError {
    code : 409,
    description : 'apiError.confictError'
    message : "The request could not be completed due to a conflict with the current state of the resource" 
}


interface TooManyRequestsError {
    code : 429,
    description : 'apiError.tooManyRequests'
    message : "Too many requests sent"
}



