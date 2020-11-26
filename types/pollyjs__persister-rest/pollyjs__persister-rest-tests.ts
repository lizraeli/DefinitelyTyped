import RESTPersister from '@pollyjs/persister-rest';
import { Polly } from '@pollyjs/core';

Polly.register(RESTPersister);

new Polly('<recording>', {
    persister: RESTPersister,
});

new Polly('<recording>', {
    persister: RESTPersister,
    persisterOptions: {
        rest: {
            host: 'http://localhost.com:4000',
        },
    },
});

new Polly('<recording>', {
    persister: RESTPersister,
    persisterOptions: {
        rest: {
            host: 'http://localhost.com:4000',
            apiNamespace: '/polly',
        },
    },
});
