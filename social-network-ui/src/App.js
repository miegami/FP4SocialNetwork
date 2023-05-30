import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomeScreen } from "./pages/HomeScreen";
import {ProfilePage} from "./pages/ProfilePage";
import {SubscriptionPage} from "./pages/SubscriptionPage";
import { Explore } from "./pages/Explore";
import {BrowsePage} from "./pages/BrowsePage";
import { Notifications } from "./pages/Notifications";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/home" element={<HomeScreen/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/subscribe" element={<SubscriptionPage/>}/>
            <Route path="/view" element={<BrowsePage/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
        </Route>
    )
);


export function App() {
    return (
        <RouterProvider router={router}/>
    );
}