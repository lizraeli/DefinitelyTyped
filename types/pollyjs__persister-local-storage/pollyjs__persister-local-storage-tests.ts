import LocalStoragePersister from '@pollyjs/persister-local-storage';
import { Polly } from '@pollyjs/core';

Polly.register(LocalStoragePersister);

new Polly('<recording>', {
    persister: LocalStoragePersister,
});

new Polly('<recording>', {
    persister: LocalStoragePersister,
    persisterOptions: {
        'local-storage': {
            context: globalThis,
        },
    },
});

new Polly('<recording>', {
    persister: LocalStoragePersister,
    persisterOptions: {
        'local-storage': {
            key: 'polly',
        },
    },
});

new Polly('<recording>', {
    persister: LocalStoragePersister,
    persisterOptions: {
        'local-storage': {
            context: globalThis,
            key: 'polly',
        },
    },
});
