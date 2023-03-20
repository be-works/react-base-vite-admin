import { createContext, ReactNode, useState } from "react";

interface ISidebarAdminContext {
  listCustomer: any;
  setListCustomer: any;
}

export const SidebarAdminContext = createContext<ISidebarAdminContext>(
  {} as ISidebarAdminContext
);

const SidebarAdminProvider = ({ children }: { children: ReactNode }) => {
  const [listCustomer, setListCustomer] = useState(0);

  return (
    <SidebarAdminContext.Provider value={{ listCustomer, setListCustomer }}>
      {children}
    </SidebarAdminContext.Provider>
  );
};

export default SidebarAdminProvider;
