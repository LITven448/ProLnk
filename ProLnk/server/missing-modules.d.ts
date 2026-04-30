// Type stubs for optional external packages not yet installed.
// These integrations are planned but not yet activated.
declare module "inngest" {
  export class Inngest {
    constructor(opts: { id: string; name: string; eventKey?: string; [key: string]: any });
    createFunction(config: any, trigger: any, fn: any): any;
    send(event: any): Promise<any>;
  }
}
declare module "@qdrant/js-client-rest" {
  export class QdrantClient {
    constructor(opts: { url: string; apiKey?: string });
    [key: string]: any;
  }
}
declare module "mem0ai" {
  const Memory: any;
  export default Memory;
}
declare module "@getzep/zep-cloud" {
  export class ZepClient {
    constructor(opts: { apiKey: string });
    [key: string]: any;
  }
}
