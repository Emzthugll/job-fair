'use client';

import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';

import EducationalBackground from '@/components/tabs/EducationalBackground';
import EligibilityLicense from '@/components/tabs/EligibilityLicense';
import JobPreference from '@/components/tabs/JobPreference';
import PersonalInfoForm from '@/components/tabs/PersonalInfoForm';
import Trainings from '@/components/tabs/Trainings';
import WorkExperience from '@/components/tabs/WorkExperience';
import { formDefaults } from '@/forms/formDefaults';
import { ApplicantFormData, EducationFormData, JobPreferenceFormData } from '@/forms/formTypes';

export default function Form() {
    const [form, setForm] = useState<ApplicantFormData>(formDefaults);
    const [wizardInstance, setWizardInstance] = useState<any>(null);
    const [errors, setError] = useState<
        Partial<{
            personalInfo: Partial<Record<keyof ApplicantFormData['personalInfo'], string>>;
            jobPreference: Partial<Record<keyof JobPreferenceFormData, string>>;
            education: Partial<Record<keyof EducationFormData, string>>;
        }>
    >({});

    const handleChange = <K1 extends keyof ApplicantFormData, K2 extends keyof ApplicantFormData[K1]>(
        section: K1,
        field: K2,
        value: ApplicantFormData[K1][K2],
    ) => {
        setForm((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const validateStep = (step: number) => {
        const newErrors: typeof errors = {};

        switch (step) {
            case 1: {
                const personalInfoErrors: Partial<Record<keyof ApplicantFormData['personalInfo'], string>> = {};
                if (!form.personalInfo.firstname) personalInfoErrors.firstname = 'First name is required';
                if (!form.personalInfo.surname) personalInfoErrors.surname = 'Surname is required';
                if (!form.personalInfo.email) personalInfoErrors.email = 'Email is required';
                if (!form.personalInfo.birthday) personalInfoErrors.birthday = 'Birthday is required';
                if (!form.personalInfo.sex) personalInfoErrors.sex = 'Sex is required';
                if (!form.personalInfo.civil_status) personalInfoErrors.civil_status = 'Civil Status is required';
                if (!form.personalInfo.current_barangay) personalInfoErrors.current_barangay = 'Barangay is required';
                if (!form.personalInfo.current_city) personalInfoErrors.current_city = 'Municipality/City is required';
                if (!form.personalInfo.current_province) personalInfoErrors.current_province = 'Province is required';
                if (!form.personalInfo.contact_number) personalInfoErrors.contact_number = 'Contact Number is required';
                if (!form.personalInfo.employment_status) personalInfoErrors.employment_status = 'Employment Status is required';

                if (Object.keys(personalInfoErrors).length > 0) {
                    newErrors.personalInfo = personalInfoErrors;
                }
                break;
            }
            case 2: {
                const jobPreferenceErrors: Partial<Record<keyof JobPreferenceFormData, string>> = {};
                if (!form.jobPreference.preferred_job) jobPreferenceErrors.preferred_job = 'Preferred job is required';
                if (!form.jobPreference.employment) jobPreferenceErrors.employment = 'Employment type is required';

                if (Object.keys(jobPreferenceErrors).length > 0) {
                    newErrors.jobPreference = jobPreferenceErrors;
                }
                break;
            }
            case 3: {
                const educationErrors: Partial<Record<keyof ApplicantFormData['education'], string>> = {};
                if (!form.education.level) educationErrors.level = 'Education level is required';
                if (!form.education.course) educationErrors.course = 'Course is required';
                if (!form.education.year_graduated) educationErrors.year_graduated = 'Year graduated is required';

                if (Object.keys(educationErrors).length > 0) {
                    newErrors.education = educationErrors;
                }
                break;
            }
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!wizardInstance) return;
        const currentStep = wizardInstance.currentStep || 1;

        if (validateStep(currentStep)) {
            wizardInstance.nextStep();
        } else {
            console.log('Errors.', errors);
        }
    };

    const handlePrev = () => wizardInstance.previousStep();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const lastStep = wizardInstance?.currentStep || 6;

        if (validateStep(lastStep)) {
            console.log('Submitting form:', form);
            // Inertia.post('/applicants', form);
        }
    };

    // Helper to render navigation buttons
    const NavigationButtons = ({ isLastStep }: { isLastStep?: boolean }) => (
        <div className="mt-4 flex justify-between">
            <button type="button" onClick={handlePrev} className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500">
                Back
            </button>
            {isLastStep ? (
                <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Submit
                </button>
            ) : (
                <button type="button" onClick={handleNext} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Next
                </button>
            )}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <StepWizard instance={setWizardInstance}>
                <div>
                    <PersonalInfoForm form={form.personalInfo} errors={errors.personalInfo ?? {}} handleChange={handleChange} />
                    <div className="mt-4 flex justify-end">
                        <button type="button" onClick={handleNext} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Next
                        </button>
                    </div>
                </div>

                <div>
                    <JobPreference form={form.jobPreference} errors={errors.jobPreference ?? {}} handleChange={handleChange} />
                    <NavigationButtons />
                </div>

                <div>
                    <EducationalBackground form={form.education} errors={errors.education ?? {}} handleChange={handleChange} />
                    <NavigationButtons />
                </div>

                <div>
                    <Trainings form={form.trainings} handleChange={handleChange} />
                    <NavigationButtons />
                </div>

                <div>
                    <EligibilityLicense form={form.eligibility} handleChange={handleChange} />
                    <NavigationButtons />
                </div>

                <div>
                    <WorkExperience form={form.workExperience} handleChange={handleChange} />
                    <NavigationButtons isLastStep />
                </div>
            </StepWizard>
        </form>
    );
}
