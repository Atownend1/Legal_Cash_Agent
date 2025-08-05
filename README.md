# Legal Cash Agent - Financial Leakage Analysis Tool

A comprehensive web application that helps legal practices identify and prevent financial leakage through AI-powered analysis of time entries, WIP (Work in Progress), and billing data.

## Features

- **Web Interface**: Beautiful, modern UI for easy data input and analysis
- **AI-Powered Analysis**: Uses OpenAI GPT to identify financial leakage patterns
- **Multiple Data Formats**: Accepts JSON, CSV, or text input
- **Comprehensive Analysis**: Identifies missing time, aged WIP, draft invoices, and inactive cases
- **Demo Mode**: Works without API keys for demonstration purposes
- **RESTful API**: Full API for integration with other systems
- **Real-time Analysis**: Instant results with detailed recommendations

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables (optional):**
   Create a `.env` file in the root directory with your OpenAI API key for full functionality:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   You can get your API key from: https://platform.openai.com/api-keys
   
   **Note**: The application works in demo mode without an API key!

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the web interface:**
   Open your browser and go to: http://localhost:3000

**Quick Start (Alternative):**
   ```bash
   ./deploy.sh
   ```
   This script will install dependencies, set up environment, and start the server.

**Netlify Deployment:**
   ```bash
   ./deploy-netlify.sh
   ```
   This script will prepare your app for Netlify deployment.

## Usage

### Web Interface
1. Open http://localhost:3000 in your browser
2. Paste your legal financial data (JSON, CSV, or text)
3. Click "Analyze Financial Leakage" to get instant results
4. View detailed analysis with recommendations

### Example Data Formats

**Time Entries:**
```json
{
  "timeEntries": [
    {
      "matter": "Smith v. Johnson",
      "feeEarner": "Sarah Wilson",
      "date": "2024-01-15",
      "hours": 2.5,
      "description": "Client meeting and document review"
    }
  ]
}
```

**WIP Data:**
```json
{
  "workInProgress": [
    {
      "matter": "TechCorp Acquisition",
      "feeEarner": "David Park",
      "value": 15000,
      "daysAged": 95,
      "status": "In Progress"
    }
  ]
}
```

## API Endpoints

### POST /run-agent

Analyzes legal financial data for leakage patterns.

**Request Body:**
```json
{
  "data": "Your legal financial data here"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Detailed analysis with recommendations",
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
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Legal Cash Agent API"
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
- Temperature: 0.3

You can modify these settings in the `index.js` file if needed.

## Deployment

### Local Development
```bash
npm start
```

### Netlify Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Netlify deployment instructions.

**Quick Deploy:**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `public`
5. Add environment variables (optional)

Your site will be available at: `https://your-site-name.netlify.app` 