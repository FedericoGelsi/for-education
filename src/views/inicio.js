import { Grid, Typography } from "@mui/material";
import { Course, Proffesor } from "../components/cursos/entities";
import CardCurso from "../components/cursos/courseCard";
import GridPage from "../components/GridPage";
import SearchFilter from "../components/cursos/SearchFilter";
import { Stack } from "@mui/system";

function Inicio(props) {
  const defaultUser = new Proffesor(
    "Juan",
    "Perez",
    "juan.perez@profesor.com",
    "1122540953",
    "20-02-1989",
    "12345678",
    "12:00 a 18:00",
    "Ingeniero en Sistemas",
    "30 anios de experiencia en desarrollo FullStack"
  );

  const defaultCourse = new Course(
    "Clase React",
    "React",
    "2 semanas",
    defaultUser,
    "2 dias por semana",
    "25 USD"
  );

  return (
    <GridPage>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Clases</Typography>
        <Grid
          container
          direction="row"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={2} md={4}>
            <SearchFilter />
          </Grid>
          <Grid item xs={2} sm={6} md={8}>
            <Grid
              container
              direction="row"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 8 }}
            >
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <CardCurso variant="home" course={defaultCourse} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </GridPage>
  );
}

export default Inicio;
