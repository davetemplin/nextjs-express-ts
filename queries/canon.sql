CREATE TEMPORARY FUNCTION json_array_length(text STRING) RETURNS INT64 LANGUAGE js AS """
  let value = text ? JSON.parse(text) : undefined;
  return value instanceof Array ? value.length : null;
""";

CREATE TEMPORARY FUNCTION to_boolean(value ANY TYPE) AS (
  CASE
    WHEN value IS NULL THEN NULL
    WHEN SAFE_CAST(value AS STRING) = 'true' THEN TRUE
    WHEN SAFE_CAST(value AS STRING) = 'false' THEN FALSE
    WHEN SAFE_CAST(value AS FLOAT64) > 0 THEN TRUE
    WHEN SAFE_CAST(value AS INT64) = 0 THEN FALSE
    WHEN LENGTH(SAFE_CAST(value AS STRING)) > 0 THEN TRUE
    ELSE FALSE
  END
);

CREATE TEMPORARY FUNCTION analyze_name(source STRING, target STRING)
RETURNS STRING
LANGUAGE js AS "return analyze_name(source, target, {});"
OPTIONS (library="gs://ps-bigdata/cloud-functions/analyzers/name_analyzer.js");

CREATE TEMPORARY FUNCTION name_status(source STRING, target STRING)
RETURNS STRING
LANGUAGE js AS
"""
var analyze = JSON.parse(analyze_name(source, target));
if (analyze.exact === true && analyze.misses === 0 && analyze.extra === 0)
    return "1";
let result = [
    analyze.spacing === false ? 0 : .2,
    analyze.caps === false ? 0 : .2,
    analyze.symbol === false ? 0 : .2,
    analyze.inorder === false ? 0 : .2,
    analyze.misses > 0 ? 0 : .1,
    analyze.extra > 0 ? 0 : .1
].filter(value => !!value);
return result && result.length ? result.reduce((a, b) => a + b).toFixed(2).toString() : "";
""";

CREATE TEMPORARY FUNCTION name_status_details(source STRING, target STRING)
RETURNS STRING
LANGUAGE js AS
"""
var analyze = JSON.parse(analyze_name(source, target));
return [
    analyze.exact === true && analyze.misses === 0 && analyze.extra === 0 ? "exact" : "",
    analyze.spacing === false ? "spacing" : "",
    analyze.caps === false ? "caps" : "",
    analyze.symbol === false ? "symbol" : "",
    analyze.inorder === false ? "order" : "",
    analyze.misses > 0 ? `missing=${analyze.misses}` : "",
    analyze.extra > 0 ? `extra=${analyze.extra}` : ""
].filter(value => !!value).join(", ");
""";

WITH
products AS (
  SELECT
    m.name manufacturer_name,
    p.name product_name,
    productID product_id,
    p.country_code,
    COALESCE(sku, p.model) sku,
    manufacturerGroupID group_id
    --groupName group_name
  FROM ClientDB.ProductCatalog
  JOIN pricespider.products p ON p.id=productID
  JOIN pricespider.manufacturers m ON m.id=p.manufacturer_id
  LEFT OUTER JOIN ClientDB.DataFeedProduct USING(manufacturerGroupID, dataFeedProductID)
  --LEFT OUTER JOIN ClientDB.ManufacturerGroup USING(manufacturerGroupID)
  WHERE manufacturerGroupID IN (1653, 1635)
  AND productID IN (7756726, 9919827, 10356909, 7748331, 10413940, 8318959)
),
sellers AS (
  SELECT id seller_id, name seller_name FROM pricespider.sellers WHERE id IN (2, 228, 25432, 993189)
),
captures AS (
  SELECT * EXCEPT(n) FROM (
    SELECT capture_id, capture_date, capture_url, tags, data, product_id, seller_id,
    ROW_NUMBER() OVER (PARTITION BY capture_id ORDER BY COALESCE(select_date, capture_date) DESC) n
    FROM alpha.captures
    WHERE product_id IN (7756726, 9919827, 10356909, 7748331, 10413940, 8318959)
  )
)

SELECT
  country_code,
  sku,
  manufacturer_name,
  product_name,
  seller_name,
  JSON_EXTRACT_SCALAR(data, '$.name.value') title,
  IF(capture_id IS NOT NULL, SAFE_CAST(name_status(product_name, JSON_EXTRACT_SCALAR(data, '$.name.value')) AS FLOAT64), NULL) title_error,
  IF(capture_id IS NOT NULL, name_status_details(product_name, JSON_EXTRACT_SCALAR(data, '$.name.value')), NULL) title_error_details,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.price.value') AS FLOAT64) price,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.list_price.value') AS FLOAT64) list_price,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.was_price.value') AS FLOAT64) was_price,
  JSON_EXTRACT_SCALAR(data, '$.model.value') model,
  JSON_EXTRACT_SCALAR(data, '$.vpn.value') vpn,
  JSON_EXTRACT_SCALAR(data, '$.upc.value') upc,
  JSON_EXTRACT_SCALAR(data, '$.seller_upc.value') seller_upc,
  JSON_EXTRACT_SCALAR(data, '$.seller_category.value') seller_category,
  JSON_EXTRACT_SCALAR(data, '$.brand_name.value') brand_name,
  to_boolean(JSON_EXTRACT_SCALAR(data, '$.in_stock.value')) in_stock,
  json_array_length(JSON_EXTRACT(data, '$.images.value')) image_count,
  json_array_length(JSON_EXTRACT(data, '$.videos.value')) video_count,
  JSON_EXTRACT_SCALAR(data, '$.buybox_seller_name.value') buybox_seller_name,
  STARTS_WITH(seller_name, JSON_EXTRACT_SCALAR(data, '$.buybox_seller_name.value')) buybox_direct,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.question_count.value') AS INT64) question_count,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.answer_count.value') AS INT64) answer_count,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.review_count.value') AS INT64) review_count,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.review_score.value') AS FLOAT64) review_score,
  SAFE_CAST(JSON_EXTRACT_SCALAR(data, '$.feature_bullets.value') AS INT64) feature_bullets,
  JSON_EXTRACT_SCALAR(data, '$.prodrank_1.value') prodrank_1,
  JSON_EXTRACT_SCALAR(data, '$.prodrank_2.value') prodrank_2,
  JSON_EXTRACT_SCALAR(data, '$.rankcat_1.value') rankcat_1,
  JSON_EXTRACT_SCALAR(data, '$.rankcat_2.value') rankcat_2,
  to_boolean(JSON_EXTRACT_SCALAR(data, '$.amazon_choice.value')) amazon_choice,
  JSON_EXTRACT_SCALAR(data, '$.amazon_choice_category.value') amazon_choice_category,
  to_boolean(JSON_EXTRACT_SCALAR(data, '$.amazon_fulfilled.value')) amazon_fulfilled,
  to_boolean(JSON_EXTRACT_SCALAR(data, '$.subscribe_and_save.value')) subscribe_and_save,
  to_boolean(JSON_EXTRACT_SCALAR(data, '$.webcollage.value')) webcollage,
  capture_url,
  capture_date,
  capture_id,
  group_id,
  product_id,
  seller_id
FROM captures
JOIN products USING(product_id)
JOIN sellers USING(seller_id);