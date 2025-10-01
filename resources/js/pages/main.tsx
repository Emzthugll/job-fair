import JobPreference from '@/components/tabs/JobPreference';
import PersonalInfoForm from '@/components/tabs/PersonalInfoForm';
import WorkExperience from '@/components/tabs/WorkExperience';
import { Applicant } from '@/types/Applicant';
import { Form, usePage } from '@inertiajs/react';
import StepWizard from 'react-step-wizard';

interface MainProps {
    applicant: Applicant;
    session_id: string;
    email?: string;
    errors?: Record<string, string>;
}

export default function Main({ applicant, email, session_id, errors = {} }: MainProps) {
    // fallback to empty object if applicant is undefined
    const initialForm: Applicant = {
        ...applicant,
        email: email || '',
    };

    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <div className="flex items-center justify-center bg-white p-10 md:bg-blue-900">
            <Form className="w-full max-w-3xl rounded-lg border bg-white" action="/applicant/form" method="post" data={initialForm as any}>
                {/* Hidden session ID */}
                <input type="hidden" name="session_id" value={session_id} />

                {/* Step wizard with forms */}
                <div className="min-h-[500px] rounded-sm bg-white p-6 text-black md:overflow-x-hidden md:overflow-y-auto md:p-20">
                    <StepWizard>
                        <PersonalInfoForm form={initialForm} errors={errors} />
                        <JobPreference form={initialForm} errors={errors} />
                        <WorkExperience form={initialForm} errors={errors} processing={false} />
                    </StepWizard>
                </div>

                {/* Flash success message */}
                {flash?.success && <div className="mb-4 rounded bg-green-100 p-4 text-green-700">{flash.success}</div>}
            </Form>
        </div>
    );
}
