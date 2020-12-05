// Type definitions for @pollyjs/persister-rest 5.0
// Project: https://github.com/netflix/pollyjs/tree/master/packages/@pollyjs/persister-rest
// Definitions by: offirgolan <https://github.com/offirgolan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import Persister from '@pollyjs/persister';

export default class RESTPersister extends Persister {
    static get id(): 'rest';
}
