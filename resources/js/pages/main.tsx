'use client';

import JobPreference from '@/components/tabs/JobPreference';
import PersonalInfoForm from '@/components/tabs/PersonalInfoForm';
import WorkExperience from '@/components/tabs/WorkExperience';
import { Form } from '@inertiajs/react';
import StepWizard from 'react-step-wizard';

export default function Main() {
    return (
        <div className="flex items-center justify-center bg-white p-10 md:bg-blue-900">
            <Form className="w-full max-w-3xl rounded-lg border" action="/main" method="post">
                {({ errors, processing }) => (
                    <div className="min-h-[500px] rounded-sm bg-white p-6 text-black md:overflow-x-hidden md:overflow-y-auto md:p-20">
                        <StepWizard className="w-full">
                            <PersonalInfoForm errors={errors} />
                            <JobPreference errors={errors} />
                            <WorkExperience errors={errors} processing={processing} />
                        </StepWizard>
                    </div>
                )}
            </Form>
        </div>
    );
}
