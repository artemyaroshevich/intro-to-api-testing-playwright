import { randomUUID } from 'node:crypto'


export class LoanCalcSignDto {
  uuid: string


 private constructor(uuid: string) {
    this.uuid = uuid
  }

  static createUuid():LoanCalcSignDto {
    return new LoanCalcSignDto('')
  }
}