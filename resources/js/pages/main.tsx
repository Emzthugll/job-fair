import Layout from '@/components/layout';
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
    id?: number;
    errors?: Record<string, string>;
}

export default function Main({ applicant, email, session_id, errors = {} }: MainProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showQr] = useState(false);

    const initialForm: Applicant = {
        ...applicant,
        email: email || '',
    };

   

    console.log('initialForm:', initialForm);

    return (
        <Layout>
            {!isSubmitted ? (
                <Form
                    className="w-full max-w-lg rounded-lg border text-black bg-white shadow-md sm:max-w-3xl"
                    action="/applicant/form"
                    method="post"
                    data={initialForm as any}
                    resetOnSuccess
                    onSuccess={() => {
                        setIsSubmitted(true);
                    }}
                >
                    <input type="hidden" name="session_id" value={session_id} />

                    {/* Logo on top */}
             <div className="flex justify-center py-4">
             <img src="/images/work.png" alt="Logo" className="h-16 w-auto" />
             </div>
                    {/* step container */}
                    <div className="w-full p-4 sm:p-6">
                        <StepWizard
                            onStepChange={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <PersonalInfoForm form={initialForm} errors={errors} />
                            <JobPreference form={initialForm} errors={errors} />
                            <WorkExperience form={initialForm} errors={errors} processing={false} />
                        </StepWizard>
                    </div>
                </Form>
            ) : (
                // success page
                <div className="flex min-h-screen w-full items-center justify-center p-4">
                    <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-gray-300 p-6 shadow-lg sm:max-w-2xl sm:p-10">
                        <img src="/images/success.png" alt="CheckIcon" className="h-16 w-16 sm:h-20 sm:w-20" />
                        <p className="mt-4 text-center text-base font-bold text-gray-800 sm:text-lg">Applicant profile submitted successfully!</p>
                        {showQr && <img src={`/storage/qrcodes/qr_${initialForm.id}.svg`} alt="Applicant QR" className="mt-6 h-32 w-32" />}

                        <button
                            className="mt-6 w-full rounded-md bg-[#033284] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0242b3d2] sm:w-auto"
                            onClick={() => window.open(`/qr/download/${initialForm.id}`, '_blank')}
                        >
                            <div className="flex items-center justify-center">
                                <QrCode className="h-4 w-4" />
                                <span className="ml-1">Download QR as PDF</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}
