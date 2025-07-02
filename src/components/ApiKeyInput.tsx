
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, AlertCircle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter your Claude API key');
      return;
    }

    if (!apiKey.startsWith('sk-ant-')) {
      setError('Claude API keys should start with "sk-ant-"');
      return;
    }

    setError('');
    onApiKeySubmit(apiKey.trim());
  };

  return (
    <div className="min-h-screen gradient-gentle flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 gradient-magical rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">API Key Required</CardTitle>
          <p className="text-muted-foreground">
            Enter your Claude API key to start creating magical bedtime stories
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Claude API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError('');
                }}
                className="font-mono"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Your API key is stored locally and never sent to our servers. It's only used to communicate directly with Claude's API.
              </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full">
              Continue to Story Creator
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              How to get your API key:
            </h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Visit <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">console.anthropic.com</a></li>
              <li>Create an account or sign in</li>
              <li>Go to "API Keys" section</li>
              <li>Create a new API key</li>
              <li>Copy and paste it here</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
