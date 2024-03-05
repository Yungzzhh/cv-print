import { ListOrder } from "../common"

export class EduItem extends ListOrder {

    school = ''
    major = ''
    degree = ''
    startTime = ''
    endTime = ''

    constructor(order: number) {
        super(order); 
    }
    
}