import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import { theme } from "./components/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login.js";
import Inicio from "./views/inicio";
import MisClases from "./views/mis-clases";
import Contrataciones from "./views/contrataciones";
import Notificaciones from "./views/notificaciones";
import Perfil from "./views/perfil";
import Registro from "./views/preRegistro";
import RegistroAlum from "./views/registroAlum";
import RegistroProf from "./views/registroProf";
import Recupero from "./views/recupero";
import { PrivateRoutes } from "./components/PrivateRoutes";
import Olvido from "./views/olvido";
import Clase from "./views/curso";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Inicio />} />
            <Route path="clases/:claseId" element={<Clase />} />
            <Route path="clases/new" element={<Clase />} />
            <Route path="mis-clases" element={<MisClases />} />
            <Route path="mis-clases/:claseId" element={<Clase />} />
            <Route path="contrataciones" element={<Contrataciones />} />
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="registroAlum" element={<RegistroAlum />} />
          <Route path="registroProf" element={<RegistroProf />} />
          <Route path="recupero" element={<Recupero />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="olvido" element={<Olvido />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
