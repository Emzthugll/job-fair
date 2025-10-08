    import { Input } from '@/components/ui/input';
    import { Applicant } from '@/types/Applicant';

    interface StepWizardInjectedProps {
        nextStep?: () => void;
        previousStep?: () => void;
        goToStep?: (step: number) => void;
    }

    interface JobPreferenceProps extends StepWizardInjectedProps {
        form: Applicant;
        errors: Record<string, string>;
    }

    export default function JobPreference({ form, errors, previousStep, nextStep }: JobPreferenceProps) {
        return (
            <div className="space-y-8">
                <h3 className="text-xl font-semibold md:text-2xl">Job Preference</h3>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="employment" className="mb-1">
                        Employment Type:
                    </label>
                    <select
                        defaultValue={form.jobPreference?.employment || ''}
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
                    <Input
                        defaultValue={form.jobPreference?.preferred_job || ''}
                        id="preferred_job"
                        name="preferred_job"
                        className={errors.preferred_job && 'border-2 border-red-500'}
                    />
                    {<p className="text-sm text-red-500">{errors.preferred_job}</p>}
                </div>

                {/*  Educational Background */}
                <h3 className="text-xl font-semibold md:text-2xl">Educational Background</h3>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="level" className="mb-1">
                        Highest Attainment:
                    </label>
                    <select
                        defaultValue={form.highestEducation?.level || ''}
                        id="level"
                        name="level"
                        className={`w-full rounded-md border-2 border-blue-800 p-2 text-black ${errors.level ? 'border-2 border-red-500' : ''}`}
                    >
                        <option value="">Select...</option>
                        <option value="1">Elementary</option>
                        <option value="2">High School</option>
                        <option value="3">Technical Vocational</option>
                        <option value="4">College</option>
                        <option value="5">Post Graduate</option>
                    </select>
                    {<p className="text-sm text-red-500">{errors.level}</p>}
                </div>
                <div>
                    <label htmlFor="course">Course/Strand:</label>
                    <Input name='course' defaultValue={form.highestEducation?.course || ''} className={errors.course && 'border border-red-500'} />
                    {<p className="text-sm text-red-500">{errors.course}</p>}
                </div>
                <div className="mb-10">
                    <label htmlFor="year_graduated">Year Graduated:</label>
                    <Input name='year_graduated' defaultValue={form.highestEducation?.year_graduated || ''} type="number" className={errors.year_graduated && 'border border-red-500'} />
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
