import { IconProps } from '@tamagui/helpers-icon';
import React from 'react';
import { useLink } from 'solito/link';
import { CardProps } from 'tamagui';
export type AchievementCardProps = {
    icon: React.FC<IconProps>;
    title?: string;
    progress: {
        current: number;
        full: number;
        label?: string;
    };
    action?: {
        props: ReturnType<typeof useLink>;
        text: string;
    };
} & CardProps;
export declare const AchievementCard: ({ title, icon: Icon, progress, action, ...props }: AchievementCardProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AchievementCard.d.ts.map