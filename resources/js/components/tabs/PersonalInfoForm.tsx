import { ApplicantFormData } from '@/forms/formTypes';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface PersonalInfoProps {
    form: ApplicantFormData['personalInfo'];
    errors: Partial<Record<keyof ApplicantFormData['personalInfo'], string>>;
    handleChange: <K extends keyof ApplicantFormData['personalInfo']>(
        section: 'personalInfo',
        field: K,
        value: ApplicantFormData['personalInfo'][K],
    ) => void;
}

export default function PersonalInfoForm({ form, errors, handleChange }: PersonalInfoProps) {
    return (
        <Box component="section" mb={3}>
            <Typography variant="h6" mb={2}>
                Personal Information
            </Typography>

            {/* First Name */}
            <TextField
                fullWidth
                margin="normal"
                label="First Name"
                required
                value={form.firstname || ''}
                onChange={(e) => handleChange('personalInfo', 'firstname', e.target.value)}
                error={!!errors.firstname}
                helperText={errors.firstname}
                inputProps={{ maxLength: 50 }}
            />

            {/* Middle Name */}
            <TextField
                fullWidth
                margin="normal"
                label="Middle Name"
                value={form.midname || ''}
                onChange={(e) => handleChange('personalInfo', 'midname', e.target.value)}
                inputProps={{ maxLength: 50 }}
            />

            {/* Surname */}
            <TextField
                fullWidth
                margin="normal"
                label="Surname"
                required
                value={form.surname || ''}
                onChange={(e) => handleChange('personalInfo', 'surname', e.target.value)}
                error={!!errors.surname}
                helperText={errors.surname}
                inputProps={{ maxLength: 50 }}
            />

            {/* Suffix */}
            <TextField
                fullWidth
                margin="normal"
                label="Suffix"
                value={form.suffix || ''}
                onChange={(e) => handleChange('personalInfo', 'suffix', e.target.value)}
                inputProps={{ maxLength: 10 }}
            />

            {/* Date of Birth */}
            <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                required
                value={form.birthday || ''}
                onChange={(e) => handleChange('personalInfo', 'birthday', e.target.value)}
                error={!!errors.birthday}
                helperText={errors.birthday}
            />

            {/* Sex */}
            <FormControl fullWidth margin="normal" error={!!errors.sex}>
                <InputLabel>Sex</InputLabel>
                <Select label="Sex" value={form.sex || ''} onChange={(e) => handleChange('personalInfo', 'sex', e.target.value)}>
                    {['Male', 'Female', 'Other'].map((sex) => (
                        <MenuItem key={sex} value={sex}>
                            {sex}
                        </MenuItem>
                    ))}
                </Select>
                {errors.sex && (
                    <Typography variant="caption" color="error">
                        {errors.sex}
                    </Typography>
                )}
            </FormControl>

            {/* Religion */}
            <FormControl fullWidth margin="normal" error={!!errors.religion}>
                <InputLabel>Religion</InputLabel>
                <Select label="Religion" value={form.religion || ''} onChange={(e) => handleChange('personalInfo', 'religion', e.target.value)}>
                    {['Catholic', 'Christian', 'Others'].map((religion) => (
                        <MenuItem key={religion} value={religion}>
                            {religion}
                        </MenuItem>
                    ))}
                </Select>
                {errors.religion && (
                    <Typography variant="caption" color="error">
                        {errors.religion}
                    </Typography>
                )}
            </FormControl>

            {/* Civil Status */}
            <FormControl fullWidth margin="normal" error={!!errors.civil_status}>
                <InputLabel>Civil Status</InputLabel>
                <Select
                    label="Civil Status"
                    value={form.civil_status || ''}
                    onChange={(e) => handleChange('personalInfo', 'civil_status', e.target.value)}
                >
                    {['Single', 'Married', 'Widowed'].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>
                {errors.civil_status && (
                    <Typography variant="caption" color="error">
                        {errors.civil_status}
                    </Typography>
                )}
            </FormControl>

            {/* Barangay */}
            <TextField
                fullWidth
                margin="normal"
                label="Barangay"
                required
                value={form.current_barangay || ''}
                onChange={(e) => handleChange('personalInfo', 'current_barangay', e.target.value)}
                error={!!errors.current_barangay}
                helperText={errors.current_barangay}
            />

            {/* Municipality/City */}
            <TextField
                fullWidth
                margin="normal"
                label="Municipality/City"
                required
                value={form.current_city || ''}
                onChange={(e) => handleChange('personalInfo', 'current_city', e.target.value)}
                error={!!errors.current_city}
                helperText={errors.current_city}
            />

            {/* Province */}
            <TextField
                fullWidth
                margin="normal"
                label="Province"
                required
                value={form.current_province || ''}
                onChange={(e) => handleChange('personalInfo', 'current_province', e.target.value)}
                error={!!errors.current_province}
                helperText={errors.current_province}
            />

            {/* TIN */}
            <TextField
                fullWidth
                margin="normal"
                type="text"
                label="TIN No."
                required
                value={form.tin_number || ''}
                onChange={(e) => handleChange('personalInfo', 'tin_number', e.target.value)}
                error={!!errors.tin_number}
                helperText={errors.tin_number}
            />

            {/* Disability */}
            <FormControl fullWidth margin="normal" error={!!errors.disability}>
                <InputLabel>Disability</InputLabel>
                <Select label="Disability" value={form.disability || ''} onChange={(e) => handleChange('personalInfo', 'disability', e.target.value)}>
                    {['Visual', 'Hearing', 'Speech', 'Physical', 'Mental', 'Others'].map((d) => (
                        <MenuItem key={d} value={d}>
                            {d}
                        </MenuItem>
                    ))}
                </Select>
                {errors.disability && (
                    <Typography variant="caption" color="error">
                        {errors.disability}
                    </Typography>
                )}
            </FormControl>

            {/* Contact Number */}
            <TextField
                fullWidth
                margin="normal"
                type="text"
                label="Contact No."
                required
                value={form.contact_number || ''}
                onChange={(e) => handleChange('personalInfo', 'contact_number', e.target.value)}
                error={!!errors.contact_number}
                helperText={errors.contact_number}
            />

            {/* Email */}
            <TextField
                fullWidth
                margin="normal"
                type="email"
                label="Email"
                required
                value={form.email || ''}
                onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
            />

            {/* Employment Status */}
            <FormControl fullWidth margin="normal" error={!!errors.employment_status}>
                <InputLabel>Employment Status</InputLabel>
                <Select
                    label="Employment Status"
                    value={form.employment_status || ''}
                    onChange={(e) => handleChange('personalInfo', 'employment_status', e.target.value)}
                >
                    {['Employed', 'Unemployed'].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>
                {errors.employment_status && (
                    <Typography variant="caption" color="error">
                        {errors.employment_status}
                    </Typography>
                )}
            </FormControl>
        </Box>
    );
}
