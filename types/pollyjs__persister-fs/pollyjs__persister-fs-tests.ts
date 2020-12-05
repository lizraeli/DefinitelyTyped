import FSPersister from '@pollyjs/persister-fs';
import { Polly } from '@pollyjs/core';

Polly.register(FSPersister);

new Polly('<recording>', {
    persister: FSPersister,
});

new Polly('<recording>', {
    persister: FSPersister,
    persisterOptions: {
        keepUnusedRequests: true,
    },
});

new Polly('<recording>', {
    persister: FSPersister,
    persisterOptions: {
        fs: {
            recordingsDir: 'recordings',
        },
    },
});
