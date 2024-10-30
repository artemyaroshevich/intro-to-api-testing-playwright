import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalcSignDto } from './loan-calc-sign-dto'

test('post method sign', async ({ request }) => {
  const requestBody = LoanCalcSignDto.createUuid()
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/sign', {
    data: requestBody,
  })
  // Log the response uuid
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.uuid).toBeDefined()

})