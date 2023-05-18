import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { setPosts } from "../store/actions";
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

export function HomeScreen() {
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState(null);
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();

    const handlePostImageChange = (event) => {
        const file = event.target.files[0];
        setPostImage(file);
    };

    const validationSchema = Yup.object({
        postText: Yup.string().max(280, "Must be 280 characters or less"),
    });

    const fetchToSendAPost = (postObject, setSubmitting) => {
        fetch("http://localhost:8080/posts", {
            method: "POST",
            body: JSON.stringify(postObject),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log("vse gud");
            setPostText("");
            setPostImage(null);
        }).then(async()=>{
            const userDataPosts = await fetch(`http://localhost:8080/posts?userId=${userId}`);
            const usersPosts = await userDataPosts.json();
            dispatch(setPosts(usersPosts));
        }).catch((error) => {
            console.log("Pizda");
            console.error(error);
        }).finally(() => {
            setSubmitting(false);
        });
    };

    const handlePostSubmit = (values, setSubmitting) => {
        setSubmitting(true);
        console.log(values);
        if (!values.postText.trim()) {
            return;
        }
        if (postImage) {
            console.log(values);
            const formData = new FormData();
            formData.append("writtenText", postText);
            formData.append("userId", userId);

            if (postImage) {
                formData.append("photoFile", postImage);  // вместо 'photoFile' используйте имя поля, ожидаемое вашим сервером
            }
            setSubmitting(true);
            fetchToSendAPost(formData, setSubmitting);  // передаем formData, а не postObject
        } else {
            const postObject = {
                writtenText: values.postText,
                photoFileByteArray: [],
                userId: userId
            };
            setSubmitting(true);
            fetchToSendAPost(postObject);

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



