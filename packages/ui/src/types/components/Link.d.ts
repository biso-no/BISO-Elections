import { LinkProps as SolitoLinkProps } from 'solito/link';
import { TextProps } from 'tamagui';
export type LinkProps = Omit<SolitoLinkProps, 'passHref' | 'as'> & TextProps & {
    target?: string;
    rel?: string;
    title?: string;
};
export declare const Link: ({ href, replace, scroll, shallow, prefetch, locale, children, ...props }: LinkProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Link.d.ts.map