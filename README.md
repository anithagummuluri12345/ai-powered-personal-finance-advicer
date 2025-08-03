# AI Finance Advisor

A full-stack AI-powered personal finance advisor that provides personalized financial insights and advice using Plaid API for transaction data and OpenAI for intelligent analysis.

## Features

- 🔐 **Secure Bank Integration**: Connect to your bank account using Plaid API (sandbox mode)
- 🤖 **AI-Powered Insights**: Get personalized financial advice using OpenAI
- 📊 **Interactive Dashboard**: Beautiful charts and visualizations with Chart.js
- 💰 **Transaction Analysis**: Detailed spending breakdown and categorization
- 📈 **Financial Trends**: Track spending patterns and identify opportunities
- 📄 **PDF Reports**: Download monthly financial reports as PDF
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- ⚡ **Real-time Updates**: Live dashboard with refresh capabilities

## Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive charts and visualizations
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **jsPDF & html2canvas** - PDF report generation

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Plaid API** - Bank account integration
- **OpenAI API** - AI-powered financial analysis
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## Prerequisites

- Node.js 18+
- npm or yarn
- Plaid Developer Account
- OpenAI API Key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-finance-advisor
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Return to root
cd ..
```

### 3. Environment Configuration

Copy the example environment file and configure your API keys:

```bash
cp env.example .env
```

Edit `.env` and add your API keys:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Plaid API Configuration (Sandbox)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key
```

### 4. Get API Keys

#### Plaid API Setup

1. Sign up at [Plaid Dashboard](https://dashboard.plaid.com/)
2. Create a new app
3. Get your Client ID and Sandbox Secret
4. Add them to your `.env` file

#### OpenAI API Setup

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Generate an API key
3. Add it to your `.env` file

### 5. Run the Application

#### Development Mode

```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Individual Services

```bash
# Frontend only (Next.js)
npm run dev:frontend

# Backend only (Express)
npm run dev:backend
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

### 1. Connect Bank Account

- Click "Connect Bank Account (Demo)" to simulate Plaid connection
- The app uses sandbox data for demonstration

### 2. View Dashboard

- See your financial summary with key metrics
- Explore spending charts and category breakdowns
- Review recent transactions

### 3. Get AI Insights

- View personalized financial advice
- Check spending trends and patterns
- Track financial goals progress

### 4. Download Reports

- Generate monthly PDF reports
- Include financial summary and AI insights
- Perfect for financial planning

## API Endpoints

### Plaid Integration

- `GET /api/plaid/status` - Check connection status
- `POST /api/plaid/connect` - Connect bank account
- `GET /api/plaid/accounts` - Get account information
- `GET /api/plaid/transactions` - Get transaction data

### Transactions

- `GET /api/transactions` - Get all transactions with summary
- `GET /api/transactions/category/:category` - Get transactions by category
- `GET /api/transactions/date-range` - Get transactions by date range
- `GET /api/transactions/summary` - Get spending summary

### AI Insights

- `GET /api/insights` - Get AI-powered financial insights
- `GET /api/insights/category/:category` - Get category-specific insights

## Deployment

### Frontend (Vercel)

1. **Prepare for Deployment**

```bash
cd frontend
npm run build
```

2. **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

3. **Environment Variables**
   Add your environment variables in Vercel dashboard:

- `NEXT_PUBLIC_API_URL` - Your backend URL

### Backend (Railway)

1. **Prepare for Deployment**

```bash
cd backend
npm run build
```

2. **Deploy to Railway**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

3. **Environment Variables**
   Add your environment variables in Railway dashboard:

- `PLAID_CLIENT_ID`
- `PLAID_SECRET`
- `OPENAI_API_KEY`
- `NODE_ENV=production`

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app

PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox

OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```
ai-finance-advisor/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App Router pages
│   │   ├── components/      # React components
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main dashboard
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/                  # Express.js backend
│   ├── routes/              # API routes
│   │   ├── plaid.js         # Plaid integration
│   │   ├── transactions.js  # Transaction endpoints
│   │   └── insights.js      # AI insights
│   ├── server.js            # Express server
│   └── package.json
├── package.json             # Root package.json
├── env.example             # Environment variables template
└── README.md               # This file
```

## Features in Detail

### Dashboard Components

- **Summary Cards**: Total spent, income, savings rate, top category
- **Spending Charts**: Bar chart for daily spending, doughnut chart for categories
- **Transaction List**: Recent transactions with filtering
- **AI Insights**: Personalized financial advice and trends

### AI Analysis

- **Spending Analysis**: Category breakdown and patterns
- **Savings Recommendations**: Actionable advice to increase savings
- **Investment Opportunities**: Suggestions based on current financial state
- **Goal Tracking**: Progress monitoring for financial goals

### PDF Reports

- **Financial Summary**: Key metrics and statistics
- **AI Insights**: Personalized advice and recommendations
- **Category Breakdown**: Detailed spending analysis
- **Professional Format**: Clean, printable reports

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or create an issue in the repository.

## Acknowledgments

- [Plaid](https://plaid.com/) for bank account integration
- [OpenAI](https://openai.com/) for AI-powered insights
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the frontend framework
