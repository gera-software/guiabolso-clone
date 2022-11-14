export interface Institution {
    _id?: String,
    pluggyConnectorId?: Number,
    name: String,
    imageUrl?: String,
    primaryColor?: String,
}

export interface Category {
    _id?: String,
    name: String,
    iconName: String,
    primaryColor: String
}

export interface User {
    _id?: String,
    name: String,
    email: String,
}

export enum AccountSyncType {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC'
} 

export enum AccountType {
    WALLET = 'WALLET',
    BANK = 'BANK',
    CREDIT_CARD = 'CREDIT_CARD'
}

export enum CurrencyCodes {
    BRL = 'BRL',
}

export interface AccountOwner {
    name: String,
    pluggyIdentityId?: String,
    cpf?: String,
}

export enum ConnectionStatus {
    UPDATING = 'UPDATING',
    LOGIN_ERROR = 'LOGIN_ERROR',
    OUTDATED = 'OUTDATED',
    WAITING_USER_INPUT = 'WAITING_USER_INPUT',
    UPDATED = 'UPDATED',
}

export interface Connection {
    pluggyItemId: String,
    lastUpdatedAt: Date,
    status: ConnectionStatus,
}

export interface BankAccountData {
    institution: Institution,
} 
export interface Account {
    _id?: String,
    name: String,
    syncType: AccountSyncType,
    pluggyAccountId?: String,
    balance: Number,
    currencyCode: CurrencyCodes,
    type: AccountType,
    userId: String,
    accountOwner?: AccountOwner,
    connection?: Connection,
    bankData?: BankAccountData
}

export interface DataProvider {
    fetchInstitutions(): Promise<Institution[]>
}