import { CardProps } from 'tamagui';
export type OverviewCardTypes = {
    title: string;
    value: string;
    badgeText?: string;
    badgeAfter?: string;
    badgeState?: 'success' | 'failure' | 'indifferent';
} & CardProps;
export declare const OverviewCard: ({ title, value, badgeText, badgeState, badgeAfter, ...props }: OverviewCardTypes) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OverviewCard.d.ts.map