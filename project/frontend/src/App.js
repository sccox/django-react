import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./auth/utils/PrivateRoute";
import { AuthProvider } from "./auth/context/AuthContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";
import GoogleLogin from "./auth/pages/GoogleLogin";
import Unauthorized from "./auth/pages/UnauthorizedPage";
import AppBody from "./AppBody";
import Form from "./pages/Form";
import StageLogin from "./auth/pages/StageLogin";
import { Alert } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      white: {
        main: "#ffffff",
      },

      mode: "dark",
      background: {
        container: "#212121",
        modal: "#212121",
        box: "#212121",
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        {
          process.env.REACT_APP_STAGE === 'staging' &&
            (
              <Alert severity="warning" variant="filled">
              This is the staging version of the application, but changes made to data will happen in real time on the production schema.
            </Alert>
            )

        }

        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/form" element={<Form />} />
              <Route path="/*" element={<AppBody />} />
            </Route>
            {/* Public Routes */}
            <Route path="/login" element={<GoogleLogin />} />
            <Route path="/login/callback" element={<StageLogin />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Private Routes */}
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
