declare module "@babel/standalone" {
  export function transform(
    code: string,
    options: {
      presets?: Array<string | [string, Record<string, unknown>]>;
      plugins?: Array<string | [string, Record<string, unknown>]>;
      filename?: string;
      sourceType?: "script" | "module" | "unambiguous";
    }
  ): { code?: string };
}
