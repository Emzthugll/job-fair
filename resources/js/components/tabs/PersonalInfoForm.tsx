import { Input } from '@/components/ui/input';
import { Applicant } from '@/types/Applicant';

// StepWizard navigation props
interface StepWizardInjectedProps {
    nextStep?: () => void;
    previousStep?: () => void;
    goToStep?: (step: number) => void;
}

// Props for this component
interface PersonalInfoFormProps extends StepWizardInjectedProps {
    form: Applicant;
    errors: Record<string, string>;
}

export default function PersonalInfoForm({ form, errors, nextStep }: PersonalInfoFormProps) {
    return (
        <div className="space-y-7">
            <h3 className=" mb-2 text-xl font-semibold md:text-2xl">Personal Information</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
                {/* First Name */}
                <div className="col-span-2">    
                    <label className="mb-1 block" htmlFor="firstname">
                        First Name:
                    </label>
                    <Input
                        defaultValue={form.firstname || ''}
                        id="firstname"
                        name="firstname"
                        className={errors.firstname ? 'border-2 border-red-500' : ''}
                    />
                    {errors.firstname && <p className="text-sm text-red-500">{errors.firstname}</p>}
                </div>

                {/* Middle Name */}
                <div className="col-span-2">
                    <label className="mb-1 block" htmlFor="midname">
                        Middle Name:
                    </label>
                    <Input
                        defaultValue={form.midname || ''}
                        id="midname"
                        name="midname"
                        className={errors.midname ? 'border-2 border-red-500' : ''}
                    />
                    {errors.midname && <p className="text-sm text-red-500">{errors.midname}</p>}
                </div>

                {/* Last Name */}
                <div className="col-span-2">
                    <label className="mb-1 block" htmlFor="surname">
                        Last Name:
                    </label>
                    <Input defaultValue={form.surname} id="surname" name="surname" className={errors.surname ? 'border-2 border-red-500' : ''} />
                    {errors.surname && <p className="text-sm text-red-500">{errors.surname}</p>}
                </div>

                {/* Suffix (smaller column) */}
                <div className="col-span-1">
                    <label className="mb-1 block" htmlFor="suffix">
                        Suffix:
                    </label>
                    <Input
                        defaultValue={form.suffix}
                        id="suffix"
                        name="suffix"
                        className={` ${errors.suffix ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.suffix && <p className="text-sm text-red-500">{errors.suffix}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* Date of Birth */}
                <div className="md:col-span-2">
                    <label className="mb-1 block" htmlFor="birthday">
                        Date of Birth:
                    </label>
                    <Input
                        defaultValue={form.birthday}
                        id="birthday"
                        name="birthday"
                        type="date"
                        className={errors.birthday ? 'border-2 border-red-500' : ''}
                    />
                    {errors.birthday && <p className="text-sm text-red-500">{errors.birthday}</p>}
                </div>

                {/* Sex */}
                <div>
                    <label className="mb-1 block" htmlFor="sex">
                        Sex:
                    </label>
                    <select
                        defaultValue={form.sex}
                        id="sex"
                        name="sex"
                        className={`w-full rounded-md border-2 border-blue-800 p-2 text-black md:w-auto md:pr-13 ${errors.sex ? 'border-2 border-red-500' : ''}`}
                    >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.sex && <p className="text-sm text-red-500">{errors.sex}</p>}
                </div>

                {/* Disability */}
                <div>
                    <label className="mb-1 block" htmlFor="disability">
                        Disability:
                    </label>
                    <select
                        defaultValue={form.disability}
                        id="disability"
                        name="disability"
                        className={`w-full rounded-md border-2 border-blue-800 p-2 text-black md:w-auto md:pr-11 ${
                            errors.disability ? 'border-2 border-red-500' : ''
                        }`}
                    >
                        <option value="">Select...</option>
                        <option value="visual">Visual</option>
                        <option value="hearing">Hearing</option>
                        <option value="speech">Speech</option>
                        <option value="physical">Physical</option>
                        <option value="mental">Mental</option>
                    </select>
                    {errors.disability && <p className="text-sm text-red-500">{errors.disability}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Religion */}
                <div>
                    <label className="mb-1 block" htmlFor="religion">
                        Religion:
                    </label>
                    <Input defaultValue={form.religion} id="religion" name="religion" className={errors.religion ? 'border-2 border-red-500' : ''} />
                    {errors.religion && <p className="text-sm text-red-500">{errors.religion}</p>}
                </div>

                {/* Civil Status */}
                <div>
                    <label className="mb-1 block" htmlFor="civil_status">
                        Civil Status:
                    </label>
                    <select
                        defaultValue={form.civil_status}
                        id="civil_status"
                        name="civil_status"
                        className={`w-full rounded-md border-2 border-blue-800 p-2 text-black md:pr-11 ${
                            errors.civil_status ? 'border-2 border-red-500' : ''
                        }`}
                    >
                        <option value="">Select...</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widowed">Widowed</option>
                    </select>
                    {errors.civil_status && <p className="text-sm text-red-500">{errors.civil_status}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Barangay */}
                <div>
                    <label className="mb-1 block" htmlFor="current_barangay">
                        Barangay:
                    </label>
                    <Input
                        defaultValue={form.current_barangay}
                        id="current_barangay"
                        name="current_barangay"
                        className={errors.current_barangay ? 'border-2 border-red-500' : ''}
                    />
                    {errors.current_barangay && <p className="text-sm text-red-500">{errors.current_barangay}</p>}
                </div>

                {/* Municipality/City */}
                <div>
                    <label className="mb-1 block" htmlFor="current_city">
                        Municipality/City:
                    </label>
                    <Input
                        defaultValue={form.current_city}
                        id="current_city"
                        name="current_city"
                        className={errors.current_city ? 'border-2 border-red-500' : ''}
                    />
                    {errors.current_city && <p className="text-sm text-red-500">{errors.current_city}</p>}
                </div>

                {/* Province */}
                <div>
                    <label className="mb-1 block" htmlFor="current_province">
                        Province:
                    </label>
                    <Input
                        defaultValue={form.current_province}
                        id="current_province"
                        name="current_province"
                        className={errors.current_province ? 'border-2 border-red-500' : ''}
                    />
                    {errors.current_province && <p className="text-sm text-red-500">{errors.current_province}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* TIN Number */}
                <div>
                    <label className="mb-1 block" htmlFor="tin_number">
                        TIN Number:
                    </label>
                    <Input
                        defaultValue={form.tin_number}
                        id="tin_number"
                        name="tin_number"
                        type="number"
                        className={errors.tin_number ? 'border-2 border-red-500' : ''}
                    />
                    {errors.tin_number && <p className="text-sm text-red-500">{errors.tin_number}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="mb-1 block" htmlFor="contact_number">
                        Contact Number:
                    </label>
                    <Input
                        defaultValue={form.contact_number}
                        id="contact_number"
                        name="contact_number"
                        type="number"
                        className={errors.contact_number ? 'border-2 border-red-500' : ''}
                    />
                    {errors.contact_number && <p className="text-sm text-red-500">{errors.contact_number}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Email */}
                <div>
                    <label className="mb-1 block" htmlFor="email">
                        Email:
                    </label>
                    <Input
                        defaultValue={form.email}
                        id="email"
                        name="email"
                        type="email"
                        disabled
                        className="w-full cursor-not-allowed rounded-md border bg-gray-100 p-2 text-black"
                    />
                </div>

                {/* Employment Status */}
                <div>
                    <label className="mb-1 block" htmlFor="employment_status">
                        Employment Status:
                    </label>
                    <select
                        defaultValue={form.employment_status}
                        id="employment_status"
                        name="employment_status"
                        className={`w-full rounded-md border-2 border-blue-800 p-2 text-black ${
                            errors.employment_status ? 'border-2 border-red-500' : ''
                        }`}
                    >
                        <option value="">Select...</option>
                        <option value="employed">Employed</option>
                        <option value="unemployed">Unemployed</option>
                    </select>
                    {errors.employment_status && <p className="text-sm text-red-500">{errors.employment_status}</p>}
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                {nextStep && (
                    <button type="button" onClick={nextStep} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
