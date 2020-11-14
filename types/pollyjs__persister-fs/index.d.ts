// Type definitions for @pollyjs/persister-fs 5
// Project: https://github.com/netflix/pollyjs/tree/master/packages/@pollyjs/persister-fs
// Definitions by: feinoujc <https://github.com/feinoujc>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import Persister from '@pollyjs/persister';
import { API } from '@pollyjs/node-server';

export default class FSPersister extends Persister {
    api: API;
    get defaultOptions(): {
        recordingsDir: string;
    };
}
