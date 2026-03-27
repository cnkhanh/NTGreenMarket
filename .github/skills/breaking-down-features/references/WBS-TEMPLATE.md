# WBS Template (Structure)

## WBS Table Structure

| # | Task Name | Coding & UT Effort (hours) | (days) | Remarks | Assumption |
|:-:|:-----------|:---------------------------|:-------|:---------|:-------------|
| 1.0 | Authentication |  |  | Define high-level feature scope | N/A |
| 1.1 | Login |  |  | Describe login flow and input validation | Using internal DB |
| 1.1.1 | SSO via Corp Account |  |  | Integration with corporate SSO provider | Assume SSO token is standard OAuth2 |
| 1.1.2 | Login with Username or Password |  |  | Standard authentication process | Encrypt passwords using bcrypt |

## Guidelines
- Write each task name in plain "Verb + Noun" format (e.g., Validate Input, Display Dashboard).
- Break features into logical sub-features and granular tasks (up to 3 levels deep).
- Use the Remarks column to explain purpose or logic in short, meaningful phrases.
- Use the Assumption column to note missing details or chosen approaches.
- Leave effort columns blank for developers to estimate.

## Notes
If available, use the WBS.xlsx template provided by the client. This file is not bundled with the skill.
