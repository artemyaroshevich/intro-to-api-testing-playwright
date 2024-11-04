export class LoanCalcDto {
  amount:number
  period:number

 private constructor(amount: number, period: number) {
    this.amount = amount
    this.period = period
  }
}