'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';

export default function DragAndDropUpload({
    name,
    control,
    error = false,
    helperText,
    disabled = false,
}) {
    const { field } = useController({ name, control }); // Using useController to get field data and handlers
    const [uploadedImages, setUploadedImages] = useState(field.value || []); // Initialize with existing value

    // Handle Drop
    const onDrop = (acceptedFiles) => {
        if (disabled) return;
        const imageFiles = acceptedFiles.filter(file =>
            file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
        );

        const newImages = imageFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        // Avoid setting the state if no new images are added
        if (newImages.length > 0) {
            const updatedImages = [...uploadedImages, ...newImages];
            setUploadedImages(updatedImages);
            field.onChange(updatedImages); // Update the form value with the new images
        }
    };

    // Remove Image from the preview
    const handleRemoveImage = (event, image) => {
        if (disabled) return;
        event.stopPropagation();
        const updatedImages = uploadedImages.filter((img) => img !== image);
        setUploadedImages(updatedImages);
        field.onChange(updatedImages); // Update the form value after removing an image
    };

    // Setting up Dropzone for file handling
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': []
        },
        multiple: true, // Allow multiple uploads
        disabled,
    });

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: 'auto',
                    textAlign: 'center',
                    padding: 3,
                    border: '2px dashed #aaa',
                    borderRadius: 2,
                    backgroundColor: isDragActive ? '#f0f8ff' : '#f9f9f9',
                    transition: 'background-color 0.3s',
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {isDragActive
                        ? 'Drop your images here...'
                        : 'Drag and drop images here, or click to select files'}
                </Typography>
                <Button variant="contained" color="primary" >
                    Upload Images
                </Button>

                {/* Uploaded images display */}
                {uploadedImages.length > 0 && (
                    <Box sx={{ marginTop: 3 }}>
                        {/* <Typography variant="subtitle1">{label}</Typography> */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 2,
                                marginTop: 2,
                            }}
                        >
                            {uploadedImages.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative',
                                        width: '150px',
                                        height: '150px',
                                        overflow: 'hidden',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                    }}
                                >
                                    <img
                                        src={image.preview}
                                        alt={`uploaded ${index}`}
                                        onClick={(event) => event.stopPropagation()}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={(event) => handleRemoveImage(event, image)}
                                        sx={{
                                            position: 'absolute',
                                            top: 5,
                                            right: 5,
                                            minWidth: '24px',
                                            minHeight: '24px',
                                            padding: '0',
                                            fontSize: '12px',
                                        }}
                                    >
                                        X
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Error display */}
                {/* {error && <Typography color="error">{error}</Typography>}
            {helperText && <Typography>{helperText}</Typography>} */}
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
}
