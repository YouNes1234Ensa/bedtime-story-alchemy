
import { toast } from "sonner";
import type { StoryFormData } from '@/types/story';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export class ClaudeService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateStory(formData: StoryFormData): Promise<{ title: string; content: string }> {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }

    const prompt = this.createStoryPrompt(formData);

    try {
      console.log('Generating story with Claude API...');
      
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Claude API error:', errorData);
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Story generated successfully');
      
      // Parse the response to extract title and content
      const storyText = data.content[0].text;
      const lines = storyText.split('\n').filter((line: string) => line.trim());
      
      // Assume first line is the title (remove any "Title:" prefix)
      const title = lines[0].replace(/^(Title:\s*|#\s*)/, '').trim();
      
      // Rest is the content (skip empty lines and "Story:" prefixes)
      const content = lines.slice(1)
        .filter((line: string) => line.trim() && !line.match(/^(Story:\s*|Content:\s*)/i))
        .join('\n\n');

      return { title, content };
    } catch (error) {
      console.error('Error generating story:', error);
      throw error;
    }
  }

  private createStoryPrompt(formData: StoryFormData): string {
    const interestsList = formData.interests.join(', ');
    
    return `Create a personalized bedtime story with the following specifications:

**Child Details:**
- Age: ${formData.age} years old
- Gender: ${formData.gender}
- Interests: ${interestsList}
- Story Style: ${formData.style}
- Lesson to Teach: ${formData.lesson}

**Requirements:**
1. Create an engaging title that captures the magic of the story
2. Write a story that is age-appropriate for a ${formData.age}-year-old
3. Incorporate their interests (${interestsList}) naturally into the plot
4. Use a ${formData.style} tone throughout the story
5. Weave in the lesson about "${formData.lesson}" in a natural, non-preachy way
6. Make it perfect for bedtime - calming, positive, and ending on a peaceful note
7. Length should be appropriate for the age (about 300-500 words for younger children, up to 800 words for older children)

**Format:**
Please format your response as:
[Story Title]

[Story content - write in paragraphs with proper spacing]

Make the story magical, engaging, and memorable while being gentle enough for bedtime. Focus on creating vivid imagery that sparks imagination without being overstimulating before sleep.`;
  }
}
