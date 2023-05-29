export type ViewType = 'Add' | 'Preview' | 'ViewAll'

export interface Wish {
    wishText: string;
    signature: string;
    base64Content: any;
}