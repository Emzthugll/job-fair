import { ApplicantFormData } from '@/forms/formTypes';
import { Box, TextField, Typography } from '@mui/material';

interface EducationalBackgroundProps {
    form: ApplicantFormData['education'];
    errors?: Partial<Record<keyof ApplicantFormData['education'], string>>;
    handleChange: <K extends keyof ApplicantFormData['education']>(section: 'education', field: K, value: ApplicantFormData['education'][K]) => void;
}

export default function EducationalBackground({ form, errors, handleChange }: EducationalBackgroundProps) {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                Educational Background (Highest)
            </Typography>

            {/* Level */}
            <TextField
                fullWidth
                margin="normal"
                label="Level (High School, College, Graduate)"
                required
                value={form.level || ''}
                onChange={(e) => handleChange('education', 'level', e.target.value)}
                error={!!errors?.level}
                helperText={errors?.level}
            />

            {/* Course */}
            <TextField
                fullWidth
                margin="normal"
                label="Course"
                required
                value={form.course || ''}
                onChange={(e) => handleChange('education', 'course', e.target.value)}
                error={!!errors?.course}
                helperText={errors?.course}
            />

            {/* Year Graduated */}
            <TextField
                fullWidth
                margin="normal"
                label="Year Graduated"
                required
                value={form.year_graduated || ''}
                onChange={(e) => handleChange('education', 'year_graduated', e.target.value)}
                error={!!errors?.year_graduated}
                helperText={errors?.year_graduated}
                inputProps={{ maxLength: 4 }}
            />
        </Box>
    );
}
