import React from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {StoreProvider} from "./stateManagement/store";
import router from "./router";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <StoreProvider>
        <RouterProvider router={router} />
    </StoreProvider>
)

