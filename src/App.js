import React from "react";
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import {Landing} from "./landing"
import SmoothScroll from "smooth-scroll";
import {Maininventory} from "./Pages/inventory"
import { Recipes } from "./Pages/Page/recipes"
import { Information } from "./Pages/Page/information"
import { Knowledge } from "./Pages/Page/knowledge"
import { Recycling } from "./Pages/Page/recycling"
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });
function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/inventory" element={
                        <div style={{ width: '100%', height: '100%' }}>
                            <Maininventory />
                        </div>
                    } />
                <Route exact path="/recipes" element={
                        <div style={{ width: '100%', height: '100%' }}>
                            <Recipes />
                        </div>
                    } />


                   
                <Route exact path="/information" element={
                        <div style={{ width: '100%', height: '100%' }}>
                            <Information />
                        </div>
                    } />
                <Route exact path="/knowledge" element={
                        <div style={{ width: '100%', height: '100%' }}>
                            <Knowledge />
                        </div>
                    } />
                <Route exact path="/recycling" element={
                        <div style={{ width: '100%', height: '100%' }}>
                            <Recycling />
                        </div>
                    } />    
            </Routes>
            <Contact />
        </Router>
    );
}
 
export default App;