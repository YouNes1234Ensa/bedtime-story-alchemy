
import { useState } from 'react';
import { toast } from 'sonner';
import StoryForm from '@/components/StoryForm';
import StoryDisplay from '@/components/StoryDisplay';
import { generateMockStory } from '@/services/storyGenerator';
import type { StoryFormData, GeneratedStory } from '@/types/story';

type AppState = 'form' | 'story';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('form');
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStorySubmit = async (formData: StoryFormData) => {
    setIsGenerating(true);
    
    try {
      console.log('Generating story with form data:', formData);
      
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { title, content } = generateMockStory(formData);
      
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
      toast.error('Failed to generate story. Please try again.');
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

  switch (currentState) {
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
