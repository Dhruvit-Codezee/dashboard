import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Box, Button, IconButton, InputLabel, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

 const ImageUpload = ({ control, name, label, placeholder, required = false, error = false, helperText
}) => {
  const {
    field: { onChange, value },
  } = useController({ control, name });

  const [preview, setPreview] = useState(
    value ? URL.createObjectURL(value) : null
  );
  const [hovered, setHovered] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);  // Sends the file to react-hook-form
      const reader = new FileReader();

      reader.onloadend = () => {
        // Store the binary data as ArrayBuffer (or Base64)
        const binaryData = reader.result; // ArrayBuffer
        setPreview(binaryData); // For preview, you can use the data as needed
      };

      // Read file as an ArrayBuffer
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
    setPreview(null);
  };

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
            color: `red`,
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
};

export default ImageUpload;
