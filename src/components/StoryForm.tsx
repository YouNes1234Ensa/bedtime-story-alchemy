import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Sparkles, Heart, BookOpen, Palette, Target } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import type { StoryFormData } from '@/types/story';

interface StoryFormProps {
  onSubmit: (data: StoryFormData) => void;
  isGenerating: boolean;
}

const StoryForm = ({ onSubmit, isGenerating }: StoryFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StoryFormData>({
    age: 5,
    gender: '',
    interests: [],
    style: '',
    lesson: ''
  });

  const interestOptions = [
    'Animals', 'Space', 'Dinosaurs', 'Princess/Prince', 'Pirates', 'Superheroes',
    'Nature', 'Sports', 'Music', 'Art', 'Science', 'Adventure', 'Fantasy', 'Friendship'
  ];

  const styleOptions = [
    { value: 'funny', label: 'Funny & Silly', icon: '😄' },
    { value: 'adventurous', label: 'Adventurous', icon: '🗺️' },
    { value: 'magical', label: 'Magical & Fantasy', icon: '✨' },
    { value: 'gentle', label: 'Gentle & Calming', icon: '🌙' },
    { value: 'educational', label: 'Educational', icon: '📚' },
    { value: 'mysterious', label: 'Mysterious', icon: '🔍' }
  ];

  const genderOptions = [
    { value: 'boy', label: 'Boy' },
    { value: 'girl', label: 'Girl' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  // Auto-advance logic (skip step 1 - age)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isStepValid() && currentStep > 1 && currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      }
    }, 800); // Small delay for better UX

    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleStyleSelect = (style: string) => {
    setFormData(prev => ({ ...prev, style }));
  };

  const handleNext = () => {
    if (isStepValid() && currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.age >= 2 && formData.age <= 12;
      case 2: return formData.gender !== '';
      case 3: return formData.interests.length > 0;
      case 4: return formData.style !== '';
      case 5: return formData.lesson.trim() !== '';
      default: return false;
    }
  };

  const isFormValid = () => {
    return formData.age >= 2 && formData.age <= 12 && 
           formData.gender !== '' && 
           formData.interests.length > 0 && 
           formData.style !== '' && 
           formData.lesson.trim() !== '';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Let's start with age</h2>
              <p className="text-muted-foreground">How old is the little listener?</p>
            </div>
            <div className="max-w-sm mx-auto">
              <Label htmlFor="age" className="text-base font-medium">Child's Age</Label>
              <Input
                id="age"
                type="number"
                min="2"
                max="12"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 5 }))}
                className="text-center text-lg h-12 mt-2"
                placeholder="5"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center">Ages 2-12 years</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Tell us about them</h2>
              <p className="text-muted-foreground">This helps us create a more personal story</p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {genderOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.gender === option.value ? "default" : "outline"}
                  onClick={() => handleGenderSelect(option.value)}
                  className="h-12 text-base"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">What sparks their imagination?</h2>
              <p className="text-muted-foreground">Choose their favorite interests (select multiple)</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer p-3 text-sm justify-center h-auto py-2 transition-all hover:scale-105"
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
            {formData.interests.length > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                Selected: {formData.interests.length} interest{formData.interests.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">What's their style?</h2>
              <p className="text-muted-foreground">Choose the tone that fits their personality</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {styleOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    formData.style === option.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleStyleSelect(option.value)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium">{option.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">What should they learn?</h2>
              <p className="text-muted-foreground">Every great story has a valuable lesson</p>
            </div>
            <div className="max-w-lg mx-auto">
              <Textarea
                value={formData.lesson}
                onChange={(e) => setFormData(prev => ({ ...prev, lesson: e.target.value }))}
                placeholder="e.g., Being kind to others, the importance of sharing, overcoming fears, believing in yourself..."
                className="min-h-32 text-base"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Share what values or lessons you'd like the story to teach
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-gentle">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-magical bg-clip-text text-transparent mb-4">
            Bedtime Story Creator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create magical, personalized bedtime stories that spark imagination and teach valuable lessons
          </p>
        </div>

        <ProgressIndicator currentStep={currentStep} totalSteps={5} />

        <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {renderStep()}

            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6"
              >
                Back
              </Button>

              {currentStep === 1 && (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              {currentStep === 5 && (
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isGenerating}
                  className="px-8"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating Story...
                    </>
                  ) : (
                    <>
                      Create Story
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryForm;
