import { Input } from '@/components/ui/input';
import { Applicant } from '@/types/Applicant';

interface StepWizardInjectedProps {
    previousStep?: () => void;
    goToStep?: (step: number) => void;
}

interface WorkExperienceProps extends StepWizardInjectedProps {
    form: Applicant;
    errors: Record<string, string>;
    processing?: boolean;
}

export default function WorkExperience({ form, errors, previousStep, processing }: WorkExperienceProps) {
    return (
        <div className="space-y-2">
            <div className="mb-4 rounded-md bg-yellow-100 p-4 text-yellow-800">
                These fields are optional. To update your Eligibilities, Trainings, or Work Experiences, please click this&nbsp;
                <a
                    href="https://workinilocosnorte.ph/applicant/profile"
                    className="font-semibold text-blue-700 underline hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link
                </a>
                .
            </div>

            <h3 className="text-xl font-semibold md:text-2xl">Eligibility/Professional License (Optional)</h3>
            <h2 className="text-md"></h2>
            <div>
                <label htmlFor="eligibility_name">License or Eligibility Name:</label>
                <Input
                    disabled
                    id="eligibility_name"
                    name="eligibility_name"
                    defaultValue={form.eligibility?.name || ''}
                    className={errors.eligibility_name && 'border border-red-500'}
                />
                {<p className="text-sm text-red-500">{errors.eligibility_name}</p>}
            </div>
            <div>
                <label htmlFor="issuer">Issuing Organization:</label>
                <Input
                    disabled
                    id="issuer"
                    name="issuer"
                    defaultValue={form.eligibility?.issuer || ''}
                    className={errors.issuer && 'border border-red-500'}
                />
                {<p className="text-sm text-red-500">{errors.issuer}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-1 block">
                    <label htmlFor="date_of_issuance">Date of Issuance:</label>
                    <Input
                        disabled
                        id="date_of_issuance"
                        name="date_of_issuance"
                        defaultValue={form.eligibility?.date_of_issuance || ''}
                        type="date"
                        className={errors.date_of_issuance && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.date_of_issuance}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_of_expiration">Date of Expiration:</label>
                    <Input
                        disabled
                        id="date_of_expiration"
                        name="date_of_expiration"
                        defaultValue={form.eligibility?.date_of_expiration || ''}
                        type="date"
                        className={errors.date_of_expiration && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.date_of_expiration}</p>}
                </div>
            </div>

            {/* Trainings */}
            <h3 className="text-xl font-semibold md:text-2xl">Trainings (Optional)</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-1 block">
                    <label htmlFor="training_name">Training Course:</label>
                    <Input
                        disabled
                        defaultValue={form.training?.name || ''}
                        id="training_name"
                        name="training_name"
                        className={errors.training_name ? 'border border-red-500' : ''}
                    />
                    {errors.training_name && <p className="text-sm text-red-500">{errors.training_name}</p>}
                </div>

                <div className="mb-1 block">
                    <label htmlFor="institution">Training Institution:</label>
                    <Input
                        disabled
                        id="institution"
                        name="institution"
                        defaultValue={form.training?.institution || ''}
                        className={errors.institution && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.institution}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="mb-1 block">
                    <label htmlFor="certificate">Certificate:</label>
                    <Input
                        disabled
                        id="certificate"
                        name="certificate"
                        defaultValue={form.training?.certificate || ''}
                        className={errors.certificate && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.certificate}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_start">Date Started:</label>
                    <Input
                        disabled
                        id="date_start"
                        name="date_start"
                        defaultValue={form.training?.date_start || ''}
                        type="date"
                        className={errors.date_start && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.date_start}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_end">Date Ended:</label>
                    <Input
                        disabled
                        id="date_end"
                        name="date_end"
                        defaultValue={form.training?.date_end || ''}
                        type="date"
                        className={errors.date_end && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.date_end}</p>}
                </div>
            </div>
            {/* Work Experience */}
            <h3 className="text-xl font-semibold md:text-2xl">Work Experience (Optional)</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-1 block">
                    <label htmlFor="company">Company Name:</label>
                    <Input
                        disabled
                        id="company"
                        name="company"
                        defaultValue={form.workExperience?.company || ''}
                        className={errors.company && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.company}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="address">Address:</label>
                    <Input
                        disabled
                        id="address"
                        name="address"
                        defaultValue={form.workExperience?.address || ''}
                        className={errors.address && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.address}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-1 block">
                    <label htmlFor="position">Position:</label>
                    <Input
                        disabled
                        id="position"
                        name="position"
                        defaultValue={form.workExperience?.position || ''}
                        className={errors.position && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.position}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_started">Date Started:</label>
                    <Input
                        disabled
                        id="date_started"
                        name="date_started"
                        defaultValue={form.workExperience?.date_started || ''}
                        type="date"
                        className={errors.date_started && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.date_started}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_ended">Date Ended:</label>
                    <Input
                        disabled
                        id="date_ended"
                        name="date_ended"
                        defaultValue={form.workExperience?.date_ended || ''}
                        type="date"
                        className={errors.date_ended && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.date_ended}</p>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="status" className="mb-1">
                        Status:
                    </label>
                    <Input
                        disabled
                        id="status"
                        name="status"
                        defaultValue={form.workExperience?.status || ''}
                        className={errors.status && 'border border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.status}</p>}
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                {previousStep && (
                    <button type="button" onClick={previousStep} className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                        Previous
                    </button>
                )}

                {/* Submit button */}
                <button type="submit" disabled={processing} className="rounded-md bg-[#033284] px-4 py-2 text-white hover:bg-[#0242b3d2]">
                    {processing ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}
