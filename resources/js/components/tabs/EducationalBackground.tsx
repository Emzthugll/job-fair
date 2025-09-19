import { ApplicantFormData } from '@/forms/formTypes';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface EducationalBackgroundProps {
    form: ApplicantFormData['education'];
    errors: Partial<Record<keyof ApplicantFormData['education'], string>>;
    handleChange: <K extends keyof ApplicantFormData['education']>(section: 'education', field: K, value: ApplicantFormData['education'][K]) => void;
}

export default function EducationalBackground({ form, errors, handleChange }: EducationalBackgroundProps) {
    return (
        <Box>
            <Typography variant="h6" mb={2}>
                Educational Background (Highest)
            </Typography>

            {/* Level */}
            <FormControl fullWidth margin="normal" error={!!errors.level}>
                <InputLabel>Highest Education Level</InputLabel>
                <Select label="Highest Education Level" value={form.level || ''} onChange={(e) => handleChange('education', 'level', e.target.value)}>
                    {['Elementary', 'Secondary(Non-K-12)', 'Secondary(K-12)', 'Tertiary', 'Graduate Studies/Post-Graduate'].map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </Select>
                {errors.level && (
                    <Typography variant="caption" color="error">
                        {errors.level}
                    </Typography>
                )}
            </FormControl>

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
