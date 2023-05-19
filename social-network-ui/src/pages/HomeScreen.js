import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { setPage, setPosts, setUserId, setUserPostsClear } from "../store/actions";
import { SidebarLogOutButton } from "../components/NavigationComponents/NavigationStyles";
import { CapybaraSvgPhoto } from "../components/SvgIcons/CapybaraSvgPhoto";
import {
    NameOfUser,
    SvgWrapper,
    WrittenPostWrapper,
    HomeScreenWrapper,
    PostWrapper,
    SendingPostButtonsContainer
} from "./pagesStyles/HomeScreenStyles";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import { SendPostInput } from "../components/Posts/SendPostInput";
import { CharactersTextWrapper, PostImgWrapper, PostsWrapper, SendPostField } from "../components/Posts/PostStyles";
import { decodeToken } from "../components/Posts/decodeToken";

export function HomeScreen() {
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState(null);
    const userId = useSelector(state => state.userData.userData.userId);
    const currentPosts = useSelector(state => state.Posts.posts);
    const page = useSelector(state => state.pageCount.page);
    const dispatch = useDispatch();

    const handlePostImageChange = (event) => {
        const file = event.target.files[0];
        setPostImage(file);
    };

    const validationSchema = Yup.object({
        postText: Yup.string().max(280, "Must be 280 characters or less"),
    });

    const fetchToSendAPost = async (postObject, setSubmitting) => {
        await fetch("http://localhost:8080/posts", {
            method: "POST",
            body: JSON.stringify(postObject),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            dispatch(setUserPostsClear([]))
            if (!response.ok) {
                throw new Error("Failed to create post");
            }
            return response.json();
        }).then(async () => {
            setPostImage(null);
            setPostText("");

        }).finally(async () => {
            setSubmitting(false);
            let a = await fetch(`http://localhost:8080/posts?userId=${userId}&page=${0}`);
            let b = await a.json();
            dispatch(setPosts(b));
        });
    };

    const handlePostSubmit = (values, setSubmitting) => {
        if (postImage) {
            const reader = new FileReader();
            const formData = new FormData();
            formData.append("writtenText", postText);
            formData.append("userId", userId);

            reader.onloadend = () => {
                const imageArrayBuffer = new Uint8Array(reader.result);
                const photoFileByteArray = Array.from(imageArrayBuffer);
                const postObject = {
                    writtenText: values.postText,
                    photoFileByteArray: photoFileByteArray,
                    userId: userId
                };
                setSubmitting(true);
                fetchToSendAPost(postObject, setSubmitting);
            };
            reader.readAsArrayBuffer(postImage);
        } else {
            const postObject = {
                writtenText: values.postText,
                photoFileByteArray: [],
                userId: userId
            };
            setSubmitting(true);
            fetchToSendAPost(postObject, setSubmitting);
        }
    };

    return (
        <Formik
            initialValues={{ postText: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                handlePostSubmit(values, setSubmitting);
                resetForm();
            }}
        >
            {({ values, errors, touched, isSubmitting }) => (
                <Form>
                    <div style={HomeScreenWrapper}>
                        <div style={PostWrapper}>
                            <div style={SvgWrapper}>
                                <CapybaraSvgPhoto/>
                            </div>
                            <div style={WrittenPostWrapper}>
                                <h2 style={NameOfUser}>Capybara name</h2>
                                <Field
                                    values={postText}
                                    component={SendPostInput}
                                    name="postText"
                                    className={errors.postText && touched.postText ? "error" : ""}
                                    style={SendPostField}
                                    id="postText"
                                    placeholder="What's happening?"
                                />
                                <div style={CharactersTextWrapper}>
                                    {
                                        280 - values.postText.length >= 0 ?
                                            (280 - values.postText.length + " characters") : ("maximum number of characters 280")
                                    }
                                </div>
                                <Box sx={PostImgWrapper}>
                                    {postImage && (
                                        <img
                                            src={URL.createObjectURL(postImage)}
                                            alt="Post Image"
                                            style={{ maxWidth: "100%", height: "auto" }}
                                        />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="post-image-input"
                                        onChange={handlePostImageChange}
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="post-image-input">
                                        <div style={SendingPostButtonsContainer}>
                                            <Button
                                                component="span"
                                                variant="contained"
                                                color="primary"
                                                sx={SidebarLogOutButton}
                                                startIcon={<CloudUploadOutlined/>}
                                                disabled={!!postImage}
                                            >image</Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={SidebarLogOutButton}
                                                fullWidth={true}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Posting..." : "Post"}
                                            </Button>
                                        </div>
                                    </label>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div style={PostsWrapper}>
                        <PostsDisplaying/>
                    </div>
                </Form>
            )}
        </Formik>
    );
}



