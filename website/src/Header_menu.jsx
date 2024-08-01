import './Header_menu.css';
import React from 'react';
import {Collapse, Box, Popover} from "@mui/material";

function Header_menu() {
    const [openList1, setOpenList1] = React.useState(false);
    // const [openList2, setOpenList2] = React.useState(false);
    const [openList3, setOpenList3] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverContent, setPopoverContent] = React.useState('');

    const handleOpenList1 = () => {
        setOpenList1(true);
    };

    const handleCloseList1 = () => {
        setOpenList1(false);
    };

    // const handleOpenList2 = () => {
    //     setOpenList2(true);
    // };
    //
    // const handleCloseList2 = () => {
    //     setOpenList2(false);
    // };

    const handleOpenList3 = () => {
        setOpenList3(true);
    };

    const handleCloseList3 = () => {
        setOpenList3(false);
    };

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
            <div className="main_container">
                <div className="main_container_horizontal">
                    <p>
                        <h1 className="name_text">Marcin Serafin </h1>
                    </p>
                    <div
                        className="menu_list"
                        onMouseEnter={handleOpenList1}
                        onMouseLeave={handleCloseList1}
                    >
                        <div style={{ color: 'white', cursor: 'pointer' }}>
                            About
                        </div>
                        <Collapse in={openList1} className="collapse-content">
                            <Box mt={2}>
                                <p
                                    onMouseEnter={(e) => handlePopoverOpen(e, "Details about Item 1.1")}
                                    onMouseLeave={handlePopoverClose}
                                    className="hover:text-gray-400 cursor-pointer p-1"
                                >
                                    CV
                                </p>
                                <p
                                    onMouseEnter={(e) => handlePopoverOpen(e, "Details about Item 1.2")}
                                    onMouseLeave={handlePopoverClose}
                                    className="hover:text-gray-400 cursor-pointer p-1"
                                >
                                    GitHub
                                </p>
                            </Box>
                        </Collapse>
                    </div>
                    {/*<div*/}
                    {/*    className="menu_list"*/}
                    {/*    onMouseEnter={handleOpenList2}*/}
                    {/*    onMouseLeave={handleCloseList2}*/}
                    {/*>*/}
                    {/*    <div style={{ color: 'white', cursor: 'pointer' }}>*/}
                    {/*        Projects*/}
                    {/*    </div>*/}
                    {/*    <Collapse in={openList2} className="collapse-content">*/}
                    {/*        <Box mt={2}>*/}
                    {/*            <p*/}
                    {/*                onMouseEnter={(e) => handlePopoverOpen(e, "Simple Chess Game with Stockfish bot implementation")}*/}
                    {/*                onMouseLeave={handlePopoverClose}*/}
                    {/*                className="hover:text-gray-400 cursor-pointer p-1"*/}
                    {/*            >*/}
                    {/*                <Link href="" underline="hover"> ChessGame </Link>*/}
                    {/*            </p>*/}
                    {/*            <p*/}
                    {/*                onMouseEnter={(e) => handlePopoverOpen(e, "Not quite beautiful website with much better Mongo DataBase")}*/}
                    {/*                onMouseLeave={handlePopoverClose}*/}
                    {/*                className="hover:text-gray-400 cursor-pointer p-1"*/}
                    {/*            >*/}
                    {/*                <Link href="" underline="hover"> Restaurant Mongo DataBase </Link>*/}
                    {/*            </p>*/}
                    {/*            <p*/}
                    {/*                onMouseEnter={(e) => handlePopoverOpen(e, "Stochastic Minimization in R")}*/}
                    {/*                onMouseLeave={handlePopoverClose}*/}
                    {/*                className="hover:text-gray-400 cursor-pointer p-1"*/}
                    {/*            >*/}
                    {/*                <Link href="" underline="hover"> Stochastic Minimization </Link>*/}
                    {/*            </p>*/}
                    {/*            <p*/}
                    {/*                onMouseEnter={(e) => handlePopoverOpen(e, "Java-Gradle Animal Environment Simulation")}*/}
                    {/*                onMouseLeave={handlePopoverClose}*/}
                    {/*                className="hover:text-gray-400 cursor-pointer p-1"*/}
                    {/*            >*/}
                    {/*                <Link href="" underline="hover"> Darwin World </Link>*/}
                    {/*            </p>*/}
                    {/*            <p*/}
                    {/*                onMouseEnter={(e) => handlePopoverOpen(e, "Finite element method in R")}*/}
                    {/*                onMouseLeave={handlePopoverClose}*/}
                    {/*                className="hover:text-gray-400 cursor-pointer p-1"*/}
                    {/*            >*/}
                    {/*                <Link href="" underline="hover"> FEM </Link>*/}
                    {/*            </p>*/}
                    {/*        </Box>*/}
                    {/*    </Collapse>*/}
                    {/*</div>*/}
                    <div
                        className="menu_list"
                        onMouseEnter={handleOpenList3}
                        onMouseLeave={handleCloseList3}
                    >
                        <div style={{color: 'white', cursor: 'pointer'}}>
                            Contact
                        </div>
                        <Collapse in={openList3} className="collapse-content">
                            <Box mt={2}>
                                <p
                                    onMouseEnter={(e) => handlePopoverOpen(e, "Details about Item 3.1")}
                                    onMouseLeave={handlePopoverClose}
                                    className="hover:text-gray-400 cursor-pointer p-1"
                                >
                                    Phone
                                </p>
                                <p
                                    onMouseEnter={(e) => handlePopoverOpen(e, "Details about Item 3.2")}
                                    onMouseLeave={handlePopoverClose}
                                    className="hover:text-gray-400 cursor-pointer p-1"
                                >
                                    Mail
                                </p>
                            </Box>
                        </Collapse>
                    </div>
                </div>
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

export default Header_menu;
