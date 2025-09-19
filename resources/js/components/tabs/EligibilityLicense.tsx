import { ApplicantFormData } from '@/forms/formTypes';
import { Box, TextField, Typography } from '@mui/material';

interface EligibilityLicenseProps {
    form: ApplicantFormData['eligibility'];
    errors?: Partial<Record<keyof ApplicantFormData['eligibility'], string>>;
    handleChange: <K extends keyof ApplicantFormData['eligibility']>(
        section: 'eligibility',
        field: K,
        value: ApplicantFormData['eligibility'][K],
    ) => void;
}

export default function EligibilityLicense({ form, errors, handleChange }: EligibilityLicenseProps) {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                Eligibility License (Optional)
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="License or Eligibility Name"
                value={form.name || ''}
                onChange={(e) => handleChange('eligibility', 'name', e.target.value)}
                error={!!errors?.name}
                helperText={errors?.name}
            />

            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date Taken"
                InputLabelProps={{ shrink: true }}
                value={form.date_of_issuance || ''}
                onChange={(e) => handleChange('eligibility', 'date_of_issuance', e.target.value)}
                error={!!errors?.date_of_issuance}
                helperText={errors?.date_of_issuance}
            />

            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Valid Until"
                InputLabelProps={{ shrink: true }}
                value={form.date_of_expiration || ''}
                onChange={(e) => handleChange('eligibility', 'date_of_expiration', e.target.value)}
                error={!!errors?.date_of_expiration}
                helperText={errors?.date_of_expiration}
            />
        </Box>
    );
}
