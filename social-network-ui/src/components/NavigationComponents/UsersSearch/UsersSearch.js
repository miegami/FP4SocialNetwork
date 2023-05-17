import React from "react";

import {AppBar} from "@mui/material";

import { UserSearchAppBar, UserSearchContentWrapper, UserSearchWrapper } from "../NavigationStyles";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

import {InputSearch} from "./InputSearch";
import {GetUsersSuccess} from "../../../store/actions";
import {useDispatch} from "react-redux";



export function UsersSearch() {

    const dispatch = useDispatch()

    return (
        <div style={UserSearchWrapper}>
            <AppBar position="sticky" style={UserSearchAppBar}>
                <Formik initialValues={{
                    userName: "",
                }} validationSchema={
                    Yup.object(
                        {
                            userName: Yup.string().required("Username is required")
                        }
                    )} validate={async (values) => {
                        const response = await fetch("http://localhost:8080/search", {
                            method: "POST",
                            body: JSON.stringify({userSearch: values.userName}),
                            headers: { "Content-Type": "application/json" }
                        })
                            .then(r => r.json())
                            .then(data => dispatch(GetUsersSuccess(data)))
                }}>
                    <Form>

                        <Field as={InputSearch} sx={{ width: "400px" }}
                               name={"userName"} id="userName"
                               label="Username" type="text" />

                    </Form>
                </Formik>
            </AppBar>
            <div style={UserSearchContentWrapper}></div>
        </div>

    );
}
