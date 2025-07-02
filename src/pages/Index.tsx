
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ApiKeyInput from '@/components/ApiKeyInput';
import StoryForm from '@/components/StoryForm';
import StoryDisplay from '@/components/StoryDisplay';
import { ClaudeService } from '@/services/claudeService';
import type { StoryFormData, GeneratedStory } from '@/types/story';

type AppState = 'api-key' | 'form' | 'story';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('api-key');
  const [claudeService, setClaudeService] = useState<ClaudeService | null>(null);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Check for stored API key on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('claude-api-key');
    if (storedApiKey) {
      const service = new ClaudeService(storedApiKey);
      setClaudeService(service);
      setCurrentState('form');
    }
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    localStorage.setItem('claude-api-key', apiKey);
    const service = new ClaudeService(apiKey);
    setClaudeService(service);
    setCurrentState('form');
    toast.success('API key saved successfully!');
  };

  const handleStorySubmit = async (formData: StoryFormData) => {
    if (!claudeService) return;

    setIsGenerating(true);
    
    try {
      console.log('Generating story with form data:', formData);
      const { title, content } = await claudeService.generateStory(formData);
      
      const story: GeneratedStory = {
        title,
        content,
        formData
      };
      
      setGeneratedStory(story);
      setCurrentState('story');
      toast.success('Your magical story is ready!');
    } catch (error) {
      console.error('Error generating story:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentState('form');
    setGeneratedStory(null);
  };

  const handleNewStory = () => {
    setCurrentState('form');
    setGeneratedStory(null);
  };

  const handleBackToApiKey = () => {
    localStorage.removeItem('claude-api-key');
    setClaudeService(null);
    setCurrentState('api-key');
    setGeneratedStory(null);
  };

  switch (currentState) {
    case 'api-key':
      return <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />;
    
    case 'form':
      return (
        <StoryForm 
          onSubmit={handleStorySubmit} 
          isGenerating={isGenerating}
        />
      );
    
    case 'story':
      return generatedStory ? (
        <StoryDisplay 
          story={generatedStory}
          onBack={handleBackToForm}
          onNewStory={handleNewStory}
        />
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
