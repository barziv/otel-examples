export type LogInput = {
    message: string;
    level: string;
    trace: {
        spanId: string;
        traceId: string;
    },
    entity: {
        id: string;
        source: string;
    },
    file: {
        size: number;
        path: string;
        extension: string;
        group: string;
    }
}