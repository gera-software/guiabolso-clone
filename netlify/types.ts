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

export interface DataProvider {
    fetchInstitutions(): Promise<Institution[]>
}