export class LoanCalcDecisionDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  private static calcDecision(): LoanCalcDecisionDto {
    return new LoanCalcDecisionDto(1, 1, 18, true, 2, 6)
  }

  static incorrectCalcDecision(): LoanCalcDecisionDto {
    return new LoanCalcDecisionDto(0, 0, 0, true, 0, 0)
  }
}
