// Type definitions for @pollyjs/core 4.3
// Project: https://github.com/netflix/pollyjs/tree/master/packages/@pollyjs/core
// Definitions by: feinoujc <https://github.com/feinoujc>
//                 Borui Gu <https://github.com/BoruiGu>
//                 Offir Golan <https://github.com/offirgolan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import Adapter from '@pollyjs/adapter';
import Persister from '@pollyjs/persister';

export type MODE = 'record' | 'replay' | 'passthrough' | 'stopped';
export type ACTION = 'record' | 'replay' | 'intercept' | 'passthrough';
export type EXPIRY_STRATEGY = 'record' | 'warn' | 'error';

export const Timing: {
    fixed(ms: number): () => Promise<void>;
    relative(ratio: number): (ms: number) => Promise<void>;
};

export type MatchBy<T = string, R = T> = (input: T, req: Request) => R;
export type Headers = Record<string, string | string[]>;

export interface CommonPersisterOptions {
    keepUnusedRequests?: boolean;
    disableSortingHarEntries?: boolean;
}

type PersisterType<PersisterOptions> = new (polly: Polly<PersisterOptions>) => Persister<PersisterOptions>;

export interface PollyConfig<PersisterOptions> {
    mode?: MODE;

    adapters?: Array<string | typeof Adapter>;
    adapterOptions?: {
        fetch?: { context?: any };
        puppeteer?: { page?: any; requestResourceTypes?: string[] };
        xhr?: { context?: any };
        [key: string]: any;
    };

    persister?: string | PersisterType<PersisterOptions>;
    persisterOptions?: PersisterOptions & CommonPersisterOptions;

    logging?: boolean;
    flushRequestsOnStop?: boolean;

    recordIfMissing?: boolean;
    recordFailedRequests?: boolean;
    expiryStrategy?: EXPIRY_STRATEGY;

    expiresIn?: string | null;
    timing?: ((ms: number) => Promise<void>) | (() => Promise<void>);

    matchRequestsBy?: {
        method?: boolean | MatchBy;
        headers?: boolean | { exclude: string[] } | MatchBy<Headers>;
        body?: boolean | MatchBy<any>;
        order?: boolean;

        url?:
            | boolean
            | MatchBy
            | {
                  protocol?: boolean | MatchBy;
                  username?: boolean | MatchBy;
                  password?: boolean | MatchBy;
                  hostname?: boolean | MatchBy;
                  port?: boolean | MatchBy<number>;
                  pathname?: boolean | MatchBy;
                  query?: boolean | MatchBy<{ [key: string]: any }>;
                  hash?: boolean | MatchBy;
              };
    };
}
export interface HTTPBase {
    headers: Headers;
    body: any;

    getHeader(name: string): string | string[] | null;
    setHeader(name: string, value?: string | string[] | null): this;
    setHeaders(headers: Headers): this;
    removeHeader(name: string): this;
    removeHeaders(headers: string[]): this;
    hasHeader(name: string): boolean;
    type(contentType: string): this;
    send(body: any): this;
    json(body: any): this;
    jsonBody(): any;
}

export interface Request extends HTTPBase {
    method: string;
    url: string;
    readonly absoluteUrl: string;
    readonly protocol: string;
    readonly hostname: string;
    readonly port: string;
    readonly pathname: string;
    hash: string;
    query: { [key: string]: string | string[] };
    readonly params: { [key: string]: string };
    recordingName: string;
    responseTime?: number;
    timestamp?: string;
    didRespond: boolean;
    id?: string;
    order?: number;
    action: ACTION | null;
}
export interface Response extends HTTPBase {
    statusCode: number;
    isBinary: boolean;
    readonly statusText: string;
    readonly ok: boolean;

    status(status: number): this;
    sendStatus(status: number): this;
    end(): Readonly<this>;
}
export interface Interceptor {
    abort(): void;
    passthrough(): void;
}
export type RequestRouteEvent = 'request';
export type RecordingRouteEvent = 'beforeReplay' | 'beforePersist';
export type ResponseRouteEvent = 'beforeResponse' | 'response';
export type ErrorRouteEvent = 'error';
export type AbortRouteEvent = 'abort';

