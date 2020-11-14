import Persister, { Recording } from '@pollyjs/persister';
import { Polly } from '@pollyjs/core';

Persister.id;
Persister.type;

class BasicCustomPersister extends Persister {}

const basicPersister = new BasicCustomPersister(new Polly('recording'));

basicPersister.options;

interface DB {
    [key: string]: Recording;
}

interface PersisterOptions {
    db: DB;
    save: (db: DB) => void;
}

class AdvancedCustomPersister extends Persister<PersisterOptions> {
    db: DB;

    constructor(polly: Polly) {
        super(polly);
        this.db = this.options.db;
    }

    findRecording(recordingId: string) {
        return this.db[recordingId] || null;
    }

    saveRecording(recordingId: string, data: Recording) {
        this.db[recordingId] = data;
        this.options.save(this.db);
    }
}

const advancedCustomPersister = new AdvancedCustomPersister(new Polly('recording'));

advancedCustomPersister.db;
advancedCustomPersister.options;
advancedCustomPersister.findRecording('123');
advancedCustomPersister.saveRecording('123', {});
