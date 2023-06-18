import React from "react";

import { AppBar, Avatar, Paper , Typography, Button} from "@mui/material";

import {
    UserSearchAppBar,
    UserSearchContentWrapper,
    UserSearchTextField,
    UserSearchWrapper
} from "../NavigationStyles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { InputSearch } from "./Search/InputSearch";
import { GetUsersSuccess } from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { StyledBlackButton } from "../../LoginModal/loginModalStyles";
import { PopularPeopleSidebar } from "./PopularPeopleSidebar";

import {apiUrl} from "../../../apiConfig";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {Search} from "./Search/Search";

export function UsersSearch() {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none",},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"10px", display:"none"},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"10px", display:"none"}
    };

    const xsStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"0px", display:"none"},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"10px", display:"none"}

    };

    const smStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none",  flexBasis: "100px",},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"0px", zIndex: "0.1",},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"50px"}
    };

    const mdStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none", flexBasis: "100px"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"0px", zIndex: "0.1",},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"100px"}
    };

    const lgStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper}
    };

    const xlStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper}
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

    return (
        <div style={UserSearchWrapper}>
            <AppBar position="sticky" style={styles.AdaptiveUserSearchAppBar}>
                <Search/>
                <PopularPeopleSidebar/>
            </AppBar>
            <div style={styles.AdaptiveUserSearchContentWrapper}></div>
        </div>
    );
}
