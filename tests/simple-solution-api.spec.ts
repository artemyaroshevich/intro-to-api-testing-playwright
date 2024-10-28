import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './order-dto'


test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with correct', async ({ request }) => {
  const requestBody = OrderDto.createOrderWithRandomData()
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.status).toBe('OPEN')
  expect.soft(responseBody.courierId).toBeDefined()
  expect.soft(responseBody.customerName).toBeDefined()
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with symbol incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/i')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with incorrect data should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'CLOSE',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('put order with correct data', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  }

  const requestHeaders = {
    'api_key' : '1234567890123456',
  };

  // Send a PUT request to the server
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1/', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('put order with correct data incorrect id status 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  }

  const requestHeaders = {
    'api_key' : '1234567890123456',
  };

  // Send a PUT request to the server
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0/', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Order deleted successfully', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  }

  const requestHeaders = {
    'api_key' : '1234567890123456',
  };

  // Send a delete request to the server
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1/', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Order deleted unsuccessfully', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  }

  const requestHeaders = {
    'api_key' : '1234567890123456',
  };

  // Send a delete request to the server
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0/', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Authenticate a user by providing a valid username and password', async ({ request }) => {
  // prepare request body
  const requestBody = {
    message: 'string',
    apiKey: 'string',
  }
  // Send a get request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders?username=alex&password=1234', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Authenticate a user by providing with empty username and password', async ({ request }) => {
  // prepare request body
  const requestBody = {
    message: 'string',
    apiKey: 'string',
  }
  // Send a get request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders?username=&password=', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
