# Legal Cash Agent API Documentation

## Overview

The Legal Cash Agent API provides endpoints for managing legal cash flows, expenses, billing, and financial reporting.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

#### GET /health

Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2023-08-05T09:51:00.000Z"
}
```

### Cash Management

#### GET /cash/balance

Get current cash balance.

**Response:**
```json
{
  "balance": 50000.00,
  "currency": "USD",
  "lastUpdated": "2023-08-05T09:51:00.000Z"
}
```

#### POST /cash/transaction

Create a new cash transaction.

**Request Body:**
```json
{
  "type": "income|expense",
  "amount": 1000.00,
  "description": "Client payment for case XYZ",
  "category": "client_payment",
  "date": "2023-08-05"
}
```

### Expense Tracking

#### GET /expenses

Get all expenses with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by expense category
- `dateFrom` (optional): Start date for filtering
- `dateTo` (optional): End date for filtering
- `limit` (optional): Number of results to return (default: 50)
- `page` (optional): Page number for pagination (default: 1)

#### POST /expenses

Create a new expense record.

**Request Body:**
```json
{
  "amount": 250.00,
  "description": "Court filing fees",
  "category": "court_fees",
  "date": "2023-08-05",
  "receipt": "base64-encoded-receipt-image"
}
```

### Billing & Invoicing

#### GET /invoices

Get all invoices.

#### POST /invoices

Create a new invoice.

#### GET /invoices/:id

Get a specific invoice by ID.

#### PUT /invoices/:id

Update an invoice.

#### DELETE /invoices/:id

Delete an invoice.

### Financial Reporting

#### GET /reports/cash-flow

Get cash flow report for a date range.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

#### GET /reports/expenses

Get expense report for a date range.

#### GET /reports/profit-loss

Get profit and loss statement.

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": ["Field 'amount' is required"]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.

## Versioning

The API version is included in the URL path. Current version is v1. 