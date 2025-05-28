
// Real AI integration with OpenAI API

// Function to check if content should be moderated
export const moderateContent = async (content: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: content,
      }),
    });

    const data = await response.json();
    return data.results[0].flagged;
  } catch (error) {
    console.error('Moderation check failed:', error);
    return false; // Allow content if moderation fails
  }
};

// Enhanced AI response generation with GPT-4
export const generateAIResponse = async (
  message: string,
  username: string,
  conversationHistory: { role: string; content: string }[] = []
): Promise<string> => {
  // Check for inappropriate content first
  const isInappropriate = await moderateContent(message);
  if (isInappropriate) {
    return `I'm sorry ${username}, but I can't respond to that type of message. Let's keep our conversation friendly and appropriate.`;
  }

  try {
    const messages = [
      {
        role: "system",
        content: `You are Avyo, a friendly and helpful AI assistant. You're talking to ${username}. Be conversational, empathetic, and helpful. Keep responses concise but engaging.`
      },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.6,
        frequency_penalty: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI response generation failed:', error);
    
    // Fallback responses when API fails
    const fallbackResponses = [
      `I'm having trouble connecting right now, ${username}. Please try again in a moment.`,
      `Sorry ${username}, I'm experiencing some technical difficulties. Let me try to help you differently.`,
      `I'm currently offline, ${username}. Please check your connection and try again.`,
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};

// Function to detect user's mood from their messages (enhanced)
export const detectMood = (messages: string[]): "happy" | "sad" | "angry" | "neutral" => {
  const combinedText = messages.join(" ").toLowerCase();
  
  const happyTerms = ["happy", "great", "awesome", "excellent", "joy", "love", "like", "amazing", "wonderful", "fantastic", ":)", "😊", "😄", "😍"];
  const sadTerms = ["sad", "unhappy", "depressed", "disappointed", "upset", "down", "crying", "hurt", "lonely", ":(", "😢", "😭", "😞"];
  const angryTerms = ["angry", "mad", "frustrated", "annoyed", "furious", "hate", "rage", "pissed", "irritated", "😠", "😡", "🤬"];
  
  let happyScore = 0;
  let sadScore = 0;
  let angryScore = 0;
  
  happyTerms.forEach(term => {
    if (combinedText.includes(term)) happyScore++;
  });
  
  sadTerms.forEach(term => {
    if (combinedText.includes(term)) sadScore++;
  });
  
  angryTerms.forEach(term => {
    if (combinedText.includes(term)) angryScore++;
  });
  
  if (happyScore > sadScore && happyScore > angryScore) return "happy";
  if (sadScore > happyScore && sadScore > angryScore) return "sad";
  if (angryScore > happyScore && angryScore > sadScore) return "angry";
  
  return "neutral";
};
