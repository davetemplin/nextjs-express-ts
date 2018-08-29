// Type definitions for Google Cloud Platform
// Project: https://googlecloudplatform.github.io/google-cloud-node
// Definitions by: Dave Templin <https://github.com/davetemplin/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Additional Links:
// https://github.com/GoogleCloudPlatform/google-cloud-node/issues/952


/// <reference path="gcloud-bigquery.d.ts" />
/// <reference path="gcloud-datastore.d.ts" />
/// <reference path="gcloud-pubsub.d.ts" />
/// <reference path="gcloud-storage.d.ts" />
/// <reference path="gcloud-vision.d.ts" />

declare module 'google-cloud' {
    export var bigquery: {(options?: GoogleCloud.AuthOptions): GoogleCloud.BigQuery};
    export var datastore: {(options?: GoogleCloud.AuthOptions): GoogleCloud.DataStore};
    export var pubsub: {(options?: GoogleCloud.AuthOptions): GoogleCloud.PubSub};
    export var storage: {(options?: GoogleCloud.AuthOptions): GoogleCloud.Storage};
    export var vision: {(options?: GoogleCloud.AuthOptions): GoogleCloud.Vision};
}

declare module '@google-cloud/bigquery' {
    var bigquery: {(options?: GoogleCloud.AuthOptions): GoogleCloud.BigQuery};
    export = bigquery;
}

declare module '@google-cloud/datastore' {
    var datastore: {(options?: GoogleCloud.AuthOptions): GoogleCloud.DataStore};
    export = datastore;
}

declare module '@google-cloud/pubsub' {
    var pubsub: {(options?: GoogleCloud.AuthOptions): GoogleCloud.PubSub};
    export = pubsub;
}

declare module '@google-cloud/storage' {
    var storage: {(options?: GoogleCloud.AuthOptions): GoogleCloud.Storage};
    export = storage;
}

declare module '@google-cloud/vision' {
    var vision: {(options?: GoogleCloud.AuthOptions): GoogleCloud.Vision};
    export = vision;
}

declare namespace GoogleCloud {
    interface AuthOptions {
        /** If you wish, you can set an environment variable (GCLOUD_PROJECT) in place of specifying this inline. Or, if you have provided a service account JSON key file as the config.keyFilename property explained above, your project ID will be detected automatically. */
        projectId?: string;
        /** Path to a .json, .pem, or .p12 key file. */
        keyFilename?: string;
        /** Credentials object containing client_email and private_key properties. */
        credentials?: {private_key: string, client_email: string};
    }

    interface ApiResponse {
        responses: Array<{}>;
    }
}