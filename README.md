# Legal Cash Agent - Express.js Server

An Express.js server that integrates with OpenAI's API to process prompts and return AI responses.

## Features

- Express.js server running on port 3000
- POST endpoint `/run-agent` that accepts JSON data and sends it to OpenAI
- Health check endpoint at `/health`
- Comprehensive error handling
- Environment variable configuration for API keys

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   You can get your API key from: https://platform.openai.com/api-keys

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /run-agent

Sends data to OpenAI's API and returns the AI response.

**Request Body:**
```json
{
  "data": "Your prompt or question here"
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI generated response",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Usage Examples

### Using curl:
```bash
curl -X POST http://localhost:3000/run-agent \
  -H "Content-Type: application/json" \
  -d '{"data": "What is the capital of France?"}'
```

### Using JavaScript fetch:
```javascript
const response = await fetch('http://localhost:3000/run-agent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: 'What is the capital of France?'
  })
});

const result = await response.json();
console.log(result.response);
```

## Error Handling

The server includes comprehensive error handling for:
- Missing data field in request
- Missing OpenAI API key
- OpenAI API errors
- Network errors

## Configuration

The server uses the following OpenAI API settings:
- Model: `gpt-3.5-turbo`
- Max tokens: 1000
- Temperature: 0.7

You can modify these settings in the `index.js` file if needed. 