import React, { createContext, useContext, useState } from "react";

// Snackbar context types
interface SnackbarContextProps {
  showSnackbar: (message: string) => void;
}

// Context and default value
const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

// Provider component
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showSnackbar = (message: string) => {
    setSnackbar({ visible: true, message });
    setTimeout(() => {
      setSnackbar({ visible: false, message: "" });
    }, 5000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.visible && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg text-base font-semibold flex items-center justify-center animate-slideIn"
          style={{
            maxWidth: "calc(100% - 40px)", // Giới hạn chiều rộng tối đa để đảm bảo hiển thị trên mọi thiết bị
            whiteSpace: "nowrap",          // Đảm bảo chữ không bị xuống dòng
          }}
        >
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

// Hook to use Snackbar
export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
