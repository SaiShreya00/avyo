
// Placeholder for actual AI integration

// Mock response generation - in a real app, this would call an AI API
export const generateAIResponse = async (
  message: string,
  username: string
): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Some predefined responses based on message content
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return `Hello ${username}! How are you feeling today?`;
  }

  if (message.toLowerCase().includes("how are you")) {
    return `I'm doing great, ${username}! Thanks for asking. How can I assist you today?`;
  }

  if (message.toLowerCase().includes("weather")) {
    return `Currently it's 24°C and sunny outside. Perfect day to go for a walk, ${username}!`;
  }

  if (message.toLowerCase().includes("news")) {
    return `Today's top news: New advances in AI technology announced today! Scientists have created more realistic virtual avatars that can recognize human emotions.`;
  }

  if (message.toLowerCase().includes("sad") || message.toLowerCase().includes("unhappy")) {
    return `I'm sorry to hear you're feeling down, ${username}. Would you like me to suggest some mood-lifting activities or perhaps tell you a joke?`;
  }

  if (message.toLowerCase().includes("joke")) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the AI go to art school? To learn how to draw conclusions!",
      `What do you call ${username} who loves telling dad jokes? A faux pa!`,
      "Why did the computer show up at work late? It had a hard drive!",
    ];
    return `Here's a joke for you: ${jokes[Math.floor(Math.random() * jokes.length)]} 😄`;
  }

  if (message.toLowerCase().includes("thank")) {
    return `You're very welcome, ${username}! I'm always here to help.`;
  }

  // Default responses
  const defaultResponses = [
    `That's interesting, ${username}. Tell me more about that.`,
    `I understand, ${username}. How else can I assist you today?`,
    `Thanks for sharing that with me, ${username}. Is there anything specific you'd like to know?`,
    `I appreciate your input, ${username}. Let me know if you have any questions.`,
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Function to detect user's mood from their messages
export const detectMood = (messages: string[]): "happy" | "sad" | "angry" | "neutral" => {
  // This would be much more sophisticated in a real app, possibly using NLP
  const combinedText = messages.join(" ").toLowerCase();
  
  const happyTerms = ["happy", "great", "awesome", "excellent", "joy", "love", "like", ":)", "😊", "😄"];
  const sadTerms = ["sad", "unhappy", "depressed", "disappointed", "upset", "down", ":(", "😢", "😭"];
  const angryTerms = ["angry", "mad", "frustrated", "annoyed", "furious", "hate", "😠", "😡"];
  
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
