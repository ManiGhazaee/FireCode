import React, { useState } from "react";
import ProblemPage from "./pages/ProblemPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouterLayout from "./layout/RouterLayout";
import ProblemSet from "./pages/ProblemSet";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <div className="App">
            <RouterLayout />
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={LandingPage} />
                    <Route path="/problem" Component={ProblemPage} />
                    <Route path="/problemset" Component={ProblemSet} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
