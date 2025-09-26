import { Input } from '@/components/ui/input';

interface StepProps {
    nextStep?: () => void;
    previousStep?: () => void;
    errors: Record<string, string>;
}

export default function PersonalInfoForm({ nextStep, errors }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="mb-2 text-2xl font-semibold">Personal Information</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
                {/* First Name */}
                <div className="col-span-2">
                    <label className="mb-1 block" htmlFor="firstname">
                        First Name:
                    </label>
                    <Input id="firstname" name="firstname" className={errors.firstname ? 'border-2 border-red-500' : ''} />
                    {errors.firstname && <p className="text-sm text-red-500">{errors.firstname}</p>}
                </div>

                {/* Middle Name */}
                <div className="col-span-2">
                    <label className="mb-1 block" htmlFor="midname">
                        Middle Name:
                    </label>
                    <Input id="midname" name="midname" className={errors.midname ? 'border-2 border-red-500' : ''} />
                    {errors.midname && <p className="text-sm text-red-500">{errors.midname}</p>}
                </div>

                {/* Last Name */}
                <div className="col-span-2">
                    <label className="mb-1 block" htmlFor="surname">
                        Last Name:
                    </label>
                    <Input id="surname" name="surname" className={errors.surname ? 'border-2 border-red-500' : ''} />
                    {errors.surname && <p className="text-sm text-red-500">{errors.surname}</p>}
                </div>

                {/* Suffix (smaller column) */}
                <div className="col-span-1">
                    <label className="mb-1 block" htmlFor="suffix">
                        Suffix:
                    </label>
                    <Input id="suffix" name="suffix" className={`text-sm ${errors.suffix ? 'border-2 border-red-500' : ''}`} />
                    {errors.suffix && <p className="text-sm text-red-500">{errors.suffix}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* Date of Birth */}
                <div className="md:col-span-2">
                    <label className="mb-1 block" htmlFor="birthday">
                        Date of Birth:
                    </label>
                    <Input id="birthday" name="birthday" type="date" className={errors.birthday ? 'border-2 border-red-500' : ''} />
                    {errors.birthday && <p className="text-sm text-red-500">{errors.birthday}</p>}
                </div>

                {/* Sex */}
                <div>
                    <label className="mb-1 block" htmlFor="sex">
                        Sex:
                    </label>
                    <select
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
                    <Input id="religion" name="religion" className={errors.religion ? 'border-2 border-red-500' : ''} />
                    {errors.religion && <p className="text-sm text-red-500">{errors.religion}</p>}
                </div>

                {/* Civil Status */}
                <div>
                    <label className="mb-1 block" htmlFor="civil_status">
                        Civil Status:
                    </label>
                    <select
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
                    <Input id="current_barangay" name="current_barangay" className={errors.current_barangay ? 'border-2 border-red-500' : ''} />
                    {errors.current_barangay && <p className="text-sm text-red-500">{errors.current_barangay}</p>}
                </div>

                {/* Municipality/City */}
                <div>
                    <label className="mb-1 block" htmlFor="current_city">
                        Municipality/City:
                    </label>
                    <Input id="current_city" name="current_city" className={errors.current_city ? 'border-2 border-red-500' : ''} />
                    {errors.current_city && <p className="text-sm text-red-500">{errors.current_city}</p>}
                </div>

                {/* Province */}
                <div>
                    <label className="mb-1 block" htmlFor="current_province">
                        Province:
                    </label>
                    <Input id="current_province" name="current_province" className={errors.current_province ? 'border-2 border-red-500' : ''} />
                    {errors.current_province && <p className="text-sm text-red-500">{errors.current_province}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* TIN Number */}
                <div>
                    <label className="mb-1 block" htmlFor="tin_number">
                        TIN Number:
                    </label>
                    <Input id="tin_number" name="tin_number" type="number" className={errors.tin_number ? 'border-2 border-red-500' : ''} />
                    {errors.tin_number && <p className="text-sm text-red-500">{errors.tin_number}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="mb-1 block" htmlFor="contact_number">
                        Contact Number:
                    </label>
                    <Input
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
                    <Input id="email" name="email" type="email" className={errors.email ? 'border-2 border-red-500' : ''} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Employment Status */}
                <div>
                    <label className="mb-1 block" htmlFor="employment_status">
                        Employment Status:
                    </label>
                    <select
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
