import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password, confirmPassword, isDarkMode = true }) => {
	const criteria = [
		{ label: "At least 8 characters", met: password.length >= 8 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
        { label: "Passwords match", met: confirmPassword && password === confirmPassword },
	];

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((c) => (
                <div key={c.label} className="flex items-center">
                    {c.met ? (
                        <Check className="size-4 text-blue-400" />
                    ) : (
                        <X className={`size-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    )}
                    <span className={c.met 
                        ? "text-blue-400 ml-1" 
                        : `ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
                    }>
                        {c.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

const PasswordStrengthMeter = ({ password, confirmPassword, isDarkMode = true }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (!pass) return strength;
        
        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        return strength;
    }
    const strength = getStrength(password);

    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Very Weak";
        if (strength === 2) return "Weak";
        if (strength === 3) return "Fair";
        if (strength === 4) return "Good";
        return "Strong";
    }

    const getColor = (strength) => {
        if (strength === 0) return "bg-red-500";
        if (strength === 1) return "bg-red-500";
        if (strength === 2) return "bg-orange-500";
        if (strength === 3) return "bg-yellow-500";
        if (strength === 4) return "bg-green-500";
        return "bg-blue-500";
    }

  return (
    <div className="mt-2">
        <div className="flex justify-between mb-1">
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Password Strength
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {getStrengthText(strength)}
            </span>
        </div>

        <div className='flex space-x-1'>
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className={`h-1 w-1/5 rounded-full transition-colors duration-300 
                ${index < strength ? getColor(strength) : isDarkMode ? "bg-gray-600" : "bg-gray-300"}
              `}
                />
            ))}
        </div>
        <PasswordCriteria 
            password={password} 
            confirmPassword={confirmPassword} 
            isDarkMode={isDarkMode}
        />
    </div>
  )
}

export default PasswordStrengthMeter