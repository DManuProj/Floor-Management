import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";

const TableDetailsForm = ({ selectedTable, updateTableDetails }) => {
  const formik = useFormik({
    initialValues: {
      tableName: selectedTable?.tableName || "",
      minCovers: selectedTable?.minCovers || 1,
      maxCovers: selectedTable?.maxCovers || 1,
      online: selectedTable?.online || true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      tableName: Yup.string().required("Required"),
      minCovers: Yup.number().min(1, "Minimum 1 cover").required("Required"),
      maxCovers: Yup.number().min(1, "Minimum 1 cover").required("Required"),
    }),
    onSubmit: (values) => {
      updateTableDetails(values);
      toast.success("Table data saved successfully!");
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          marginBottom={2}
          marginTop={2}
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="subtitle2">Table Name</Typography>
          <TextField
            id="tableName"
            name="tableName"
            size="small"
            value={formik.values.tableName}
            onChange={formik.handleChange}
            error={formik.touched.tableName && Boolean(formik.errors.tableName)}
            helperText={formik.touched.tableName && formik.errors.tableName}
            sx={{ width: "50%" }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginBottom={2}
        >
          <Typography
            style={{ marginRight: "10px", fontSize: "14px" }}
            variant="subtitle2"
          >
            Min Covers
          </Typography>
          <IconButton
            onClick={() =>
              formik.setFieldValue(
                "minCovers",
                Math.max(1, formik.values.minCovers - 1)
              )
            }
          >
            -
          </IconButton>
          {/* <TextField
          id="minCovers"
          name="minCovers"
          //   type="number"
          value={formik.values.minCovers}
          onChange={formik.handleChange}
          error={formik.touched.minCovers && Boolean(formik.errors.minCovers)}
          helperText={formik.touched.minCovers && formik.errors.minCovers}
          inputProps={{ min: 1 }}
          size="small"
          style={{ width: "50px", margin: "0 8px" }}
        /> */}
          {formik.values.minCovers}
          <IconButton
            onClick={() =>
              formik.setFieldValue("minCovers", formik.values.minCovers + 1)
            }
          >
            +
          </IconButton>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginBottom={2}
        >
          <Typography style={{ marginRight: "10px" }} variant="subtitle2">
            Max Covers
          </Typography>
          <IconButton
            onClick={() =>
              formik.setFieldValue(
                "maxCovers",
                Math.max(1, formik.values.maxCovers - 1)
              )
            }
          >
            -
          </IconButton>
          {/* <TextField
          id="maxCovers"
          name="maxCovers"
          type="number"
          size="small"
          value={formik.values.maxCovers}
          onChange={formik.handleChange}
          error={formik.touched.maxCovers && Boolean(formik.errors.maxCovers)}
          helperText={formik.touched.maxCovers && formik.errors.maxCovers}
          inputProps={{ min: 1 }}
          style={{ width: "30px", margin: "0 8px" }}
        /> */}
          {formik.values.maxCovers}
          <IconButton
            onClick={() =>
              formik.setFieldValue("maxCovers", formik.values.maxCovers + 1)
            }
          >
            +
          </IconButton>
        </Box>

        <Box
          marginBottom={2}
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="subtitle2">Online</Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: formik.values.online ? "red" : "inherit",
              marginRight: 1,
            }}
          >
            {formik.values.online ? "Active" : "Inactive"}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                id="online"
                name="online"
                checked={formik.values.online}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            label=""
          />
        </Box>
        <Button sx={{ textTransform: "none" }} type="submit">
          Save Table
        </Button>
      </form>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default TableDetailsForm;
