import React, { useCallback, useEffect, useState } from 'react';
import { Card, Typography, Box, IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import './Projects_list_gallery.css'; // Import the CSS file with the animation styles

const projects_images = [
    { url: "src/assets/JustGithub_img.png", title: "Just Github", desc: "Just Github", link: "https://github.com/Fisieekk"},
    { url: "src/assets/ChessGame_img.png", title: "Chess Game", desc: "Simple Chess Game with Stockfish bot implementation", link: "https://github.com/Fisieekk/ChessGame" },
    { url: "src/assets/Restaurant_Mongo_DataBase_img.png", title: "Restaurant Mongo DataBase", desc: "Not quite beautiful website with much better Mongo DataBase", link: "https://github.com/Fisieekk/Restaurant_Mongo_DataBase" },
    { url: "src/assets/Stochastic_Minimization_img.png", title: "Stochastic Minimization", desc: "Stochastic Minimization in R", link: "https://github.com/Fisieekk/Stochastic_Minimization" },
    { url: "src/assets/Darwin_World_img.png", title: "Darwin World", desc: "Java-Gradle Animal Environment Simulation", link: "https://github.com/Fisieekk/Java_Gradle_Environment-Darwin_World" },
    { url: "src/assets/FEM_img.png", title: "FEM", desc: "Finite element method in R", link: "https://github.com/Fisieekk/FEM_Differential_calculus-R" },
];

const Projects_list_gallery = () => {
    const [currentBatch, setCurrentBatch] = useState(0);
    const [prevBatch, setPrevBatch] = useState(0); // Track previous batch for animation
    const batchSize = 3;

    const currentProjects = projects_images.slice(
        currentBatch * batchSize,
        (currentBatch + 1) * batchSize
    );

    const [y, setY] = useState(window.scrollY);

    const handleNavigation = useCallback(
        e => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                if (currentBatch > 0) {
                    setPrevBatch(currentBatch);
                    setCurrentBatch(prevBatch => prevBatch - 1);
                }
            } else if (y < window.scrollY) {
                if ((currentBatch + 1) * batchSize < projects_images.length) {
                    setPrevBatch(currentBatch);
                    setCurrentBatch(prevBatch => prevBatch + 1);
                }
            }
            setY(window.scrollY);
        }, [y, currentBatch, prevBatch]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" bgcolor="black" p={2} height="86vh">
            {currentProjects.map((image, index) => {
                // Determine if the current image should slide in or out
                const isVisible = index >= currentBatch * batchSize && index < (currentBatch + 1) * batchSize;
                const isPreviousBatch = index >= prevBatch * batchSize && index < (prevBatch + 1) * batchSize;
                let animationClass = '';

                if (isVisible) {
                    animationClass = 'slide-in';
                } else if (isPreviousBatch) {
                    animationClass = 'slide-out';
                }

                return (
                    <Card key={index} sx={{ width: '80%', mb: 2, position: 'relative', overflow: 'hidden', borderRadius: '25px' }}>
                        <a href={image.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    height: '25vh',
                                    backgroundImage: `url(${image.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '20px',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    color: 'white',
                                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
                                    padding: '16px',
                                }}
                                className={animationClass}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 139, 0.5))',
                                        borderRadius: '20px',
                                        zIndex: 1,
                                    }}
                                />
                                <Box sx={{ position: 'relative', zIndex: 2 }}>
                                    <Typography variant="h5" component="div">
                                        {image.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {image.desc}
                                    </Typography>
                                </Box>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '16px',
                                        transform: 'translateY(-50%)',
                                        color: 'white',
                                        zIndex: 2,
                                    }}
                                >
                                    <ChevronRight onClick={() => window.open(image.link)} />
                                </IconButton>
                            </Box>
                        </a>
                    </Card>
                );
            })}
        </Box>
    );
};

export default Projects_list_gallery;
