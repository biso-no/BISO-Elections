import { InputProps } from 'tamagui';
import { z } from 'zod';
export declare const AddressSchema: z.ZodObject<{
    street: z.ZodString;
    zipCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    street: string;
    zipCode: string;
}, {
    street: string;
    zipCode: string;
}>;
export declare const AddressField: (props: Pick<InputProps, 'size'>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AddressField.d.ts.map