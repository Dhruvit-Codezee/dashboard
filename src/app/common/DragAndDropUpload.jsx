'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function DragAndDropUpload() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    // Handle Drop
    const onDrop = (acceptedFiles) => {
        const imageFiles = acceptedFiles.filter(file =>
            file.type === 'image/jpeg' || file.type === 'image/png'
        );

        const newImages = imageFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        setUploadedImages((prev) => [...prev, ...newImages]);

        // Call the upload API for each new image immediately after it's added
        // imageFiles.forEach((image) => {
        //     handleUpload(image);
        // });
    };

    // Handle upload of a single image
    // const handleUpload = async (image) => {
    //     setIsUploading(true);
    //     setError(null);

    //     const formData = new FormData();
    //     formData.append('avtarinformation', 'NAI000001'); // Add additional data here
    //     formData.append('image', image); // Append a single image to the formData

    //     try {
    //         const response = await fetch('https://api.rosify.in/api/add-avtar-images/', {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'token ff6cacc17669de2b95394dd08a2fe2202b002799',
    //                 'X-CSRFTOKEN': '4Iw4AgByGyfiFWZaJA0424ovTpTMAnSKrwf6jJYTijDoWemB93lIJ6NlYSELNIT3',
    //                 'accept': 'application/json',
    //             },
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error('Upload failed');
    //         }

    //         const data = await response.json();
    //         console.log(data); // Handle response as needed

    //         // Optionally remove the image from the preview after successful upload
    //         setUploadedImages((prev) => prev.filter((img) => img !== image));
    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setIsUploading(false);
    //     }
    // };

    // Remove Image from the preview
    const handleRemoveImage = (event, image) => {
        event.stopPropagation();
        setUploadedImages((prev) => prev.filter((img) => img !== image));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        multiple: true, // Allow multiple uploads
    });

    return (
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
            <Button variant="contained" color="primary" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload Images'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}

            {uploadedImages.length > 0 && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="subtitle1">Uploaded Images:</Typography>
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
        </Box>
    );
}
