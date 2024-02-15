"use client";

import * as React from "react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

//A Steps component that navigates between steps. Each step is a child component of the Steps component. Each step takes children as a prop and renders the children of the step. The Steps component renders the children of the current step and a navigation bar to navigate between steps.
//Only Step is an accepted child of Steps.
//Include a StepSubmit component to submit the last step.
interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ ...props }, { children }: StepsProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const steps = React.Children.toArray(children);

  const currentStepComponent = steps[currentStep];

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div>
      <div>{currentStepComponent}</div>
      <div>
        <Button
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
            }
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          Next
        </Button>
        {isLastStep && <Button {...props}>Submit</Button>}
      </div>
    </div>
  );
}

//A Step component that renders its children.
//Only children are accepted as a prop.
//Include a StepSubmit component to submit the last step.
interface StepProps {
  children: React.ReactNode;
}

export function Step({ children }: StepProps) {
  return <div>{children}</div>;
}

//A StepSubmit component that renders a submit button.
//Only children are accepted as a prop.
interface StepSubmitProps {
  children: React.ReactNode;
}

export function StepSubmit({ ...props }, { children }: StepSubmitProps) {
  return <Button {...props}>{children}</Button>;
}
