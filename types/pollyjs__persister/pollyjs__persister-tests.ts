import Persister, { Recording } from '@pollyjs/persister';
import { Polly } from '@pollyjs/core';

Persister.id;
Persister.type;

/** Basic Custom Persister */
class BasicCustomPersister extends Persister {}

const basicPersister = new BasicCustomPersister(new Polly('recording'));

basicPersister.options;

new Polly('custom-persister', {
    persister: BasicCustomPersister,
});
/** Advanced Custom Persister */
interface Store {
    [key: string]: Recording;
}

// tslint:disable-next-line: no-unnecessary-class
declare class DB {
    static load(): Store;
    static save(store: Store): Promise<void>;
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

    saveRecording(recordingId: string, data: Recording) {
        this.store[recordingId] = data;
        DB.save(this.store);
    }
}

const advancedCustomPersister = new AdvancedCustomPersister(new Polly('recording'));

advancedCustomPersister.store;
advancedCustomPersister.options;
advancedCustomPersister.findRecording('123');
advancedCustomPersister.saveRecording('123', {});

new Polly('custom-persister', {
    persister: AdvancedCustomPersister,
});
