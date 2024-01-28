import React from 'react';
import { ThemeName } from 'tamagui';
export type OnboardingStepInfo = {
    theme: ThemeName;
    Content: React.FC;
};
export type OnboardingProps = {
    /**
     * native only
     */
    onOnboarded?: () => void;
    /**
     * web only
     */
    autoSwipe?: boolean;
    steps: OnboardingStepInfo[];
};
export declare const Onboarding: ({ onOnboarded, autoSwipe, steps }: OnboardingProps) => import("react/jsx-runtime").JSX.Element;
export declare const Background: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Onboarding.d.ts.map