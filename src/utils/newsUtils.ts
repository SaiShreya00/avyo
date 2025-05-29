
import { config } from '@/config/environment';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export const fetchNewsHeadlines = async (category: string = 'technology'): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=5&apiKey=${config.news.apiKey}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description || '',
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name
    }));
  } catch (error) {
    console.error('Failed to fetch news:', error);
    // Return fallback news
    return [
      {
        title: "AI Technology Advances Continue to Shape the Future",
        description: "Recent developments in artificial intelligence are transforming industries worldwide.",
        url: "#",
        publishedAt: new Date().toISOString(),
        source: "Tech News"
      },
      {
        title: "New Breakthrough in Machine Learning Research",
        description: "Scientists announce significant progress in neural network efficiency.",
        url: "#",
        publishedAt: new Date().toISOString(),
        source: "Science Daily"
      }
    ];
  }
};
