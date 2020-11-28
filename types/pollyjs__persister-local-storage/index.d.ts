// Type definitions for @pollyjs/persister-local-storage 5.0
// Project: https://github.com/netflix/pollyjs/tree/master/packages/@pollyjs/persister-local-storage
// Definitions by: offirgolan <https://github.com/offirgolan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import Persister from '@pollyjs/persister';

export interface PersisterOptions {
    context: any;
    key: string;
}

export default class LocalStoragePersister extends Persister<PersisterOptions> {
    static get id(): 'local-storage';
}
