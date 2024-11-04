export class LoanCalcDecisionDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

 private constructor(income: number, debt: number, age: number, emploeyd: boolean, loanAmount: number, loanPeriod: number) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = emploeyd
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static calcDecision(): LoanCalcDecisionDto {
    return new LoanCalcDecisionDto(1,1,18,true,2,6)
  }
}