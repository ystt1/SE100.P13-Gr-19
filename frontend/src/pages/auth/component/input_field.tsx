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
    <div className="flex flex-col gap-3">
      <label htmlFor={inputId} className="self-start text-base font-medium text-gray-500">
        {label}
      </label>
      <div className="flex gap-5 justify-between px-9 py-6 w-full bg-white rounded-xl shadow-2xl">
        <input
          id={inputId}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value} // Gắn giá trị từ props
          onChange={onChange} // Gọi hàm xử lý khi thay đổi
          className="w-full text-sm font-medium text-blue-700 bg-transparent outline-none"
          aria-label={label}
        />
        {showPasswordToggle && (
          <button
            type="button" // Đảm bảo nút không gửi form
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-right text-black"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};
