// https://cloud.google.com/pubsub/docs
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.56.0/pubsub

declare namespace GoogleCloud {
    interface PubSub {
        topic(name: string): PubSub.Topic;
    }
    namespace PubSub {
        interface Publisher {
            publish(message: Buffer): Promise<string[]>;
        }
    
        interface Message {
            id: string;
            data: Buffer;
            length: number;
            publishTime: Date;
            ackId: string;
            attributes: Object;
            nack: {(): void};
            received: number;
        }
    
        interface Subscription {
            on(name: 'error', handler: {(err: Error): void}): void;
            on(name: 'message', handler: {(message: Buffer): void}): void;
            removeListener(name: 'error', handler: {(err: Error): void}): void;
            removeListener(name: 'message', handler: {(message: Buffer): void}): void;
            pull(options?: {maxResults: number}): Promise<[Message[], ApiResponse]>;
        }
    
        interface Topic {
            createSubscription(name: string, options?: {ackDeadline?: number}): Promise<[Subscription, ApiResponse|undefined]>;
            publisher(): Publisher;
        }    
    }
}