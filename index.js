const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Legal Cash Agent API'
    });
});

// Main agent endpoint
app.post('/run-agent', async (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data) {
            return res.status(400).json({
                success: false,
                error: 'No data provided for analysis'
            });
        }

        // Create the prompt for financial analysis
        const prompt = createAnalysisPrompt(data);
        
        // Call OpenAI API
        const analysis = await analyzeWithOpenAI(prompt);
        
        res.json({
            success: true,
            response: analysis.response,
            usage: analysis.usage
        });

    } catch (error) {
        console.error('Error in run-agent:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error during analysis'
        });
    }
});

// API endpoints for the Legal Cash Agent
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Cash management endpoints
app.get('/api/v1/cash/balance', (req, res) => {
    res.json({
        balance: 50000.00,
        currency: 'USD',
        lastUpdated: new Date().toISOString()
    });
});

app.post('/api/v1/cash/transaction', (req, res) => {
    const { type, amount, description, category, date } = req.body;
    
    if (!type || !amount || !description) {
        return res.status(400).json({
            error: 'Validation failed',
            details: ['Type, amount, and description are required']
        });
    }
    
    res.json({
        success: true,
        transaction: {
            id: Date.now(),
            type,
            amount,
            description,
            category,
            date: date || new Date().toISOString().split('T')[0]
        }
    });
});

// Expense tracking endpoints
app.get('/api/v1/expenses', (req, res) => {
    const { category, dateFrom, dateTo, limit = 50, page = 1 } = req.query;
    
    // Mock expense data
    const expenses = [
        {
            id: 1,
            amount: 250.00,
            description: 'Court filing fees',
            category: 'court_fees',
            date: '2024-01-15'
        },
        {
            id: 2,
            amount: 150.00,
            description: 'Legal research subscription',
            category: 'research',
            date: '2024-01-10'
        }
    ];
    
    res.json({
        expenses,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: expenses.length
        }
    });
});

app.post('/api/v1/expenses', (req, res) => {
    const { amount, description, category, date, receipt } = req.body;
    
    if (!amount || !description) {
        return res.status(400).json({
            error: 'Validation failed',
            details: ['Amount and description are required']
        });
    }
    
    res.json({
        success: true,
        expense: {
            id: Date.now(),
            amount,
            description,
            category,
            date: date || new Date().toISOString().split('T')[0],
            receipt
        }
    });
});

// Financial reporting endpoints
app.get('/api/v1/reports/cash-flow', (req, res) => {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
        return res.status(400).json({
            error: 'Start date and end date are required'
        });
    }
    
    res.json({
        report: {
            period: { startDate, endDate },
            cashFlow: {
                openingBalance: 45000.00,
                closingBalance: 52000.00,
                netChange: 7000.00,
                income: 25000.00,
                expenses: 18000.00
            }
        }
    });
});

// Helper function to create analysis prompt
function createAnalysisPrompt(data) {
    return `You are a Legal Cash Agent, an expert financial analyst specializing in identifying financial leakage in legal practices. 

Analyze the following legal financial data and identify potential financial leakage issues:

${data}

Please provide a comprehensive analysis covering:

1. 🕒 Missing Time: Identify any missing time entries or incomplete time recording
2. 🧾 Aged WIP: Find work-in-progress that's aged and at risk of write-off
3. 📄 Draft Invoices: Identify invoices stuck in draft status
4. 🛑 Inactive Cases with WIP: Find cases with unbilled time that show no recent activity

For each issue found, provide:
- Specific details about the problem
- Estimated financial impact
- Recommended actions to resolve

Format your response clearly with emojis and bullet points for easy reading.`;
}

// Helper function to call OpenAI API
async function analyzeWithOpenAI(prompt) {
    try {
        const openaiApiKey = process.env.OPENAI_API_KEY;
        
        if (!openaiApiKey) {
            // Return mock response if no API key
            return {
                response: `🕒 Missing Time:
- No time entries provided for analysis

🧾 Aged WIP:
- "TechCorp Acquisition": £15,000 (95 days old) - HIGH RISK
- "Old Legacy Case": £22,000 (180 days old) - CRITICAL RISK
- Total aged WIP: £37,000 at risk of write-off
- Recommend immediate billing review

📄 Draft Invoices:
- No draft invoices found in this dataset

🛑 Inactive Cases with WIP:
- "Old Legacy Case" shows no recent activity
- £22,000 unbilled time at risk
- Recommend client contact or matter closure

Token Usage: 312 total tokens (200 prompt + 112 completion)`,
                usage: {
                    total_tokens: 312,
                    prompt_tokens: 200,
                    completion_tokens: 112
                }
            };
        }

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a Legal Cash Agent, an expert financial analyst specializing in identifying financial leakage in legal practices.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.3
        }, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            response: response.data.choices[0].message.content,
            usage: response.data.usage
        };

    } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('Failed to analyze data with OpenAI');
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Legal Cash Agent server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Web interface: http://localhost:${PORT}`);
    console.log(`🔧 API endpoint: http://localhost:${PORT}/run-agent`);
}); 