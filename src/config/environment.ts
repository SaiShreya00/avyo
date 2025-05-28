
// Environment configuration for API keys
// Users need to set these as environment variables

export const config = {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
  },
  openai: {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  },
  weather: {
    apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY
  },
  news: {
    apiKey: process.env.REACT_APP_NEWS_API_KEY
  },
  stripe: {
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  }
};

// Validation function to check if all required keys are present
export const validateEnvironment = () => {
  const missing = [];
  
  if (!config.openai.apiKey) missing.push('REACT_APP_OPENAI_API_KEY');
  if (!config.weather.apiKey) missing.push('REACT_APP_OPENWEATHER_API_KEY');
  if (!config.news.apiKey) missing.push('REACT_APP_NEWS_API_KEY');
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.warn('Add these to your .env.local file for full functionality');
  }
  
  return missing.length === 0;
};
