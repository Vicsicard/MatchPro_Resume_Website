# MatchProResume - Professional Resume Platform

MatchProResume is a comprehensive web application designed to help job seekers create optimized resumes and navigate the complex job application landscape through an AI-powered platform.

## Features

- **Smart Resume Builder**: Create ATS-optimized resumes with AI assistance
- **Job Matching**: Get personalized job recommendations based on your profile
- **Cover Letter Generation**: AI-powered cover letter creation
- **Interview Preparation**: Access to interview coaching and resources
- **Career Resources**: Comprehensive library of career development materials
- **Analytics Dashboard**: Track your application progress and success rates

## Technology Stack

- Frontend: React.js (Create React App)
- Backend: Supabase
- Database: PostgreSQL
- Authentication: Supabase Authentication
- Storage: Supabase Storage
- Styling: Custom CSS with variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd matchproresumewebsite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
```

## Deployment

This project is configured for deployment on Vercel. Follow these steps to deploy:

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the application:
```bash
vercel --prod
```

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

Make sure to configure these environment variables in your Vercel project settings:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

## Available Scripts

- `npm start`: Run the development server
- `npm test`: Run tests
- `npm run build`: Create production build
- `npm run eject`: Eject from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
