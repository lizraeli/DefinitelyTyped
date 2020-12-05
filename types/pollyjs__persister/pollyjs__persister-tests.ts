import Persister from '@pollyjs/persister';
import { Polly } from '@pollyjs/core';

Persister.id;
Persister.type;

/** Basic Custom Persister */
class BasicCustomPersister extends Persister {}

new Polly('custom-persister', {
    persister: BasicCustomPersister,
});

new Polly('custom-persister', {
    persister: BasicCustomPersister,
    persisterOptions: {
        keepUnusedRequests: true,
    },
});

/** Advanced Custom Persister */
interface Store {
    [key: string]: any;
}

// tslint:disable-next-line: no-unnecessary-class
declare class DB {
    static load(): Store;
    static save(store: Store): Promise<void>;
}

interface CustomPersisterOptions {
    custom: {
        someValue?: string;
    };
}

class AdvancedCustomPersister extends Persister {
    store: Store;

    constructor(polly: Polly) {
        super(polly);
        this.store = DB.load();
    }

    findRecording(recordingId: string) {
        return this.store[recordingId] || null;
    }

    async saveRecording(recordingId: string, data: any) {
        if (this.options) {
            // The two boolean properties below have defaults set by cypress
            this.options.disableSortingHarEntries;
            this.options.keepUnusedRequests;
            // Other properties are of type `any`
            this.options.randomValue;
        }
        this.store[recordingId] = data;
        await DB.save(this.store);
    }
}

new Polly('custom-persister', {
    persister: AdvancedCustomPersister,
});

new Polly('custom-persister', {
    persister: AdvancedCustomPersister,
    persisterOptions: {
        custom: {
            someValue: 'hello',
        },
    },
});

new Polly('custom-persister', {
    persister: AdvancedCustomPersister,
    persisterOptions: {
        custom: {
            someValue: 'hello',
        },
        keepUnusedRequests: true,
    },
});
