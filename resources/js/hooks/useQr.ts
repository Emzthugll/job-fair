import { Applicant } from '@/types/Applicant';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function useQr(applicant: Applicant, event_id?: number | string) {
    const { props: pageProps } = usePage();
    const [qrToken, setQrToken] = useState<string | undefined>(applicant.qr_token ?? undefined);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(!!applicant.qr_token);
    const [isGenerating, setIsGenerating] = useState(false);

    const eventId = event_id || new URLSearchParams(window.location.search).get('event_id') || '';

    // Update QR token if flash exists
    useEffect(() => {
        const token = (pageProps.flash as { qr_token?: string })?.qr_token;
        if (token) {
            setQrToken(token);
            setIsSubmitted(true);
        }
    }, [pageProps.flash]);

    const handleGenerateQR = async () => {
        if (!applicant.id) return;

        setIsGenerating(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/applicant/qr/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                body: JSON.stringify({ applicant_id: applicant.id }),
            });

            const data = await response.json();
            if (data.qr_token) setQrToken(data.qr_token);
            else throw new Error('Failed to generate QR');
        } catch (err) {
            console.error(err);
            alert('Failed to generate QR. Check console for details.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadQR = () => qrToken && eventId && window.open(`/qr/download/${qrToken}?event_id=${eventId}`, '_blank');

    return { qrToken, isSubmitted, isGenerating, handleGenerateQR, handleDownloadQR, eventId };
}
