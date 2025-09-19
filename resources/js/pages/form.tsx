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
import { ApplicantFormData } from '@/forms/formTypes';

export default function Form() {
    const [form, setForm] = useState<ApplicantFormData>(formDefaults);
    const [wizardInstance, setWizardInstance] = useState<any>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof ApplicantFormData['personalInfo'], string>>>({});

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

    const handleNext = () => {
        wizardInstance.nextStep();
    };

    const handlePrev = () => wizardInstance.previousStep();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting form:', form);
        // Example: send form to backend
        // Inertia.post('/applicants', form);
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
                    <PersonalInfoForm form={form.personalInfo} errors={errors} handleChange={handleChange} />
                    <div className="mt-4 flex justify-end">
                        <button type="button" onClick={handleNext} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Next
                        </button>
                    </div>
                </div>

                <div>
                    <JobPreference form={form.jobPreference} handleChange={handleChange} />
                    <NavigationButtons />
                </div>

                <div>
                    <EducationalBackground form={form.education} handleChange={handleChange} />
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
