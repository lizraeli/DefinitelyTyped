import Persister from '@pollyjs/persister';
import { Polly } from '@pollyjs/core';

Persister.id;
Persister.type;

/** Basic Custom Persister */
class BasicCustomPersister extends Persister {}

new Polly('custom-persister', {
    persister: BasicCustomPersister,
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
    someValue?: string;
}

class AdvancedCustomPersister extends Persister<CustomPersisterOptions> {
    store: Store;

    constructor(polly: Polly<CustomPersisterOptions>) {
        super(polly);

        this.store = DB.load();
    }

    findRecording(recordingId: string) {
        return this.store[recordingId] || null;
    }

    async saveRecording(recordingId: string, data: any) {
        if (this.options) {
            this.options.someValue;
        }
        this.store[recordingId] = data;
        await DB.save(this.store);
    }
}

new Polly('custom-persister', {
    persister: AdvancedCustomPersister,
});

const polly = new Polly('custom-persister', {
    persister: AdvancedCustomPersister,
    persisterOptions: {
        someValue: 'hello',
    },
});

polly.persister.options?.disableSortingHarEntries;
polly.persister.options?.keepUnusedRequests;
polly.persister.options?.someValue;
