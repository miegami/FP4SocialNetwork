import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {
    BgImgStyle, infoTextStyles,
    imgStyle, LinkQuantityStyles, LinkStyles, LinkTextStyles,
    NameStyles,
    NicknameStyles,
    ProfileStyles, SvgStyles, infoStyle,
} from "./ProfileStyles";
import {Avatar, Button, SvgIcon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ProfileSwipeableViews} from "../ProfilePageSwipeableViews/ProfileSwipeableViews";
import {sendPost} from "../../../store/actions";

export function Profile (props) {

    // const handlePostSubmit = useCallback(async (values, setSubmitting) => {
    //     if (values.postText.trim() !== "" || postImage) {
    //         setSubmitting(true);
    //
    //         let photoFileByteArray = [];
    //         if (postImage) {
    //             const reader = new FileReader();
    //
    //             reader.onloadend = async () => {
    //                 const imageArrayBuffer = new Uint8Array(reader.result);
    //                 photoFileByteArray = Array.from(imageArrayBuffer);
    //
    //                 const postObject = {
    //                     writtenText: values.postText,
    //                     photoFileByteArray: photoFileByteArray,
    //                     userId: userId
    //                 };
    //
    //                 await dispatch(sendPost(postObject, setSubmitting));
    //             };
    //
    //             reader.readAsArrayBuffer(postImage);
    //         } else {
    //             const postObject = {
    //                 writtenText: values.postText,
    //                 photoFileByteArray: [],
    //                 userId: userId
    //             };
    //             await dispatch(sendPost(postObject, setSubmitting));
    //         }
    //
    //         setPostImage(null);
    //         setPostText("");
    //     }
    // }, [postImage, postText, userId]);

    return (

        <div>
            <div style={BgImgStyle}>
            </div>
            <div style={ProfileStyles}>
                <div style={imgStyle}>
                    {/*{props.image ? <img src={`${props.image}`} style={{ width: "150px", height: "150px", borderRadius: "80px", margin: "0,auto" }} alt=""/>*/}
                    {/*    :<Avatar sx={{ bgcolor: "rgb(29, 155, 240)", width: "140px", height: "140px", marginTop: "-15%" }}></Avatar> }*/}

                    {/*<Avatar alt={props.name} src={URL.createObjectURL(props.image)} sx={{ bgcolor: "rgb(29, 155, 240)", width: "140px", height: "140px", marginTop: "-15%" }}/>*/}

                    <Avatar alt={props.name} src={props.image} sx={{ bgcolor: "rgb(29, 155, 240)", width: "140px", height: "140px", marginTop: "-15%" }}/>

                    <Button type="submit"
                            variant="contained" sx={{
                        height: "45px",
                        padding: "0 12px",
                        color: `${props.textColor}`,
                        mb: "20px",
                        mt: "12px", width: "170px", background: `${props.buttonColor}`,
                        transition: "0.7s", "&:hover": {
                            transition: "0.7s",
                            backgroundColor: `${props.textColor}`,
                            color: `${props.buttonColor}`
                        },
                        fontWeight: 700,
                        borderRadius: "20px",
                        fontFamily: "'Lato', sans-serif",
                    }} fullWidth={true} onClick={() => props.btnClick()}>{props.buttonText}</Button>
                </div>
                <div>
                    <div style={{ margin: "15px 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                        <span style={NameStyles}>{props.name}</span>
                        <span style={NicknameStyles}>@{props.userName}</span>
                    </div>
                    <div style={infoStyle}>
                        {props.address ?
                            <div style={SvgStyles}>
                                <SvgIcon viewBox="0 0 24 24" sx={{width: "18px", height: "18px"}}>
                                    <g>
                                        <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>                            </g>
                                </SvgIcon>
                                <span style={infoTextStyles}>{props.address}</span>
                            </div>
                            :
                            false
                        }
                        <div style={SvgStyles}>
                            <SvgIcon viewBox="0 0 24 24" sx={{width: "18px", height: "18px"}}>
                                <g>
                                    <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"/>
                                </g>
                            </SvgIcon>
                            <span style={infoTextStyles}>Registration Date: {props.date}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Link to="/subscribe" variant="contained" style={LinkStyles} onClick={() =>  localStorage.setItem("subscribe", JSON.stringify(1))}>
                            <Typography sx={LinkTextStyles}>
                                <span style={LinkQuantityStyles}>{props.followings}</span> following
                            </Typography>
                        </Link>
                        <Link to="/subscribe" variant="contained" style={LinkStyles} onClick={() =>  localStorage.setItem("subscribe", JSON.stringify(0))}>
                            <Typography sx={LinkTextStyles}>
                                <span style={LinkQuantityStyles}>{props.followers}</span> followers
                            </Typography>
                        </Link>
                    </div>
                </div>
            </div>
            <ProfileSwipeableViews userId={props.userId}/>
        </div>
    )
}

Profile.propTypes = {
    image: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string,
    followings: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    btnClick: PropTypes.func.isRequired
};