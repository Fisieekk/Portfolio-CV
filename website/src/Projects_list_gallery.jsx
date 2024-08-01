import React, { useState } from 'react';
import { IconButton, Card, CardContent, Typography, Box, Popover, Link } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const projects_images = [
    { url: "src/assets/ChessGame_img.png", title: <Link href="" underline="hover" color="inherit"> Chess Game </Link> , desc: "Simple Chess Game with Stockfish bot implementation", link: "https://github.com/Fisieekk/ChessGame" },
    { url: "src/assets/Restaurant_Mongo_DataBase_img.png", title: <Link href="" underline="hover" color="inherit"> Restaurant Mongo DataBase </Link>, desc: "Not quite beautiful website with much better Mongo DataBase", link: "https://github.com/Fisieekk/Restaurant_Mongo_DataBase"},
    { url: "src/assets/Stochastic_Minimization_img.png", title: <Link href="" underline="hover" color="inherit"> Stochastic Minimization </Link>, desc: "Stochastic Minimization in R" , link: "https://github.com/Fisieekk/Stochastic_Minimization"},
    { url: "src/assets/Darwin_World_img.png", title: <Link href="" underline="hover" color="inherit"> Darwin World </Link>, desc: "Java-Gradle Animal Environment Simulation" , link: "https://github.com/Fisieekk/Java_Gradle_Environment-Darwin_World"},
    { url: "src/assets/FEM_img.png", title: <Link href="" underline="hover" color="inherit"> FEM </Link>, desc: "Finite element method in R" , link: "https://github.com/Fisieekk/FEM_Differential_calculus-R"},
];

const Projects_list_gallery = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('');
    const [mouseX, setMouseX] = useState();
    const [mouseY, setMouseY] = useState();


    const goLeft = () => {
        setCurrIndex((currIndex + projects_images.length - 1) % projects_images.length);
    }

    const goRight = () => {
        setCurrIndex((currIndex + 1) % projects_images.length);
    }

    const handlePopoverOpen = (event, content) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(content);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div className="flex items-center justify-center bg-black">
                <IconButton onClick={goLeft} className="z-10">
                    <ChevronLeft className="text-white"/>
                </IconButton>
                <div className="overflow-hidden w-full">
                    <div
                        className="whitespace-nowrap transition-transform duration-500"
                        style={{ transform: `translateX(-${currIndex * 100}%)` }}
                    >
                        {projects_images.map((image, index) => (
                            <div key={index} className="inline-block w-full h-auto relative">
                                <a href={image.link} target="_blank" rel="noreferrer">
                                <img
                                    src={image.url}
                                    alt={`Slide ${index}`}
                                    style={{ height: '84vh' , width: '80%', alignItems: 'center' }}
                                    onMouseEnter={(e) => handlePopoverOpen(e, image.desc)}
                                    onMouseLeave={handlePopoverClose}
                                    className="hover:text-gray-400 cursor-pointer"
                                />
                                </a>
                                {/*<Card*/}
                                {/*    className="absolute bottom-0 left-0 right-0"*/}
                                {/*    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}*/}
                                {/*>*/}
                                {/*    <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>*/}
                                {/*        <Typography variant="h6" component="div" style={{ color: '#fff' }}>*/}
                                {/*            {image.title}*/}
                                {/*        </Typography>*/}
                                {/*        <div*/}
                                {/*            onMouseEnter={(e) => handlePopoverOpen(e, image.desc)}*/}
                                {/*            onMouseLeave={handlePopoverClose}*/}
                                {/*            className="hover:text-gray-400 cursor-pointer"*/}
                                {/*        >*/}
                                {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">*/}
                                {/*                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />*/}
                                {/*            </svg>*/}
                                {/*        </div>*/}
                                {/*    </CardContent>*/}
                                {/*</Card>*/}
                            </div>
                        ))}
                    </div>
                </div>
                <IconButton onClick={goRight} className="z-10">
                    <ChevronRight className="text-white"/>
                </IconButton>
            </div>
            <Popover
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                disableRestoreFocus
            >
                <Box p={2}>
                    {popoverContent}
                </Box>
            </Popover>
        </>
    )
}

export default Projects_list_gallery;
