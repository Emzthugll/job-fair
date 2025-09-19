import { ApplicantFormData } from '@/forms/formTypes';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface JobPreferenceProps {
    form: ApplicantFormData['jobPreference'];
    errors?: Partial<Record<keyof ApplicantFormData['jobPreference'], string>>;
    handleChange: <K extends keyof ApplicantFormData['jobPreference']>(
        section: 'jobPreference',
        field: K,
        value: ApplicantFormData['jobPreference'][K],
    ) => void;
}

export default function JobPreference({ form, errors, handleChange }: JobPreferenceProps) {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                Job Preference
            </Typography>

            <FormControl fullWidth margin="normal" error={!!errors?.employment}>
                <InputLabel id="employment-label">Employment Type</InputLabel>
                <Select
                    label="Employment Type"
                    labelId="employment-label"
                    value={form?.employment || ''}
                    onChange={(e) => handleChange('jobPreference', 'employment', e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                </Select>

                {errors?.employment && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                        {errors.employment}
                    </Typography>
                )}
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Preferred Job"
                required
                value={form?.preferred_job || ''}
                onChange={(e) => handleChange('jobPreference', 'preferred_job', e.target.value)}
                error={!!errors?.preferred_job}
                helperText={errors?.preferred_job}
                inputProps={{ maxLength: 50 }}
            />
        </Box>
    );
}
