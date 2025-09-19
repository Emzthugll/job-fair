export type PersonalInfoFormData = {
    firstname: string;
    midname: string;
    surname: string;
    suffix: string;
    birthday: string;
    sex: string;
    religion: string;
    civil_status: string;
    current_barangay: string;
    current_city: string;
    current_province: string;
    tin_number: string;
    disability: string;
    contact_number: string;
    email: string;
    employment_status: string;
};

export type JobPreferenceFormData = {
    employment: string;
    preferred_job: string;
};

export type EducationFormData = {
    level: string;
    course: string;
    year_graduated: string;
};

export type TrainingFormData = {
    name: string;
    institution: string;
    date_start: string;
    date_end: string;
    certificate: string;
};

export type EligibilityFormData = {
    name: string;
    date_of_issuance: string;
    date_of_expiration: string;
};

export type WorkExperienceFormData = {
    company: string;
    address: string;
    position: string;
    date_started: string;
    date_ended: string;
    status: string;
};

export type ApplicantFormData = {
    personalInfo: PersonalInfoFormData;
    jobPreference: JobPreferenceFormData;
    education: EducationFormData;
    trainings: TrainingFormData;
    eligibility: EligibilityFormData;
    workExperience: WorkExperienceFormData;
};
