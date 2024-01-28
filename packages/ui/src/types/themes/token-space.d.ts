import { SizeKeys, Sizes } from './token-size';
type SizeKeysWithNegatives = Exclude<`-${SizeKeys extends `$${infer Key}` ? Key : SizeKeys}`, '-0'> | SizeKeys;
export declare const space: {
    [Key in SizeKeysWithNegatives]: Key extends keyof Sizes ? Sizes[Key] : number;
};
export {};
//# sourceMappingURL=token-space.d.ts.map