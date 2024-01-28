/// <reference types="react" />
import { IconProps } from '@tamagui/helpers-icon';
import { ListItemProps } from 'tamagui';
export type SettingItemProps = {
    icon: React.FC<IconProps>;
    rightLabel?: string;
    /**
     * native only - not showing colors on native
     */
    accentColor?: ListItemProps['backgroundColor'];
    /**
     * web only - to indicate the current page
     */
    isActive?: boolean;
} & ListItemProps;
export declare const SettingItem: ({ icon: Icon, children, rightLabel, isActive, accentColor: _, ...props }: SettingItemProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SettingItem.d.ts.map