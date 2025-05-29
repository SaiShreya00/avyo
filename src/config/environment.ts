
// Environment configuration for API keys
// Users need to set these as environment variables with VITE_ prefix

export const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
  },
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  },
  weather: {
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY
  },
  news: {
    apiKey: import.meta.env.VITE_NEWS_API_KEY
  },
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  }
};

// Validation function to check if all required keys are present
export const validateEnvironment = () => {
  const missing = [];
  
  if (!config.openai.apiKey) missing.push('VITE_OPENAI_API_KEY');
  if (!config.weather.apiKey) missing.push('VITE_OPENWEATHER_API_KEY');
  if (!config.news.apiKey) missing.push('VITE_NEWS_API_KEY');
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.warn('Add these to your .env.local file for full functionality');
  }
  
  return missing.length === 0;
};
