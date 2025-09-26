import { formDefaults } from '@/forms/formDefaults';
import { ApplicantFormData } from '@/forms/formTypes';
import { useState } from 'react';

export const useApplicantForm = () => {
    // Split states
    const [personalInfo, setPersonalInfo] = useState(formDefaults.personalInfo);
    const [jobPreference, setJobPreference] = useState(formDefaults.jobPreference);
    const [education, setEducation] = useState(formDefaults.education);
    const [trainings, setTrainings] = useState(formDefaults.trainings);
    const [eligibility, setEligibility] = useState(formDefaults.eligibility);
    const [workExperience, setWorkExperience] = useState(formDefaults.workExperience);

    // Section-specific handlers
    const handlePersonalInfoChange = <K extends keyof ApplicantFormData['personalInfo']>(field: K, value: ApplicantFormData['personalInfo'][K]) => {
        setPersonalInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleJobPreferenceChange = <K extends keyof ApplicantFormData['jobPreference']>(
        field: K,
        value: ApplicantFormData['jobPreference'][K],
    ) => {
        setJobPreference((prev) => ({ ...prev, [field]: value }));
    };

    // Repeat for other sections if needed...

    // Final merged form
    const getFinalForm = (): ApplicantFormData => ({
        personalInfo,
        jobPreference,
        education,
        trainings,
        eligibility,
        workExperience,
    });

    return {
        personalInfo,
        jobPreference,
        education,
        trainings,
        eligibility,
        workExperience,
        handlePersonalInfoChange,
        handleJobPreferenceChange,
        getFinalForm,
    };
};
