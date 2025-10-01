import JobPreference from '@/components/tabs/JobPreference';
import PersonalInfoForm from '@/components/tabs/PersonalInfoForm';
import WorkExperience from '@/components/tabs/WorkExperience';
import { Applicant } from '@/types/Applicant';
import { Form } from '@inertiajs/react';
import { QrCode } from 'lucide-react';
import { useState } from 'react';
import StepWizard from 'react-step-wizard';

interface MainProps {
    applicant: Applicant;
    session_id: string;
    email?: string;
    errors?: Record<string, string>;
}

export default function Main({ applicant, email, session_id, errors = {} }: MainProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialForm: Applicant = {
        ...applicant,
        email: email || '',
    };

    return (
        <div className="flex items-center justify-center bg-blue-900 p-10">
            {!isSubmitted ? (
                <Form
                    className="w-full max-w-3xl rounded-lg border"
                    action="/applicant/form"
                    method="post"
                    data={initialForm as any}
                    resetOnSuccess
                    onSuccess={() => setIsSubmitted(true)}
                >
                    <input type="hidden" name="session_id" value={session_id} />

                    <div className="min-h-[500px] rounded-sm bg-white p-6 text-black md:overflow-x-hidden md:overflow-y-auto md:p-20">
                        <StepWizard>
                            <PersonalInfoForm form={initialForm} errors={errors} />
                            <JobPreference form={initialForm} errors={errors} />
                            <WorkExperience form={initialForm} errors={errors} processing={false} />
                        </StepWizard>
                    </div>
                </Form>
            ) : (
                //  success page
                <div className="flex min-h-[550px] w-full max-w-2xl flex-col items-center justify-center rounded-lg bg-gray-300 p-10 shadow-lg">
                    <img src="/images/success.png" alt="CheckIcon" className="h-20 w-20" />
                    <p className="mt-5 text-center text-lg font-bold text-gray-800">Applicant profile submitted successfully!</p>

                    <button
                        className="mt-6 rounded-md bg-[#033284] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0242b3d2]"
                        onClick={() => setIsSubmitted(false)}
                    >
                        <div className="flex items-center justify-center">
                            <QrCode className="h-4 w-4" />
                            <span className="ml-1">Generate QR</span>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
