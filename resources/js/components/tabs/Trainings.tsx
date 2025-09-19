import { ApplicantFormData } from '@/forms/formTypes';
import { Box, TextField, Typography } from '@mui/material';

interface TrainingsProps {
    form: ApplicantFormData['trainings'];
    errors?: Partial<Record<keyof ApplicantFormData['trainings'], string>>;
    handleChange: <K extends keyof ApplicantFormData['trainings']>(section: 'trainings', field: K, value: ApplicantFormData['trainings'][K]) => void;
}

export default function Trainings({ form, errors, handleChange }: TrainingsProps) {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                Trainings (Optional)
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Training Course"
                value={form.name || ''}
                onChange={(e) => handleChange('trainings', 'name', e.target.value)}
                error={!!errors?.name}
                helperText={errors?.name}
            />

            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date Started"
                InputLabelProps={{ shrink: true }}
                value={form.date_start || ''}
                onChange={(e) => handleChange('trainings', 'date_start', e.target.value)}
                error={!!errors?.date_start}
                helperText={errors?.date_start}
            />

            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date Ended"
                InputLabelProps={{ shrink: true }}
                value={form.date_end || ''}
                onChange={(e) => handleChange('trainings', 'date_end', e.target.value)}
                error={!!errors?.date_end}
                helperText={errors?.date_end}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Training Institution"
                value={form.institution || ''}
                onChange={(e) => handleChange('trainings', 'institution', e.target.value)}
                error={!!errors?.institution}
                helperText={errors?.institution}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Certificate Received"
                value={form.certificate || ''}
                onChange={(e) => handleChange('trainings', 'certificate', e.target.value)}
                error={!!errors?.certificate}
                helperText={errors?.certificate}
            />
        </Box>
    );
}
