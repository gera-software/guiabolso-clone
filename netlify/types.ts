export type Institution = {
    _id?: String,
    pluggyConnectorId?: Number,
    name: String,
    imageUrl?: String,
    primaryColor?: String,
}

export interface DataProvider {
    fetchInstitutions(): Promise<Institution[]>
}