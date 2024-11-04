import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalcDecisionDto } from './loan-calc-decision-dto'

// test('post method sign', async ({ request }) => {
//   const requestBody = LoanCalcSignDto.createUuid()
//   const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/sign', {
//     data: requestBody,
//   })
//   // Log the response uuid
//   console.log('response status:', response.status())
//   console.log('response body:', await response.json())
//   expect(response.status()).toBe(StatusCodes.OK)
//   const responseBody = await response.json()
//   expect(response.status()).toBe(StatusCodes.OK)
//
// })

test('post method calculate decision', async ({request}) => {
  const requestBody = LoanCalcDecisionDto.calcDecision()
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  const responseBody = await response.json()
  console.log('request body:', requestBody)
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBeDefined()

})

test('post method incorrect calculate decision', async ({request}) => {
  const requestBody = LoanCalcDecisionDto.incorrectCalcDecision()
  const response = await request.post('\n' +
    'https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  // const responseBody = await response.json()
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})