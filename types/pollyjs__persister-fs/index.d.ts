// Type definitions for @pollyjs/persister-fs 5.0
// Project: https://github.com/netflix/pollyjs/tree/master/packages/@pollyjs/persister-fs
// Definitions by: feinoujc <https://github.com/feinoujc>
//                 lizraeli <https://github.con/lizraeli>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import Persister from '@pollyjs/persister';
import { API } from '@pollyjs/node-server';

export interface FSPersisterOptions {
    fs?: { recordingsDir: string };
}
export default class FSPersister extends Persister<FSPersisterOptions> {
    api: API;
    get defaultOptions(): Required<FSPersisterOptions>;
}
