import Layout from '@/components/layout';
import JobPreference from '@/components/tabs/JobPreference';
import PersonalInfoForm from '@/components/tabs/PersonalInfoForm';
import WorkExperience from '@/components/tabs/WorkExperience';
import { Applicant } from '@/types/Applicant';
import { Form, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import StepWizard from 'react-step-wizard';

interface MainProps {
    applicant: Applicant;
    session_id: string;
    email?: string;
    errors?: Record<string, string>;
    event_id?: number | string;
}

export default function Main({ applicant, email, session_id, errors = {}, event_id }: MainProps) {
    const { props: pageProps } = usePage();
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = event_id || urlParams.get('event_id') || '';

    // Initial form data
    const initialForm: Applicant = {
        ...applicant,
        email: email || '',
        qr_token: applicant.qr_token ?? undefined,
    };

    const [qrToken, setQrToken] = useState<string | undefined>(initialForm.qr_token ?? undefined);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Update QR token if flash message exists after submission
    useEffect(() => {
        const flash = pageProps.flash as { qr_token?: string };
        if (flash?.qr_token) {
            setQrToken(flash.qr_token);
            setIsSubmitted(true);
        }
    }, [pageProps.flash]);

    // Generate QR via AJAX
    const handleGenerateQR = async () => {
        if (!applicant.id) return;

        setIsGenerating(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            const response = await fetch('/applicant/qr/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ applicant_id: applicant.id }),
            });

            const data = await response.json();

            if (data.qr_token) {
                setQrToken(data.qr_token);
            } else {
                console.error('Failed to generate QR', data);
                alert('Failed to generate QR. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to generate QR. Please check console for details.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadQR = () => {
        if (!qrToken || !eventId) return;
        window.open(`/qr/download/${qrToken}?event_id=${eventId}`, '_blank');
    };

    return (
        <Layout>
            {!isSubmitted ? (
                <Form
                    className="w-full max-w-lg rounded-lg border bg-white text-black shadow-md sm:max-w-3xl"
                    action="/applicant/form"
                    method="post"
                    data={initialForm as any}
                    resetOnSuccess
                    onSuccess={() => setIsSubmitted(true)}
                >
                    <input type="hidden" name="session_id" value={session_id} />
                    <input type="hidden" name="event_id" value={eventId} />

                    {/* Logo */}
                    <div className="flex justify-center py-4">
                        <img src="/images/work.png" alt="Logo" className="h-16 w-auto" />
                    </div>

                    {/* Step wizard */}
                    <div className="w-full p-4 sm:p-6">
                        <StepWizard onStepChange={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <PersonalInfoForm form={initialForm} errors={errors} />
                            <JobPreference form={initialForm} errors={errors} />
                            <WorkExperience form={initialForm} errors={errors} processing={false} />
                        </StepWizard>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Submit Application
                        </button>
                    </div>
                </Form>
            ) : (
                // Success page
                <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
                    <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-gray-300 p-6 shadow-lg sm:max-w-2xl sm:p-10">
                        <img src="/images/success.png" alt="CheckIcon" className="h-16 w-16 sm:h-20 sm:w-20" />
                        <p className="mt-4 text-center text-base font-bold text-gray-800 sm:text-lg">Applicant profile submitted successfully!</p>

                        {/* Generate QR button */}
                        {!qrToken && (
                            <button
                                onClick={handleGenerateQR}
                                disabled={isGenerating}
                                className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                {isGenerating ? 'Generating QR...' : 'Generate QR'}
                            </button>
                        )}

                        {/* Download QR button */}
                        {qrToken && (
                            <button onClick={handleDownloadQR} className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                                Download QR as PDF
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}
