import * as BigQuery from "@google-cloud/bigquery";

const bigquery = BigQuery({ projectId: 'ps-bigdata' });

export function test1() {
    return 'TESTING';
}

export async function test2() {
    let response = await bigquery.query(`SELECT * FROM alpha.canon_test1`);
    return response[0];
}