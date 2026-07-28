import React, { createContext, useContext, useState } from "react";
import { Role } from "../data/mockData";

const AppContext = createContext({
  role: Role.ADMIN,
  setRole: () => {},
  currentDoctorId: "d1",
});

export function AppProvider({ children }) {
  const [role, setRole] = useState(Role.ADMIN);

  return (
    <AppContext.Provider value={{ role, setRole, currentDoctorId: "d1" }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
