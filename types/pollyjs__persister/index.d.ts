// Type definitions for @pollyjs/persister 5.0
// Project: https://github.com/netflix/pollyjs/tree/master/packages/@pollyjs/persister
// Definitions by: feinoujc <https://github.com/feinoujc>
//                 silverchen <https://github.com/silverchen>
//                 Offir Golan <https://github.com/offirgolan>
//                 Lev Izraelit <https://github/lizraeli>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { Polly, Request, PersisterOptions } from '@pollyjs/core';

export interface Recording {
    [key: string]: any;
}


export default abstract class Persister {
    constructor(polly: Polly);
    private _cache: Map<string, Recording>;
    get options():  PersisterOptions;
    get defaultOptions(): {};
    get hasPending(): boolean;
    polly: Polly;
    recordings: Map<string, Recording>;
    persist(): Promise<void>;
    recordRequest(request: Request): void;
    find(recordingId: string): Recording;
    save(recordingId: string): void;
    delete(recordingId: string): void;
    findEntry(request: Request): void;
    stringify(data: Recording): string;
    findRecording(recordingId: string): Recording | null;
    saveRecording(recordingId: string, data: Recording): void;
    deleteRecording(recordingId: string): void;
}
