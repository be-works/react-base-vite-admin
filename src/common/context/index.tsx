import { ReactNode } from "react";
import AuthProvider from "./AuthContext";
import GLProvider from "./GlobalLoadingContext";
import NavigatorProvider, { ProfileProvider } from "./NavigatorContext";
import CustomThemeProvider from "./ThemeContext";
import ToggleSidebarProvider from "./ToggleSidebarContext";
import ReactsProvider from "./ReactContext";
import SidebarAdminProvider from "./Admin/SidebarAdminContext";

export default function MyProvider({ children }: { children: ReactNode }) {
  return (
    <CustomThemeProvider>
      <GLProvider>
        <AuthProvider>
          <NavigatorProvider>
            <ProfileProvider>
              <SidebarAdminProvider>
                <ToggleSidebarProvider>
                  <ReactsProvider>{children}</ReactsProvider>
                </ToggleSidebarProvider>
              </SidebarAdminProvider>
            </ProfileProvider>
          </NavigatorProvider>
        </AuthProvider>
      </GLProvider>
    </CustomThemeProvider>
  );
}
