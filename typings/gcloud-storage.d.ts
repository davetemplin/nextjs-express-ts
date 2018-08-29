/// <reference types="node" />

declare namespace GoogleCloud {
    // https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/0.6.0/storage
    /** This class allows you interact with Google Cloud Storage. */
    interface Storage {
        bucket(name: string): Storage.Bucket;
    }

    namespace Storage {
        interface Acl {
            entity: string;
            role: string;
        }
    
        interface AclAction {
            add(options: AclActionOptions): Promise<[Acl, ApiResponse]>;
            delete(options: AclActionOptions): Promise<[Acl, ApiResponse]>;
            get(): Promise<[Acl[], ApiResponse]>;
            get(options: AclActionOptions): Promise<[Acl, ApiResponse]>;
            owners: AclActions;
            readers(): AclActions;
            update(options: AclActionOptions): Promise<[Acl, ApiResponse]>;
            writers(): AclActions;
        }
    
        interface AclActionOptions {
            /** Whose permissions will be added. */
            entity?: string;
            /** Permissions allowed for the defined entity. */
            role?: string;
            /** Select a specific revision of this file (as opposed to the latest version, the default). File Objects Only. */
            generation?: string;
        }
    
        interface AclActions {
            addAllAuthenticatedUsers(name: string): Promise<[Acl, ApiResponse]>;
            deleteAllAuthenticatedUsers(name: string): Promise<[Acl, ApiResponse]>;
            addAllUsers(name: string): Promise<[Acl, ApiResponse]>;
            deleteAllUsers(name: string): Promise<[Acl, ApiResponse]>;
            addDomain(name: string): Promise<[Acl, ApiResponse]>;
            deleteDomain(name: string): Promise<[Acl, ApiResponse]>;
            addGroup(name: string): Promise<[Acl, ApiResponse]>;
            deleteGroup(name: string): Promise<[Acl, ApiResponse]>;
            addProject(name: string): Promise<[Acl, ApiResponse]>;
            deleteProject(name: string): Promise<[Acl, ApiResponse]>;
            addUser(name: string): Promise<[Acl, ApiResponse]>;
            deleteUser(name: string): Promise<[Acl, ApiResponse]>;
        }    
    
        interface GetFilesOptions {
            /** Have pagination handled automatically. Default: true. */
            autoPaginate: boolean;
            /** 
             * Results will contain only objects whose names, aside from the prefix, do not contain delimiter.
             * Objects whose names, aside from the prefix, contain delimiter will have their name truncated after the delimiter, returned in `apiResponse.prefixes`.
             * Duplicate prefixes are omitted.
             */
            delimiter?: string;
            /** Filter results to objects whose names begin with this prefix. */
            prefix?: string;
            /** Maximum number of API calls to make. */
            maxApiCalls?: number;
            /** Maximum number of items plus prefixes to return. */
            maxResults?: number;
            /** A previously-returned page token representing part of the larger set of results to view. */
            pageToken?: string;
            /** If true, returns File objects scoped to their versions. */
            versions?: boolean;
        }
    
        interface AutoPaginateGetFilesOptions extends GetFilesOptions {
        }
    
        interface BucketFileOptions {
            generation: string|number;
            key: string;
        }
    
        // https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/0.6.0/storage/bucket
        /** This class allows you interact with a Google Cloud Storage bucket. */
        interface Bucket {
            /** 
             * Upload a file to the bucket.
             * @localPath The fully qualified path to the file you wish to upload to your bucket.
             * @options Configuration options.
             */
            upload(localPath: string, options?: BucketOptions): Promise<[File, ApiResponse]>;
            /**
             * Get File objects for the files currently in the bucket. 
             * @options Query object.
             */
            getFiles(options: AutoPaginateGetFilesOptions): Promise<[File[], GetFilesOptions, ApiResponse]>;
    
            /**
             * Create a file object.
             */
            file(name: string, options?: BucketFileOptions): File;
        }
    
