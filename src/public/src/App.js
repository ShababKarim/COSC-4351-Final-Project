import React, { useState } from 'react';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import SuperAdmin from "./pages/superadmin";
import LoginSignUpPage from './pages/loginsignin';
import Dashboard from './pages/dashboard';
import grey from '@material-ui/core/colors/grey';
import AuthContext from './context';

export const theme = createMuiTheme({
	palette: {
		primary: { 500: '#D32F2F' },
		secondary: { light: grey[900], main: grey[900], dark: grey[900] }
	}
});

function App() {
	const [auth, setAuth] = useState(null);
	return (
		<ThemeProvider theme={theme}>
			<AuthContext.Provider value={{ auth, setAuth }}>
				{auth ? <Dashboard /> : <LoginSignUpPage />}
			</AuthContext.Provider>
		</ThemeProvider>
	);
}

export default App;
