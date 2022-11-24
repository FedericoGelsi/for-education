
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Box,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import React from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'



/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const RegistroClaseForm = ({ setAuth }) => {
  const navigate = useNavigate();


  const SignupSchema = Yup.object().shape({
    className: Yup.string()
      .min(2, "valor muy corto")
      .required("Es necesario completar este campo"),
    materiaName: Yup.string()
      .min(2, "valor muy corto")
      .required("Es necesario completar este campo"),
    duracion: Yup.string()
      .required("Es necesario completar este campo"),
    frecuencia: Yup.string()
        .min(2,"valor muy corto")
        .required("Es necesario completar este campo"),
    costo: Yup.string()
        .required("Es necesario completar este campo"),
        
    descripcion: Yup.string()
        

  });


  const formik = useFormik({
    initialValues: {
      className: "",
      materiaName: "",
      duracion: "",
      frecuencia: "",
      costo:"",
      descripcion:"",
      
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      setTimeout(() => {
        setAuth(true);
        navigate("/", { replace: true });
      }, 2000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps  } = formik;
  
  

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Stack spacing={3}>
          
          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              label="Nombre de la Clase *"
              {...getFieldProps("className")}
              error={Boolean(touched.className && errors.className)}
              helperText={touched.className && errors.className}
            />
            <TextField
              fullWidth
              label="Materia *"
              {...getFieldProps("materiaName")}
              error={Boolean(touched.materiaName && errors.materiaName)}
              helperText={touched.materiaName && errors.materiaName}
            />

            <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            >
              <TextField
                fullWidth
                label="Duracion de la Clase *"
                {...getFieldProps("duracion")}
                error={Boolean(touched.duracion && errors.duracion)}
                helperText={touched.duracion && errors.duracion}
              />

              
              <FormControl fullWidth>
              <InputLabel >Frecuencia</InputLabel>
                  <Select
                      id="frecuencia"
                      label="Frecuencia"
                      {...getFieldProps("frecuencia")}
                      >
                        <MenuItem value={1}>Unica</MenuItem>
                        <MenuItem value={2}>Semanal</MenuItem>
                        <MenuItem value={3}>Mensual</MenuItem>
                      </Select>
                </FormControl>

            </Stack>

            <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            >
              <TextField
              fullWidth
              type={"number"}
              label="Costo de la Clase *"
              {...getFieldProps("costo")}
              error={Boolean(touched.costo && errors.costo)}
              helperText={touched.costo && errors.costo}
              />
              <FormControl fullWidth>
              <InputLabel >Moneda</InputLabel>
                  <Select
                      id="moneda"
                      label="Moneda"
                      {...getFieldProps("moneda")}
                      >
                        <MenuItem value={1}>USD</MenuItem>
                        <MenuItem value={2}>EUR</MenuItem>
                        <MenuItem value={3}>ARS</MenuItem>
                      </Select>
                </FormControl>
            </Stack>
            
            
            <TextField
              fullWidth
              
              label="Descripcion"
              multiline
              maxRows={10}
              {...getFieldProps("descripcion")}
              error={Boolean(touched.descripcion && errors.descripcion)}
              helperText={touched.descripcion && errors.descripcion}
            />
            
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Registrar
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default RegistroClaseForm;
