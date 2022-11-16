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

export interface BankData {
    institution: Institution,
} 

export interface CreditData {
    institution: Institution,
    brand: String,
    creditLimit: Number,
    availableCreditLimit: Number,
    closeDate: Date,
    dueDate: Date,
}

export interface AccountDTO {
    _id?: String,
    name: String,
    imageUrl?: String,
    syncType: AccountSyncType,
    pluggyAccountId?: String,
    balance: Number,
    currencyCode: CurrencyCodes,
    type: AccountType,
    userId: String,
    accountOwner?: AccountOwner,
    connection?: Connection,
    bankData?: BankData,
    creditData?: CreditData,
}

export enum TransactionType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    POSTED = 'POSTED',
}

export interface Transaction {
    _id?: String,
    pluggyTransactionId?: String,
    description: String,
    amount: Number,
    currencyCode: CurrencyCodes,
    date: Date,
    category?: Category,
    type: TransactionType,
    status: TransactionStatus,
    comment?: String,
    ignored: Boolean,
    accountId: String,
    userId: String,
    _isDeleted: Boolean,
}

export interface AccountSummaryDTO {
    _id?: String,
    name: String,
    type: AccountType,
    imageUrl?: String,
  }
  
export interface TransactionSummaryDTO {
    _id?: String,
    description: String,
    amount: Number,
    currencyCode: CurrencyCodes,
    date: Date,
    category?: Category,
    type: TransactionType,
    status: TransactionStatus,
    ignored: Boolean,
    account: AccountSummaryDTO
  }

export interface DataProvider {
    fetchInstitutions(): Promise<Institution[]>
}