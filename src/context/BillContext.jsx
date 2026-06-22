import { createContext, useState, useEffect } from "react";

export const BillContext = createContext();

export function BillProvider({ children }) {

  const currentUser =
    localStorage.getItem("currentUser");

  const storageKey =
    `electricityBills_${currentUser}`;

  const [records, setRecords] = useState(() => {

    if (!currentUser) return [];

    const savedRecords =
      localStorage.getItem(storageKey);

    return savedRecords
      ? JSON.parse(savedRecords)
      : [];
  });


  useEffect(() => {

    if (currentUser) {
      localStorage.setItem(
        storageKey,
        JSON.stringify(records)
      );
    }

  }, [records, currentUser, storageKey]);


  return (
    <BillContext.Provider value={{
      records,
      setRecords
    }}>
      {children}
    </BillContext.Provider>
  );
}