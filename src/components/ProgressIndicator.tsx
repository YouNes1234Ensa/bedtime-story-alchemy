
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              step <= currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-muted-foreground/30 text-muted-foreground'
            }`}
          >
            {step < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm font-medium">{step}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 ml-4 transition-all duration-300 ${
                step < currentStep ? 'bg-primary' : 'bg-muted-foreground/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
