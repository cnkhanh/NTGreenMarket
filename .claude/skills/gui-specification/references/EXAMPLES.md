# GUI Specification Examples

## Sample UI Specification Table

| Field Name | Type | Mandatory | Default Value | Description | Data Source | Validation Rules | Visibility Logic | Deviation from Style Guide |
|-----------------|-----------|---------------|--------------------|------------------|------------------|------------------------|------------------------|--------------------------------|
| Full Name | Text Field | Yes | N/A | Displays user's full legal name | From user profile / manual input | Must contain only alphabetic characters | Always visible | None |
| Date of Birth | Date Picker | Yes | N/A | User selects date of birth | Manual input | Must be a past date only | Always visible | None |
| ID Type | Dropdown | Yes | National ID | Select ID type (National ID / Passport) | Static list | Must select one | Always visible | None |
| ID Number | Text Field | Yes | N/A | Enter user's ID number | Manual input | Must match regex pattern for selected ID type | Visible after ID Type selected | None |
| Upload Photo | Button | No | N/A | Upload image of ID | Camera / file upload | File size < 5MB | Always visible | Image preview follows upload |
| Accept Terms | Checkbox | Yes | Unchecked | User must accept terms to proceed | N/A | Must be checked before Continue button activates | Always visible | None |

## Example Output

### Screen Title: Verify Identity - Step 2 of 4

| Field Name | Type | Mandatory | Default Value | Description | Data Source | Validation Rules | Visibility Logic | Deviation from Style Guide |
|-----------------|-----------|---------------|--------------------|------------------|------------------|------------------------|------------------------|--------------------------------|
| ID Type | Dropdown | Yes | National ID | Select user identification type | Static list | Must select one | Always visible | None |
| ID Number | Text Field | Yes | N/A | Enter user's ID number | Manual input | Must contain 8-12 alphanumeric characters | Visible after ID Type selected | None |
| Upload ID Photo | Button | No | N/A | Upload image of ID | Camera / File Upload | Max 5MB, JPG or PNG only | Always visible | None |
| Continue | Button | Yes | N/A | Proceeds to next verification step | N/A | Enabled only when all mandatory fields are complete | Always visible | None |

Behavior notes:
- The Continue button is disabled until all mandatory fields are completed.
- Upon tapping Upload ID Photo, system opens native file picker or camera.
- Validation errors appear inline below each field.
- Progress indicator at the top shows Step 2 of 4.
