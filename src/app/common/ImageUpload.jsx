import React, { useState, useEffect } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Box, Button, IconButton, InputLabel, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Skeleton } from "./TextField/Skeleton";

export function ImageUpload({
  control,
  name,
  label,
  placeholder,
  required = false,
  error = false,
  helperText,
  loading = false,
  rows
}) {

  const {
    field: { onChange, value },
  } = useController({ control, name });

  const [preview, setPreview] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setPreview(value);
      } else if (value instanceof File) {
        setPreview(URL.createObjectURL(value));
      }
    }
  }, [value]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
    setPreview(null);
  };


  if (loading) {
    return <Skeleton rows={rows} />;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.5}>

        <InputLabel required={required} sx={{
          '& .MuiFormLabel-asterisk': { color: 'red' },
        }}>{label}</InputLabel>

        {preview ? (
          <Box
            position="relative"
            width="150px"
            height="150px"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            {hovered && (
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgcolor="rgba(0, 0, 0, 0.5)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                borderRadius="8px"
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    document.getElementById(`${name}-input`)?.click();
                  }}
                  sx={{ color: 'lightblue' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={handleRemoveImage}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            {/* Hidden file input for editing */}
            <input
              id={`${name}-input`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
        ) : (
          <Button variant="contained" component="label">
            {placeholder || label}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        )}
      </Box>

      {error && (
        <Typography
          variant="caption"
          sx={{
            color: "red",
            whiteSpace: "pre",
            textWrap: "wrap",
            marginLeft: "15px",
          }}
        >
          {helperText}
        </Typography>
      )}
    </>
  );
}

