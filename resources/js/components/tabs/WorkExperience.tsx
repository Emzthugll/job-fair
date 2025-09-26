import { Input } from '@/components/ui/input';

interface StepProps {
    nextStep?: () => void;
    previousStep?: () => void;
    errors: Record<string, string>;
    processing?: boolean;
}

export default function WorkExperience({ previousStep, errors, processing }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Eligibility/Professional License (Optional)</h3>
            <div>
                <label htmlFor="eligibility_name">License or Eligibility Name:</label>
                <Input placeholder="e.g., Civil Service Eligibility" className={errors.eligibility_name && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.eligibility_name}</p>}
            </div>
            <div>
                <label htmlFor="issuer">Issuing Organization:</label>
                <Input className={errors.issuer && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.issuer}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-1 block">
                    <label htmlFor="date_of_issuance">Date of Issuance:</label>
                    <Input type="date" className={errors.date_of_issuance && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.date_of_issuance}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_of_expiration">Date of Expiration:</label>
                    <Input type="date" className={errors.date_of_expiration && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.date_of_expiration}</p>}
                </div>
            </div>

            {/* Trainings */}
            <h3 className="text-2xl font-semibold">Trainings (Optional)</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-1 block">
                    <label htmlFor="training_name">Training Course:</label>
                    <Input id="training_name" name="training_name" className={errors.training_name ? 'border border-red-500' : ''} />
                    {errors.training_name && <p className="text-sm text-red-500">{errors.training_name}</p>}
                </div>

                <div className="mb-1 block">
                    <label htmlFor="institution">Training Institution:</label>
                    <Input className={errors.institution && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.institution}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="mb-1 block">
                    <label htmlFor="certificate">Certificate:</label>
                    <Input className={errors.certificate && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.certificate}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_start">Date Started:</label>
                    <Input type="date" className={errors.date_start && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.date_start}</p>}
                </div>
                <div className="mb-1 block">
                    <label htmlFor="date_end">Date Ended:</label>
                    <Input type="date" className={errors.date_end && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.date_end}</p>}
                </div>
            </div>

            <h3 className="text-2xl font-semibold">Work Experience (Optional)</h3>

            <div>
                <label htmlFor="company">Company Name:</label>
                <Input className={errors.company && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.company}</p>}
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <Input className={errors.address && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.address}</p>}
            </div>
            <div>
                <label htmlFor="position">Position:</label>
                <Input className={errors.position && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.position}</p>}
            </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor="status" className="mb-1">
                    Status:
                </label>
                <select id="status" name="status" className="rounded-md border-2 border-blue-800 p-2 text-black">
                    <option value="">Select...</option>
                    <option value="permanent">Permanent</option>
                    <option value="contractual">Contractual</option>
                    <option value="part time">Part time</option>
                    <option value="resigned">Resigned</option>
                    <option value="terminated">Terminated</option>
                </select>
                {<p className="text-sm text-red-500">{errors.status}</p>}
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
