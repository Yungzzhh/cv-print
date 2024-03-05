export interface PersonalInfoList {
    key: PersonInfoKey,
    infoOption: string,
    context: string,
    order: number
}

export type PersonInfoKey = 'name' | 'phone' | 'email'
