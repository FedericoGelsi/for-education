import GridPage from "../components/GridPage";
import { Grid, Typography } from "@mui/material";
import { PerfilProf } from "../components/login/perfilProfForm";
import { PerfilDetalleProf } from "../components/login/perfilProfFormDet";
import { PerfilAlum } from "../components/login/perfilAlumForm";
import { PerfilDetalleAlum } from "../components/login/perfilAlumFormDet";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import BackButtonBar from "../components/clases/backButtonBar";

const Perfil = () => {
  const userContext = useContext(UserContext);
  return (
    <GridPage>
      <Grid item my={2}>
        <BackButtonBar />
      </Grid>
      <Grid item>
        <Typography sx={{ mb: 3 }} variant="h4">
          Perfil
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            {userContext.user.type === "professor" ? (
              <PerfilProf />
            ) : (
              <PerfilAlum />
            )}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {userContext.user.type === "professor" ? (
              <PerfilDetalleProf />
            ) : (
              <PerfilDetalleAlum />
            )}
          </Grid>
        </Grid>
      </Grid>
    </GridPage>
  );
};

export default Perfil;
