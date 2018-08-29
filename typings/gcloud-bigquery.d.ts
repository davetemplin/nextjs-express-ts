// https://googlecloudplatform.github.io/google-cloud-node/#/docs/bigquery/0.9.6/bigquery

declare namespace GoogleCloud {

    interface BigQuery {
        createDataset(id: string, options?: BigQuery.DatasetOptions): Promise<[BigQuery.Dataset, ApiResponse]>;
        createQueryStream(options: string|BigQuery.QueryOptions): BigQuery.Stream<any>;
        dataset(id: string): BigQuery.Dataset;
        date(value: string|BigQuery.DateOptions): BigQuery.Date;
        datetime(value: string|BigQuery.DateTimeOptions): BigQuery.DateTime;
        getDatasets(options: BigQuery.DatasetOptions): Promise<BigQuery.DatasetList>;
        getDatasetsStream(options: BigQuery.DatasetOptions): BigQuery.Stream<BigQuery.Dataset>;
        getJobs(options: BigQuery.JobOptions): Promise<BigQuery.Job[]>;
        getJobsStream(options: BigQuery.JobOptions): BigQuery.Stream<BigQuery.Job>;
        job(id: string): BigQuery.Job;
        query(query: string): Promise<[any[]]>;
        query(options: BigQuery.QueryOptions): Promise<[any[]]>;
        startQuery(options: BigQuery.StartQueryOptions): Promise<[BigQuery.Job, ApiResponse]>;
        time(value: string|BigQuery.TimeOptions): BigQuery.Time;
        timestamp(value: Date): BigQuery.Time;
    }

    namespace BigQuery {

        interface ApiOptions {
            autoPaginate?: boolean;
            maxApiCalls?: number;
            maxResults?: number;
        }
        
        interface CreateTableOptions {
            schema: string|object;
        }

        interface Dataset {
            create(): Promise<[Dataset, ApiResponse]>;
            createTable(id: string, options: CreateTableOptions): Promise<[Table, ApiResponse]>;
            delete(options?: {force: boolean}): Promise<ApiResponse>;
            exists(): Promise<boolean>;
            get(options?: {autocreate: boolean}): Promise<[Dataset, ApiResponse]>;
            getMetadata(): Promise<[any, ApiResponse]>;
            getTables(options?: DatasetOptions): Promise<[Table[], ApiResponse]>;
            getTablesStream(options?: DatasetOptions): Stream<Table>;
            setMetadata(metadata: object): Promise<ApiResponse>;
            table(id: string): Table;
        }

        interface DatasetOptions extends ApiOptions {
            all?: boolean;
            pageToken?: string;
        }

        interface StartQueryOptions {
            query: string;
            destination?: Table;
        }

        interface Stream<T> {
            on(event: 'error', handler: {(err: Error): void}): Stream<T>;
            on(event: 'data', handler: {(dataset: T): void}): Stream<T>;
            on(event: 'end', handler: {(): void}): Stream<T>;
        }

        interface DatasetList {
        }

        interface Date {
        }

        interface DateOptions {
            year?: string|number;
            month?: string|number;
            day?: string|number;
        }

        interface DateTime {
        }

        type DateTimeOptions = DateOptions | TimeOptions;

        interface JobOptions extends ApiOptions {
            allUsers?: boolean;
            pageToken?: string;
            projection?: string;
            stateFilter?: string;
        }

        interface Job {
            cancel(): Promise<ApiResponse>;
            exists(): Promise<boolean>;
            get(): Promise<[Job, ApiResponse]>;
            getMetadata(): Promise<[any, ApiResponse]>;
            getQueryResults(options?: QueryResultsOptions): Promise<any[]>;
            getQueryResultsStream(options?: QueryResultsOptions): NodeJS.ReadableStream;
        }        

        interface QueryOptions extends ApiOptions {
            query: string;
            params?: any[]|object;
            timeoutMs?: number;
        }

        interface QueryResultsOptions extends ApiOptions {
            pageToken?: string;
            startIndex?: number;
            timeoutMs?: number;
        }

        interface Table {
            copy(destination: Table, metadata?: object): Promise<[Job, ApiResponse]>;
            copyFrom(source: Table|Table[], metadata?: object): Promise<[Job, ApiResponse]>;
            create(options?: CreateTableOptions): Promise<[Table, ApiResponse]>;
            createReadStream(options?: {}): Stream<any>;
            createWriteStream(metadata?: string|object): NodeJS.WritableStream;
            delete(): Promise<[ApiResponse]>;
            exists(): Promise<boolean>;
            export(destination: Storage.File, options?: {format?: 'CSV'|'JSON'|'AVRO', gzip?: boolean}): Promise<[Job, ApiResponse]>;
            get(options?: {autoCreate: boolean}): Promise<[Table, ApiResponse]>;
            getMetadata(): Promise<[any, ApiResponse]>;
            getRows(options?: ApiOptions): Promise<[any[], ApiResponse]>;
            import(source: string|Storage.File, metadata?: object): Promise<[Job, ApiResponse]>;
            insert(rows: object|object[], options?: TableInsertOptions): Promise<ApiResponse>;
            setMetadata(metadata?: TableMetadataOptions): Promise<ApiResponse>;
        }

        interface TableInsertOptions {
            ignoreUnknownValues?: boolean;
            raw?: boolean;
            skipInvalidRows?: boolean;
            templateSuffix?: string;
        }

        interface TableMetadataOptions {
            description?: string;
            name?: string;
            schema?: string|object;
        }
        
        interface Time {
        }

        interface TimeOptions {
            hours?: string|number;
            minutes?: string|number;
            seconds?: string|number;
            fractional?: string|number;
        }
    }
}