        // https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/0.6.0/storage/file
        interface File {
            acl: AclAction;
            name: string;
            copy(destination: string|Bucket|File): Promise<[File, ApiResponse]>;
            createReadStream(options?: BucketOptions): NodeJS.ReadableStream;
            createResumableUpload(options?: BucketOptions): Promise<[string, ApiResponse]>;
            createWriteStream(options?: BucketOptions): NodeJS.WritableStream;
            delete(): Promise<[ApiResponse]>;
            download(): Promise<[Buffer, ApiResponse]>;
            download(options: {destination: string}): Promise<[ApiResponse]>;
            exists(): Promise<[boolean, ApiResponse]>;
            get(): Promise<[File, ApiResponse]>;
            getMetadata(): Promise<[any, ApiResponse]>;
            getSignedPolicy(options?: PolicyOptions): Promise<[Policy, ApiResponse]>;
        }
    
        /**
         * Apply a predefined set of access controls to this object.
         * authenticatedRead - Object owner gets OWNER access, and allAuthenticatedUsers get READER access.
         * bucketOwnerFullControl - Object owner gets OWNER access, and project team owners get OWNER access.
         * bucketOwnerRead - Object owner gets OWNER access, and project team owners get READER access.
         * private - Object owner gets OWNER access.
         * projectPrivate - Object owner gets OWNER access, and project team members get access according to their roles.
         * publicRead - Object owner gets OWNER access, and allUsers get READER access.
         */
        type AclType = 'authenticatedRead' | 'bucketOwnerFullControl' | 'bucketOwnerRead' | 'private' | 'projectPrivate' | 'publicRead';
    
        interface BucketOptions {
            /** The place to save your file. If given a string, the file will be uploaded to the bucket using the string as a filename. When given a File object, your local file will be uploaded to the File object's bucket and under the File object's name. Lastly, when this argument is omitted, the file is uploaded to your bucket using the name of the local file. */
            destination?: string;
            /** A custom encryption key. */
            encryptionKey?: string;
            /** Automatically gzip the file. This will set options.metadata.contentEncoding to gzip. */
            gzip?: boolean;
            /** Metadata object. */
            metadata?: any;
            /** The starting byte of the upload stream, for resuming an interrupted upload. Defaults to 0. */
            offset?: string;
            /** Apply a predefined set of access controls to this object. */
            predefinedAcl?: AclType;
            /** Make the uploaded file private. (Alias for options.predefinedAcl = 'private') */
            private?: boolean;
            /** Make the uploaded file public. (Alias for options.predefinedAcl = 'publicRead') */
            public?: boolean;
            /** Force a resumable upload. (default: true for files larger than 5 MB). */
            resumable?: boolean;
            /** The URI for an already-created resumable upload. */
            uri?: string;
            /** Possible values: "md5", "crc32c", or false. By default, data integrity is validated with an MD5 checksum for maximum reliability. CRC32c will provide better performance with less reliability. You may also choose to skip validation completely, however this is not recommended. */
            validation?: boolean;
        }  
    
        interface PolicyOptions {
            /** Array of request parameters and their expected value (e.g. [['$', '']]). Values are translated into equality constraints in the conditions field of the policy document (e.g. ['eq', '$', '']). If only one equality condition is to be specified, options.equals can be a one- dimensional array (e.g. ['$', '']). */
            equals?: string[];
            /** A timestamp when this policy will expire. Any value given is passed to new Date(). */
            expires?: Date;
            /** Array of request parameters and their expected prefixes (e.g. [['$', '']). Values are translated into starts-with constraints in the conditions field of the policy document (e.g. ['starts-with', '$', '']). If only one prefix condition is to be specified, options.startsWith can be a one- dimensional array (e.g. ['$', '']). */
            startsWith?: string[];
            /** ACL for the object from possibly predefined ACLs. */
            acl?: AclType;
            /** The URL to which the user client is redirected if the upload is successful. */
            successRedirect?: string;
            /** The status of the Google Storage response if the upload is successful. */
            successStatus?: string;
            /** Minimum/maximum values for the request's content length. */
            contentLengthRange?: {
                /** Minimum value for the request's content length. */
                min?: number;
                /** Maximum value for the request's content length. */
                max?: number;
            };
        }
    
        interface Policy {
            string: string;
            base64: string;
            signature: string;
        }
    }
}