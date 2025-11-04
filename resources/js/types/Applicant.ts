export interface Applicant {
    firstname?: string;
    midname?: string;
    surname?: string;
    suffix?: string;
    birthday?: string;
    sex?: string;
    religion?: string;
    civil_status?: string;
    current_barangay?: string;
    current_city?: string;
    current_province?: string;
    tin_number?: string;
    disability?: string;
    contact_number?: string;
    employment_status?: string;
    company?: string;
    address?: string;
    position?: string;
    status?: string;
    email?: string;
    id?: number;
    qr_token?: string;
    event_id?: number;

    jobPreference?: {
        employment?: string;
        preferred_job?: string;
    };

    highestEducation?: {
        level?: string;
        course?: string;
        school?: string;
        year_graduated?: string;
    };

    eligibility?: {
        name?: string;
        issuer?: string;
        date_of_issuance?: string;
        date_of_expiration?: string;
    };

    training?: {
        name?: string;
        institution?: string;
        certificate?: string;
        date_start?: string;
        date_end?: string;
    };

    workExperience?: {
        company?: string;
        position?: string;
        address?: string;
        date_started?: string;
        date_ended?: string;
        status?: string;
    };
}
