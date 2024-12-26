export interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: "text" | "password" | "email";
    showPasswordToggle?: boolean;
    value?: string; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
  }