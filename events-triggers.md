
# Events and Triggers Documentation

This document provides an overview of the key events, triggers, and related components in the Oontop-Health-Final-PMI project. This serves as a reference for developers and contributors to understand how various parts of the application interact and function.

## Summary of Events and Triggers

### Fetch Patients on Mount

- **Event Name**: Fetch Patients on Mount
- **Trigger**: Component mounts
- **Key Function/Code**: `usePatients()` hook initializes patients, loading, and error states.
- **Type Involved**: `CreateTypePatient[]` (patients), `string` (error)
- **Outcome**: Patient data is loaded; errors are handled if any.

### Handle Data Fetch Error

- **Event Name**: Handle Data Fetch Error
- **Trigger**: `error` state is set by `usePatients`
- **Key Function/Code**: 
  \`\`\`javascript
  useEffect(() => { 
      if (error) toast.error(error); 
  }, [error])
  \`\`\`
- **Type Involved**: `string` (error)
- **Outcome**: Error message is displayed via `toast.error`.

### Initialize Filtered Patients

- **Event Name**: Initialize Filtered Patients
- **Trigger**: `patients` data is populated
- **Key Function/Code**: 
  \`\`\`javascript
  useEffect(() => { 
      setFilteredPatients(patients); 
  }, [patients])
  \`\`\`
- **Type Involved**: `CreateTypePatient[]` (filteredPatients)
- **Outcome**: `filteredPatients` state is set for display.

### Filter Patients

- **Event Name**: Filter Patients
- **Trigger**: User modifies search criteria
- **Key Function/Code**: `filterPatients()` in `SearchFilters.tsx`
- **Type Involved**: `CreateTypePatient[]` (filteredPatients)
- **Outcome**: `filteredPatients` state is updated with matching records based on search criteria.

### Group Patients by Provider

- **Event Name**: Group Patients by Provider
- **Trigger**: Rendering `PatientList`
- **Key Function/Code**: `groupByProvider(filteredPatients)`
- **Type Involved**: `Record<string, CreateTypePatient[]>`
- **Outcome**: Patients are grouped by provider keys for display.

### Select/Deselect Patients

- **Event Name**: Select/Deselect Patients
- **Trigger**: User checks/unchecks a patient checkbox
- **Key Function/Code**: `handleCheckboxChange(record: CreateTypePatient)`
- **Type Involved**: `CreateTypePatient[]` (selectedPatients)
- **Outcome**: `selectedPatients` state is updated.

### Calculate Total Duration

- **Event Name**: Calculate Total Duration
- **Trigger**: Merging patients
- **Key Function/Code**: `getTotalDuration(selectedPatients)`
- **Type Involved**: `number` (totalDuration)
- **Outcome**: Calculates the total treatment duration for selected patients.

### Merge Selected Patients

- **Event Name**: Merge Selected Patients
- **Trigger**: User clicks the merge button
- **Key Function/Code**: `mergePatients()` - handles merging logic and API call
- **Type Involved**: `CreateTypePatient[]` (selectedPatients), `CreateTypePatient` (mergedPatient)
- **Outcome**: Selected patients are merged; success or failure is notified.

### Error Handling During Merge

- **Event Name**: Error Handling During Merge
- **Trigger**: API call fails in `mergePatients()`
- **Key Function/Code**: 
  \`\`\`javascript
  catch(error => { 
      console.error('Error posting merged patient:', error); 
      toast.error('Failed to post merged patient.'); 
  })
  \`\`\`
- **Type Involved**: `any` (error)
- **Outcome**: Error is logged, and the user is notified of failure.

### Navigate on Merge Success

- **Event Name**: Navigate on Merge Success
- **Trigger**: Successful merge in `mergePatients()`
- **Key Function/Code**: `navigate('/oontop')`
- **Type Involved**: `void`
- **Outcome**: User is redirected to the `/oontop` page.

### Load Merged Patients Data

- **Event Name**: Load Merged Patients Data
- **Trigger**: User navigates to `/oontop`
- **Key Function/Code**: `mergedPatientsService.getMergedPatients()` fetches data from the server
- **Type Involved**: `CreateTypePatient[]` (mergedPatients)
- **Outcome**: Merged patient data is loaded from the server and displayed.

### Handle Load Merged Data Error

- **Event Name**: Handle Load Merged Data Error
- **Trigger**: Server returns an error during fetch of merged patients
- **Key Function/Code**: 
  \`\`\`javascript
  catch(error => { 
      console.error('Error fetching merged patients:', error); 
      setError('Error fetching merged patients'); 
  })
  \`\`\`
- **Type Involved**: `any` (error), `string` (error)
- **Outcome**: Error is logged and displayed to the user if data fetch fails.
