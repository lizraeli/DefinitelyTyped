import FSPersister from '@pollyjs/persister-fs';
import { Polly } from '@pollyjs/core';

Polly.register(FSPersister);

new Polly('<recording>', {
    persister: FSPersister,
});

class CustomFSPersister extends FSPersister {
    save(recoringId: string) {
        const recording = this.recordings.get(recoringId);
        this.api.saveRecording(recoringId, recording);
    }
}

new Polly('custom-fs-persister', {
    persister: CustomFSPersister,
});
