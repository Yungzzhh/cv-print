export class ListOrder {
    order = 0
    constructor(order: number) {
        this.order = order
    }
}

export type StoreModuleKey = 'personalInfo' | 'skills' | 'company' | 'project' | 'edu'

export type TimeType = [string, string]
