# API Documentation References

## Data Mapping Template Structure

| Column Name | Description | Example |
|--------------|-------------|----------|
| Source Table | Internal database table name | transactions |
| Source Field | Column name from internal table | amount |
| Source Data Type | Data format in internal system | decimal(12,2) |
| Target API Parameter | Parameter name in API specification | totalAmount |
| API Data Type | Expected data type from API | integer |
| Is Required | Whether the API parameter is mandatory | Yes |
| Transformation Rule | Rule to convert or align formats | amount * 1000 |
| Validation Rule | Constraints, regex, or business rule | must be > 0 |
| Remarks | Clarifications or notes | API requires integer cents |

## Example Mapping Table

| Source Table | Source Field | Source Data Type | Target API Parameter | API Data Type | Is Required | Transformation Rule | Validation Rule | Remarks |
|---------------|---------------|------------------|----------------------|---------------|--------------|---------------------|-----------------|----------|
| transactions | amount | decimal(12,2) | totalAmount | integer | Yes | amount * 1000 | > 0 | Convert to cents |
| customers | phone_number | varchar(20) | customerPhone | string | Yes | formatToE164(phone_number) | must start with + | API requires E.164 |
| orders | order_id | varchar(50) | requestId | string | Yes | concat('ORD-', order_id) | not null | Ensure unique prefix |
| merchant | created_date | datetime | requestDate | string | Yes | formatDate(created_date, 'yyyy-MM-ddTHH:mm:ss') | valid ISO date | Format as ISO8601 |

## Example Output in Markdown

| Source Table | Source Field | Target API Parameter | Transformation Rule | Remarks |
|---------------|---------------|----------------------|---------------------|----------|
| transactions | amount | totalAmount | amount * 1000 | Convert to smallest unit |
| customers | phone_number | customerPhone | formatToE164(phone_number) | Add +84 prefix |
| orders | order_id | requestId | concat('ORD-', order_id) | Unique ID prefix |

## Data Mapping Template File

If available, use the "Data Mapping Template 1.xlsx" provided by the client. This file is not bundled with the skill.
