import { Input } from '@/components/ui/input';

interface StepProps {
    nextStep?: () => void;
    previousStep?: () => void;
    errors: Record<string, string>;
}

export default function JobPreference({ previousStep, errors, nextStep }: StepProps) {
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Job Preference</h3>
            <div className="mb-4 flex flex-col">
                <label htmlFor="employment" className="mb-1">
                    Employment Type:
                </label>
                <select
                    id="employment"
                    name="employment"
                    className={`w-full rounded-md border-2 border-blue-800 p-2 text-black ${errors.employment ? 'border-2 border-red-500' : ''}`}
                >
                    <option value="">Select...</option>
                    <option value="full time">Full Time</option>
                    <option value="part time">Part Time</option>
                </select>
                {<p className="text-sm text-red-500">{errors.employment}</p>}
            </div>
            <div className="mb-10">
                <label htmlFor="preferred_job">Preferred Job:</label>
                <Input id="preferred_job" name="preferred_job" className={errors.preferred_job && 'border-2 border-red-500'} />
                {<p className="text-sm text-red-500">{errors.preferred_job}</p>}
            </div>

            {/*  Educational Background */}
            <h3 className="text-2xl font-semibold">Educational Background</h3>
            <div className="mb-4 flex flex-col">
                <label htmlFor="level" className="mb-1">
                    Highest Attainment:
                </label>
                <select
                    id="level"
                    name="level"
                    className={`w-full rounded-md border-2 border-blue-800 p-2 text-black ${errors.level ? 'border-2 border-red-500' : ''}`}
                >
                    <option value="">Select...</option>
                    <option value="elementary">Elementary</option>
                    <option value="secondary nonk12">Secondary (Non-K12)</option>
                    <option value="secondary k12">Secondary (K12)</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="postgrad">Graduate Studies/Post Graduate</option>
                </select>
                {<p className="text-sm text-red-500">{errors.level}</p>}
            </div>
            <div>
                <label htmlFor="course">Course/Strand:</label>
                <Input className={errors.course && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.course}</p>}
            </div>
            <div className="mb-10">
                <label htmlFor="year_graduated">Year Graduated:</label>
                <Input type="number" className={errors.year_graduated && 'border border-red-500'} />
                {<p className="text-sm text-red-500">{errors.year_graduated}</p>}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-4 flex justify-between">
                <button type="button" onClick={previousStep} className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                    Previous
                </button>

                <button type="button" onClick={nextStep} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Next
                </button>
            </div>
        </div>
    );
}
