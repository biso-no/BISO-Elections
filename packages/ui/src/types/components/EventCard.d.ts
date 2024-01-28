import { useLink } from 'solito/link';
import { CardProps, ThemeName } from 'tamagui';
export type EventCardTypes = {
    title?: string;
    description?: string;
    action?: {
        props: ReturnType<typeof useLink>;
        text: string;
    };
    tags?: {
        text: string;
        theme: ThemeName;
    }[];
} & CardProps;
export declare const EventCard: ({ title, description, action, tags, ...props }: EventCardTypes) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EventCard.d.ts.map