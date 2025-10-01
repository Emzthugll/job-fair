import { Input } from '@/components/ui/input';

interface StepProps {
    nextStep?: () => void;
    previousStep?: () => void;
    errors: Record<string, string>;
    processing?: boolean;
}

export default function EducationalBackground({ previousStep, errors, processing }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Educational Background</h3>

            <div className="mb-4 flex flex-col">
                <label htmlFor="level" className="mb-1">
                    Highest Attainment:
                </label>
                <select id="level" name="level" className="rounded-md border bg-blue-900 p-2 text-white">
                    <option value="">Select...</option>
                    <option value="1">Elementary</option>
                    <option value="2">High School</option>
                    <option value="3">Technical Vocational</option>
                    <option value="4">College</option>
                    <option value="5">Post Graduate</option>
                </select>
            </div>
            <div>
                <label htmlFor="course">Course/Strand:</label>
                <Input className={errors.course && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.course}</p>}
            </div>
            <div>
                <label htmlFor="year_graduated">Year Graduated:</label>
                <Input className={errors.year_graduated && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.year_graduated}</p>}
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
