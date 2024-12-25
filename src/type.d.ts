declare module "*.svg" {
    const content: string | undefined;
    export default content;
}
// declaration.d.ts
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}