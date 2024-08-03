import './Header_menu.css';
import React,{memo} from 'react';
import {Collapse, Box, Popover} from "@mui/material";

// eslint-disable-next-line react/display-name
const Header_menu= memo(() => {
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


    const handleOpenList2 = () => {
        setOpenList3(true);
    };

    const handleCloseList2 = () => {
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


    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    return (
        <>
            <div className="main_container">
                <div className="main_container_horizontal">
                    <p>
                        <h1 className="name_text">Marcin Serafin </h1>
                    </p>
                    <div className="menu_container">
                    <div
                        className="menu_list"
                        onMouseEnter={handleOpenList1}
                        onMouseLeave={handleCloseList1}
                    >
                        <div style={{ color: '#6a4a3a', cursor: 'pointer' }}>
                            About
                        </div>
                        <Collapse in={openList1} className="collapse-content">
                            <Box mt={2}>
                                <p className="hover:text-gray-400 cursor-pointer p-1">
                                    <a href="/">
                                        CV
                                    </a>
                                </p>
                                <p className="hover:text-gray-400 cursor-pointer p-1">
                                    <a href="https://github.com/Fisieekk">
                                        GitHub
                                    </a>
                                </p>
                            </Box>
                        </Collapse>
                    </div>
                    <div
                        className="menu_list"
                        onMouseEnter={handleOpenList2}
                        onMouseLeave={handleCloseList2}
                    >
                        <div style={{color: '#6a4a3a', cursor: 'pointer'}}>
                            Contact
                        </div>
                        <Collapse in={openList3} className="collapse-content">
                            <Box mt={2}>
                                <p
                                    onMouseEnter={(e) => handlePopoverOpen(e, "824784852   Click to Copy")}
                                    onMouseLeave={handlePopoverClose}
                                    onClick={() => copyTextToClipboard("824784852")}
                                    className="hover:text-gray-400 cursor-pointer p-1"
                                >
                                    Phone
                                </p>
                                <p
                                    onMouseEnter={(e) => handlePopoverOpen(e, "Marcin.Serafin0325@gmail.com   Click to Copy")}
                                    onMouseLeave={handlePopoverClose}
                                    onClick={() => copyTextToClipboard("Marcin.Serafin0325@gmail.com")}
                                    className="hover:text-gray-400 cursor-pointer p-1"
                                >
                                    Mail
                                </p>
                            </Box>
                        </Collapse>
                    </div>
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
});

export default Header_menu;
