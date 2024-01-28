export type OnboardingControlsProps = {
    currentIdx: number;
    onChange: (newIdx: number) => void;
    stepsCount: number;
    /**
     * native only
     */
    onFinish?: () => void;
};
export declare const OnboardingControls: ({ currentIdx, onChange, stepsCount, }: OnboardingControlsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OnboardingControls.d.ts.map