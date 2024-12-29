import { useState, useId } from "react";
import { InputFieldProps } from "./types";
import React from "react";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  showPasswordToggle,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  return ( 
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="self-start text-sm font-medium text-gray-500">
        {label}
      </label>
      <div className="flex items-center gap-3 px-4 py-2 w-full bg-white rounded-md shadow-md">
        <input
          id={inputId}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-sm text-blue-700 bg-transparent outline-none"
          aria-label={label}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-blue-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

