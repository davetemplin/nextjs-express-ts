import * as BigQuery from "@google-cloud/bigquery";

const bigquery = BigQuery({projectId: 'ps-bigdata'});

export async function test2() {
    let response = await bigquery.query(`
        SELECT * EXCEPT(n) FROM (
            SELECT
                manufacturer_name,
                product_name,
                product_id,
                seller_id,
                capture_id,
                capture_date,
                price,
                ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY capture_date DESC) n
            FROM alpha.canon_metrics
            WHERE product_id IN (7756726, 7748331)
            AND seller_id=2
            )
            WHERE n=1;
    `);
    return response[0];
}