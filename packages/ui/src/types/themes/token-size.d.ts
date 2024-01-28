export declare const size: {
    $0: number;
    '$0.25': number;
    '$0.5': number;
    '$0.75': number;
    $1: number;
    '$1.5': number;
    $2: number;
    '$2.5': number;
    $3: number;
    '$3.5': number;
    $4: number;
    $true: number;
    '$4.5': number;
    $5: number;
    $6: number;
    $7: number;
    $8: number;
    $9: number;
    $10: number;
    $11: number;
    $12: number;
    $13: number;
    $14: number;
    $15: number;
    $16: number;
    $17: number;
    $18: number;
    $19: number;
    $20: number;
};
export type SizeKeysIn = keyof typeof size;
export type Sizes = {
    [Key in SizeKeysIn extends `$${infer Key}` ? Key : SizeKeysIn]: number;
};
export type SizeKeys = `${keyof Sizes extends `${infer K}` ? K : never}`;
//# sourceMappingURL=token-size.d.ts.map