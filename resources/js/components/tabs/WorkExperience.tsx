import { ApplicantFormData } from '@/forms/formTypes';
import { Box, TextField, Typography } from '@mui/material';

interface WorkExperienceProps {
    form: ApplicantFormData['workExperience'];
    errors?: Partial<Record<keyof ApplicantFormData['workExperience'], string>>;
    handleChange: <K extends keyof ApplicantFormData['workExperience']>(
        section: 'workExperience',
        field: K,
        value: ApplicantFormData['workExperience'][K],
    ) => void;
}

export default function WorkExperience({ form, errors, handleChange }: WorkExperienceProps) {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                Work Experience (Optional)
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Company Name"
                value={form.company || ''}
                onChange={(e) => handleChange('workExperience', 'company', e.target.value)}
                error={!!errors?.company}
                helperText={errors?.company}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Company Address"
                value={form.address || ''}
                onChange={(e) => handleChange('workExperience', 'address', e.target.value)}
                error={!!errors?.address}
                helperText={errors?.address}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Position"
                value={form.position || ''}
                onChange={(e) => handleChange('workExperience', 'position', e.target.value)}
                error={!!errors?.position}
                helperText={errors?.position}
            />

            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date Started"
                InputLabelProps={{ shrink: true }}
                value={form.date_started || ''}
                onChange={(e) => handleChange('workExperience', 'date_started', e.target.value)}
                error={!!errors?.date_started}
                helperText={errors?.date_started}
            />

            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date Ended"
                InputLabelProps={{ shrink: true }}
                value={form.date_ended || ''}
                onChange={(e) => handleChange('workExperience', 'date_ended', e.target.value)}
                error={!!errors?.date_ended}
                helperText={errors?.date_ended}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Status (e.g., Regular, Contractual)"
                value={form.status || ''}
                onChange={(e) => handleChange('workExperience', 'status', e.target.value)}
                error={!!errors?.status}
                helperText={errors?.status}
            />
        </Box>
    );
}
