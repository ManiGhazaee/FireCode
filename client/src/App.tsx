import React, { useState } from "react";
import ProblemPage from "./pages/ProblemPage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
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
                    <Route path="/problemset" Component={ProblemSet} />
                    <Route
                        path="/problem/:name/editorial"
                        element={
                            <ProblemPage
                                data={{ activeNavOption: "editorial" }}
                            />
                        }
                    />
                    <Route
                        path="/problem/:name/solutions"
                        element={
                            <ProblemPage
                                data={{ activeNavOption: "solutions" }}
                            />
                        }
                    />
                    <Route
                        path="/problem/:name/submissions"
                        element={
                            <ProblemPage
                                data={{ activeNavOption: "submissions" }}
                            />
                        }
                    />
                    <Route
                        path="/problem/:name"
                        element={
                            <ProblemPage
                                data={{ activeNavOption: "description" }}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