export interface ListenerEvent {
    readonly type: string;
    stopPropagation: () => void;
}
export type ErrorEventListener = (req: Request, error: any, event: ListenerEvent) => void | Promise<void>;
export type AbortEventListener = (req: Request, event: ListenerEvent) => void | Promise<void>;
export type RequestEventListener = (req: Request, event: ListenerEvent) => void | Promise<void>;
export type RecordingEventListener = (req: Request, recording: any, event: ListenerEvent) => void | Promise<void>;
export type ResponseEventListener = (req: Request, res: Response, event: ListenerEvent) => void | Promise<void>;
export type InterceptHandler = (req: Request, res: Response, interceptor: Interceptor) => void | Promise<void>;
export class RouteHandler<PersisterOptions> {
    on(event: RequestRouteEvent, listener: RequestEventListener): RouteHandler<PersisterOptions>;
    on(event: RecordingRouteEvent, listener: RecordingEventListener): RouteHandler<PersisterOptions>;
    on(event: ResponseRouteEvent, listener: ResponseEventListener): RouteHandler<PersisterOptions>;
    on(event: ErrorRouteEvent, listener: ErrorEventListener): RouteHandler<PersisterOptions>;
    on(event: AbortRouteEvent, listener: AbortEventListener): RouteHandler<PersisterOptions>;
    off(event: RequestRouteEvent, listener?: RequestEventListener): RouteHandler<PersisterOptions>;
    off(event: RecordingRouteEvent, listener?: RecordingEventListener): RouteHandler<PersisterOptions>;
    off(event: ResponseRouteEvent, listener?: ResponseEventListener): RouteHandler<PersisterOptions>;
    off(event: ErrorRouteEvent, listener?: ErrorEventListener): RouteHandler<PersisterOptions>;
    off(event: AbortRouteEvent, listener?: AbortEventListener): RouteHandler<PersisterOptions>;
    once(event: RequestRouteEvent, listener: RequestEventListener): RouteHandler<PersisterOptions>;
    once(event: RecordingRouteEvent, listener: RecordingEventListener): RouteHandler<PersisterOptions>;
    once(event: ResponseRouteEvent, listener: ResponseEventListener): RouteHandler<PersisterOptions>;
    once(event: ErrorRouteEvent, listener: ErrorEventListener): RouteHandler<PersisterOptions>;
    once(event: AbortRouteEvent, listener: AbortEventListener): RouteHandler<PersisterOptions>;
    filter: (callback: (req: Request) => boolean) => RouteHandler<PersisterOptions>;
    passthrough(value?: boolean): RouteHandler<PersisterOptions>;
    intercept(fn: InterceptHandler): RouteHandler<PersisterOptions>;
    recordingName(recordingName?: string): RouteHandler<PersisterOptions>;
    configure(config: PollyConfig<PersisterOptions>): RouteHandler<PersisterOptions>;
    times(n?: number): RouteHandler<PersisterOptions>;
}
export class PollyServer<PersisterOptions> {
    timeout: (ms: number) => Promise<void>;
    get: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    put: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    post: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    delete: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    patch: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    head: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    options: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    merge: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    any: (routes?: string | string[]) => RouteHandler<PersisterOptions>;
    host(host: string, callback: () => void): void;
    namespace(path: string, callback: () => void): void;
}
export type PollyEvent = 'create' | 'stop' | 'register';
export type PollyEventListener = <PersisterOptions>(poll: Polly<PersisterOptions>) => void;
export class Polly<PersisterOptions> {
    static register<PersisterOptions>(Factory: typeof Adapter | PersisterType<PersisterOptions>): void;
    static unregister<PersisterOptions>(Factory: typeof Adapter | PersisterType<PersisterOptions>): void;
    static on(event: PollyEvent, listener: PollyEventListener): void;
    static off(event: PollyEvent, listener: PollyEventListener): void;
    static once(event: PollyEvent, listener: PollyEventListener): void;

    constructor(recordingName: string, options?: PollyConfig<PersisterOptions>);

    static VERSION: string;
    recordingName: string;
    recordingId: string;
    mode: MODE;
    server: PollyServer<PersisterOptions>;
    persister: Persister<PersisterOptions>;
    adapters: Map<string, Adapter>;
    config: PollyConfig<PersisterOptions>;

    pause(): void;
    play(): void;
    replay(): void;
    record(): void;
    passthrough(): void;
    stop(): Promise<void>;
    flush(): Promise<void>;
    configure(config: PollyConfig<PersisterOptions>): void;
    connectTo(name: string | typeof Adapter): void;
    disconnectFrom(name: string | typeof Adapter): void;
    disconnect(): void;
}

export const setupMocha: {
    <PersisterOptions>(config?: PollyConfig<PersisterOptions>, context?: any): void;
    beforeEach: <PersisterOptions>(config?: PollyConfig<PersisterOptions>, context?: any) => void;
    afterEach: (context?: any) => void;
};

export const setupQunit: {
    <PersisterOptions>(hooks: any, config?: PollyConfig<PersisterOptions>): void;
    beforeEach: <PersisterOptions>(hooks: any, config?: PollyConfig<PersisterOptions>) => void;
    afterEach: (hooks: any) => void;
};
