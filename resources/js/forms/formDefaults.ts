import { ApplicantFormData } from './formTypes';

export const formDefaults: ApplicantFormData = {
    personalInfo: {
        firstname: '',
        midname: '',
        surname: '',
        suffix: '',
        birthday: '',
        sex: '',
        religion: '',
        civil_status: '',
        current_barangay: '',
        current_city: '',
        current_province: '',
        tin_number: '',
        disability: '',
        contact_number: '',
        email: '',
        employment_status: '',
    },
    jobPreference: {
        employment: '',
        preferred_job: '',
    },
    education: {
        level: '',
        course: '',
        year_graduated: '',
    },
    trainings: {
        name: '',
        institution: '',
        date_start: '',
        date_end: '',
        certificate: '',
    },
    eligibility: {
        name: '',
        date_of_issuance: '',
        date_of_expiration: '',
    },
    workExperience: {
        company: '',
        address: '',
        position: '',
        date_started: '',
        date_ended: '',
        status: '',
    },
};
