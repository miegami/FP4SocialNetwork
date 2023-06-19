import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StyledBlackButton } from "../../LoginModal/loginModalStyles";
import React, { useEffect, useState } from "react";
import { PopularPeopleFetch, setSearchId, userFollowing } from "../../../store/actions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
    PaperStyles,
    ElementLi,
    ElementUl,
    Wrapper,
    imgStyles,
    TextWrapper,
    userNameParagraph,
    userNickParagraph,
    userNickLink, customButton, emptyArrParagraph,
} from "./popularPeopleSidebarStyles";
import { apiUrl } from "../../../apiConfig";
import { ToggleButton } from "../../Buttons/ToggleButton/ToggleButton";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import { SidebarLogOutButton } from "../NavigationStyles";

export function PopularPeopleSidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idUser = useSelector(state => state.userData.userData.userId);
    const [mostPopularPeople, setMostPopularPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ArrayUsersWhichYouFollow = useSelector(state => state.userData.userFollowing.following, shallowEqual)

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        PaperAdaptiveStyles: {...PaperStyles , width:"220px"},
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper
        },
       FollowButtonWidth:"70px",
    };

    const xsStyles = {
        PaperAdaptiveStyles: {...PaperStyles , width:"220px"},
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper
        },
        FollowButtonWidth:"70px",
    };

    const smStyles = {
        PaperAdaptiveStyles: {...PaperStyles , width:"220px"},
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper
        },
        FollowButtonWidth:"70px",
    };

    const mdStyles = {
        PaperAdaptiveStyles: {...PaperStyles, width:"220px" },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
        },
        FollowButtonWidth:"70px",
    };

    const lgStyles = {
        PaperAdaptiveStyles: {...PaperStyles },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper
        },
        FollowButtonWidth:"100px",
    };

    const xlStyles = {
        PaperAdaptiveStyles: {...PaperStyles },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper
        },
        FollowButtonWidth:"100px",
    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    } else if (isLg) {
        styles = lgStyles;
    } else if (isMd) {
        styles = mdStyles;
    } else if (isSm) {
        styles = smStyles;
    } else if (isXs) {
        styles = xsStyles;
    } else {
        styles = xxsStyles;
    }

    const userFollowingData = async () => {
        try {
            // setIsLoading(true);
            const response = await fetch(`${apiUrl}/api/following/${idUser}`)
            const followData = await response.json()
            const followArr = followData.map(el => String(el.userId))
            dispatch(userFollowing(followArr))
        } catch (error) {
            console.error(error);
        } finally {
            // setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(PopularPeopleFetch(setIsLoading, setMostPopularPeople));
            userFollowingData()
        };
        if(ArrayUsersWhichYouFollow){
            fetchData();
        }
    }, []);

    const toAnotherUserPage = (userIdWhoSendPost) => {
        dispatch(setSearchId(String(userIdWhoSendPost)));
        navigate("/view");
    };



    return (
        isLoading ? <CircularProgress sx={{ marginTop: "20%", alignSelf: "center" }}/> :
            <Paper elevation={3} sx={styles.PaperAdaptiveStyles}>
                {mostPopularPeople.length > 0 ?
                    <ul style={ElementUl}>
                        {mostPopularPeople.map((user, index) => (
                            <li key={user.userId} style={{...styles.ElementLiAdaptiveStyles,   borderBottom: index !== mostPopularPeople.length - 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none",}}>
                                    {user.profileImageLink ?
                                        <img src={user.profileImageLink}
                                             style={imgStyles}
                                             alt=""/> :
                                        <Avatar alt={user.username} style={{ width: "50px", height: "50px" }}
                                                src={user.avatar}/>}
                                    <div style={TextWrapper}>
                                        <Typography style={userNameParagraph} onClick={() => {
                                            toAnotherUserPage(user.userId);
                                        }}>{user.name}
                                        </Typography>
                                        <Typography style={userNickParagraph} onClick={() => {
                                            toAnotherUserPage(user.userId);
                                        }}>
                                            <Link style={userNickLink}>@{user.username}</Link>
                                        </Typography>
                                    </div>
                                    { idUser == user.userId ? <Button disabled={true} sx={{...StyledBlackButton , width:`${styles.FollowButtonWidth}`, height:"30px", marginTop:0, color:"white",  '&.Mui-disabled': {
                                            color: "white",
                                            opacity: 1,
                                        },}}>You</Button> : <ToggleButton href="#"  width={styles.FollowButtonWidth} height="30px" searchId={`${user.userId}`}/>}
                            </li>
                        ))}
                    </ul> : <Typography sx={emptyArrParagraph}>we have no ideas to show</Typography>
                }
            </Paper>
    );
}


