import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronRight, ArrowDownward } from "@mui/icons-material";
import Draggable from 'react-draggable';
import './Projects_list_gallery.css';

// Predefined positions based on the number of images
const bubbleSize = 35; // Bubble size in vh
const generatePositions = (numBubbles) => {
    const positions = [];
    const checkOverlap = (x, y, existingPositions) => {
        for (let pos of existingPositions) {
            const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
            if (distance < bubbleSize) return true;
        }
        return false;
    };

    while (positions.length < numBubbles) {
        const x = Math.random() * (100 - bubbleSize);
        const y = Math.random() * (86 - bubbleSize - 10);

        if (!checkOverlap(x, y, positions)) {
            positions.push({ x, y });
        }
    }
    return positions;
};

// Images data
const projects_images = [
    // { url: "src/assets/JustGithub_img.png", title: "Just Github", desc: "Just Github", link: "https://github.com/Fisieekk" },
    { url: "src/assets/ChessGame_img.png", title: "Chess Game", desc: "Simple Chess Game with Stockfish bot implementation", link: "https://github.com/Fisieekk/ChessGame" },
    { url: "src/assets/Restaurant_Mongo_DataBase_img.png", title: "Restaurant Mongo DataBase", desc: "Not quite beautiful website with much better Mongo DataBase", link: "https://github.com/Fisieekk/Restaurant_Mongo_DataBase" },
    { url: "src/assets/Stochastic_Minimization_img.png", title: "Stochastic Minimization", desc: "Stochastic Minimization in R", link: "https://github.com/Fisieekk/Stochastic_Minimization" },
    { url: "src/assets/Darwin_World_img.png", title: "Darwin World", desc: "Java-Gradle Animal Environment Simulation", link: "https://github.com/Fisieekk/Java_Gradle_Environment-Darwin_World" },
    { url: "src/assets/FEM_img.png", title: "FEM", desc: "Finite element method in R", link: "https://github.com/Fisieekk/FEM_Differential_calculus-R" },
];

const batchSize = 3; // Number of projects per batch
const numberOfBatches = Math.ceil(projects_images.length / batchSize);

const Projects_list_gallery = () => {
    const [currentBatch, setCurrentBatch] = useState(0);
    const [prevBatch, setPrevBatch] = useState(0);
    const [positions, setPositions] = useState([]);
    const containerRef = useRef(null); // Reference for the container

    useEffect(() => {
        setPositions(generatePositions(batchSize));
    }, []);

    const handleWheel = useCallback((event) => {
        event.preventDefault();
        const { deltaY } = event;

        if (deltaY > 0 && currentBatch < numberOfBatches - 1) {
            setPrevBatch(currentBatch);
            setCurrentBatch(currentBatch + 1); // Scroll down
        } else if (deltaY < 0 && currentBatch > 0) {
            setPrevBatch(currentBatch);
            setCurrentBatch(currentBatch - 1); // Scroll up
        }
    }, [currentBatch]);

    useEffect(() => {
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel]);

    const handleArrowClick = () => {
        if (currentBatch < numberOfBatches - 1) {
            setPrevBatch(currentBatch);
            setCurrentBatch(currentBatch + 1);
        }
    };

    const handleDrag = (index, e, data) => {
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const bubbleWidth = (bubbleSize / 100) * window.innerWidth;
        const bubbleHeight = (bubbleSize / 100) * window.innerHeight;

        const newX = Math.min(
            Math.max(0, data.x / window.innerWidth * 100),
            100 - (bubbleWidth / window.innerWidth) * 100
        );
        const newY = Math.min(
            Math.max(0, data.y / window.innerHeight * 100),
            86 - (bubbleHeight / window.innerHeight) * 100
        );

        setPositions((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions[index] = { x: newX, y: newY };
            return newPositions;
        });
    };

    return (
        <Box
            ref={containerRef} // Reference for the container
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            height="86vh"
            overflow="hidden"
            position="relative"
            className="main_container"
        >
            {Array.from({ length: numberOfBatches }).map((_, batchIndex) => (
                <Box key={batchIndex} className={`sector ${currentBatch === batchIndex ? (batchIndex > prevBatch ? 'pop-in' : 'pop-in') : 'pop-out'}`}>
                    {projects_images.slice(batchSize * batchIndex, batchSize * (batchIndex + 1)).map((image, index) => (
                        <Draggable
                            key={index}
                            position={{
                                x: positions[index % batchSize]?.x * window.innerWidth / 100,
                                y: positions[index % batchSize]?.y * window.innerHeight / 100,
                            }}
                            onDrag={(e, data) => handleDrag(index % batchSize, e, data)}
                            bounds="parent" // Set bounds to the container
                        >
                            <Box
                                className="bubble-card"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                }}
                            >
                                <img src={image.url} alt={image.title} />
                                <Box className="bubble-card-content">
                                    <Typography variant="h6" component="div">
                                        <a href={image.link} target="_blank" rel="noreferrer">
                                            {image.title}
                                        </a>
                                    </Typography>
                                    <Typography variant="body2">
                                        {image.desc}
                                    </Typography>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            zIndex: 2,
                                        }}
                                    >
                                        <ChevronRight onClick={() => window.open(image.link)} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Draggable>
                    ))}
                </Box>
            ))}
            <Box
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 1,
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, color: 'black' }}
                >
                    Scroll down for more
                </Typography>
                <IconButton onClick={handleArrowClick}>
                    <ArrowDownward sx={{ fontSize: 40, color: 'black' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Projects_list_gallery;
