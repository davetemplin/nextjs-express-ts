// https://cloud.google.com/datastore/docs

// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/1.1.0/datastore

declare namespace GoogleCloud {
    interface DataStore {
        createQuery(kind: string): DataStore.Query;
        createQuery(namespace: string, kind: string): DataStore.Query;
        delete(key: DataStore.Key|DataStore.Key[]): Promise<ApiResponse>;
        get(key: DataStore.Key|DataStore.Key[]): Promise<any[]>;
        insert(entity: DataStore.Entity): Promise<ApiResponse>;
        key(name: string|[string,number]|string[]): DataStore.Key;
        key(options: {namespace: string, path: [string,number]|[string,string]}): DataStore.Key;
        runQuery(query: DataStore.Query): Promise<DataStore.QueryResult>;
        save(entity: DataStore.Entity|DataStore.Entity[]): Promise<DataStore.SaveResult>;
        transaction(): DataStore.Transaction;
        update(entity: DataStore.Entity): Promise<ApiResponse>;
        upsert(entity: DataStore.Entity|DataStore.Entity[]): Promise<ApiResponse>;

        KEY: string;
        NO_MORE_RESULTS: number;
        MORE_RESULTS_AFTER_LIMIT: number;
        MORE_RESULTS_AFTER_CURSOR: number;
    }

    namespace DataStore {
        interface Key {
            id: string;
            kind: string;
            name: string;
            namespace: string;
            path: string[];
        }

        type QueryResult = [
            any[],
            {
                endCursor: string;
                moreResults: string;
            }
        ];

        type DatastoreQueryResult = [
            any[],
            {
                endCursor: string;
                moreResults: string;
            }
        ];
    
        interface Entity {
            key: Key;
            data: any;
        }
    
        type Value = string|number|boolean|Date|Key;
        type FilterOperator = '='|'<'|'>'|'<='|'>=';
    
        interface Query {
            filter(property: string, value: Value): Query;
            filter(property: string, operator: FilterOperator, value: Value): Query;
            groupBy(property: string|string[]): Query;
            order(property: string, options?: {descending: boolean}): Query;
            offset(n: number): Query;
            limit(n: number): Query;
            hasAncestor(key: Key): Query;
            start(cursorToken: string): Query;
            end(cursorToken: string): Query;
            select(property: string|string[]): Query;
            run(options?: {consistency: string}): Promise<QueryResult>;
            runStream(options?: {consistency: string}): QueryStream;
        }
    
        interface QueryStream {
            on(event: 'error', handler: {(err: Error): void}): QueryStream;
            on(event: 'data', handler: {(entity: Entity): void}): QueryStream;
            on(event: 'info', handler: {(info: any): void}): QueryStream;
            on(event: 'end', handler: {(): void}): QueryStream;
        }
        
        type SaveResult = Array<{
            mutationResults: Array<{
                key: {
                    partitionId: {
                        projectId: string;
                        namespaceId: string;
                    };
                    path: Array<{
                        id_type: string;
                        kind: string;
                        id: string;
                        name: string;
                    }>;
                    version: string;
                    conflictDetected: boolean;
                };
                indexUpdates: number;
            }>
        }>;

        interface Transaction {
            commit(): Promise<ApiResponse>;
            delete(key: Key|Key[]): Promise<ApiResponse>;
            get(key: Key|Key[], options?: {consistency?: string, maxApiCalls?: number}): Promise<Entity>;
            rollback(): Promise<ApiResponse>;
            run(): Promise<[Transaction, ApiResponse]>;
            save(entity: Entity): Promise<ApiResponse>;
        }
    }
}