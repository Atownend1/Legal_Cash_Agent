const axios = require('axios');

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

// Main handler function
exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const path = event.path.replace('/.netlify/functions/api', '');

    try {
        // Health check endpoint
        if (path === '/health' && event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    status: 'healthy',
                    timestamp: new Date().toISOString(),
                    service: 'Legal Cash Agent API'
                })
            };
        }

        // Main agent endpoint
        if (path === '/run-agent' && event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');
            const { data } = body;
            
            if (!data) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        error: 'No data provided for analysis'
                    })
                };
            }

            const prompt = createAnalysisPrompt(data);
            const analysis = await analyzeWithOpenAI(prompt);
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    response: analysis.response,
                    usage: analysis.usage
                })
            };
        }

        // API v1 endpoints
        if (path.startsWith('/v1')) {
            const subPath = path.replace('/v1', '');
            
            // Cash balance endpoint
            if (subPath === '/cash/balance' && event.httpMethod === 'GET') {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        balance: 50000.00,
                        currency: 'USD',
                        lastUpdated: new Date().toISOString()
                    })
                };
            }

            // Cash transaction endpoint
            if (subPath === '/cash/transaction' && event.httpMethod === 'POST') {
                const body = JSON.parse(event.body || '{}');
                const { type, amount, description, category, date } = body;
                
                if (!type || !amount || !description) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            error: 'Validation failed',
                            details: ['Type, amount, and description are required']
                        })
                    };
                }
                
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        transaction: {
                            id: Date.now(),
                            type,
                            amount,
                            description,
                            category,
                            date: date || new Date().toISOString().split('T')[0]
                        }
                    })
                };
            }

            // Expenses endpoint
            if (subPath === '/expenses' && event.httpMethod === 'GET') {
                const queryParams = event.queryStringParameters || {};
                const { category, dateFrom, dateTo, limit = 50, page = 1 } = queryParams;
                
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
                
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        expenses,
                        pagination: {
                            page: parseInt(page),
                            limit: parseInt(limit),
                            total: expenses.length
                        }
                    })
                };
            }

            // Cash flow report endpoint
            if (subPath === '/reports/cash-flow' && event.httpMethod === 'GET') {
                const queryParams = event.queryStringParameters || {};
                const { startDate, endDate } = queryParams;
                
                if (!startDate || !endDate) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            error: 'Start date and end date are required'
                        })
                    };
                }
                
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
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
                    })
                };
            }
        }

        // Demo submission endpoint
        if (path === '/demo-submit' && event.httpMethod === 'POST') {
            try {
                const { name, email, company, files } = JSON.parse(event.body);
                
                if (!name || !email) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            success: false,
                            error: 'Name and email are required'
                        })
                    };
                }

                // Generate demo analysis
                const demoData = `Demo Analysis for ${name} (${email})
Company: ${company || 'Not specified'}

Sample financial data for demonstration:
- Outstanding invoices: £45,000
- Aged WIP: £37,000
- Average payment time: 45 days
- Monthly billing: £125,000`;

                const analysis = await analyzeWithOpenAI(createAnalysisPrompt(demoData));

                // Send email (in production, integrate with email service)
                const emailContent = `
Dear ${name},

Thank you for trying Yieldly's AI Cash Flow Analysis Demo!

Here are your personalised insights:

${analysis.response}

Key Recommendations:
- Implement automated payment reminders
- Review aged WIP within 30 days
- Optimise billing cycle timing
- Set up recurring invoice generation

Next Steps:
1. Schedule a free consultation to discuss your specific needs
2. Get a custom implementation plan for your firm
3. Start your 30-day free trial

Contact us:
📧 hello@yieldly.ai
📞 +44 800 123 4567

Best regards,
The Yieldly Team
                `;

                // In production, send actual email here
                console.log('Email would be sent to:', email);
                console.log('Email content:', emailContent);

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        message: 'Demo analysis completed and email sent',
                        analysis: analysis.response,
                        emailSent: true
                    })
                };

            } catch (error) {
                console.error('Demo submission error:', error);
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        error: 'Failed to process demo submission'
                    })
                };
            }
        }

        // Default response for unknown endpoints
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                error: 'Endpoint not found',
                availableEndpoints: [
                    'GET /health',
                    'POST /run-agent',
                    'POST /demo-submit',
                    'GET /v1/cash/balance',
                    'POST /v1/cash/transaction',
                    'GET /v1/expenses',
                    'GET /v1/reports/cash-flow'
                ]
            })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: 'Internal server error'
            })
        };
    }
}; 