
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, User, Heart, Palette, Target, Share, Download } from 'lucide-react';
import type { GeneratedStory } from '@/types/story';

interface StoryDisplayProps {
  story: GeneratedStory;
  onBack: () => void;
  onNewStory: () => void;
}

const StoryDisplay = ({ story, onBack, onNewStory }: StoryDisplayProps) => {
  const [isReading, setIsReading] = useState(false);

  const formatStoryContent = (content: string) => {
    // Split story into paragraphs and add proper spacing
    return content.split('\n').filter(line => line.trim()).map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph.trim()}
      </p>
    ));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: `Check out this personalized bedtime story: ${story.title}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${story.title}\n\n${story.content}`);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`${story.title}\n\n${story.content}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${story.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen gradient-gentle">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Story Metadata Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-card/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Story Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    Age & Gender
                  </div>
                  <p className="text-sm font-medium">
                    {story.formData.age} years old, {story.formData.gender}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    Interests
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {story.formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Palette className="w-4 h-4" />
                    Style
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {story.formData.style}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    Lesson
                  </div>
                  <p className="text-sm">{story.formData.lesson}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Story Content */}
          <div className="lg:col-span-3">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold gradient-magical bg-clip-text text-transparent leading-tight">
                  {story.title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">A personalized bedtime story</p>
              </CardHeader>
              <CardContent className="px-8 md:px-12 pb-12">
                <div 
                  className={`story-text text-lg leading-relaxed text-foreground transition-all duration-500 ${
                    isReading ? 'text-xl' : ''
                  }`}
                >
                  {formatStoryContent(story.content)}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t">
                  <Button 
                    onClick={() => setIsReading(!isReading)}
                    variant="outline"
                    className="flex-1"
                  >
                    {isReading ? 'Normal View' : 'Reading Mode'}
                  </Button>
                  <Button 
                    onClick={onNewStory}
                    className="flex-1 gradient-magical text-white border-0"
                  >
                    Create Another Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
