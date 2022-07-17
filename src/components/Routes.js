import React, { memo } from "react";

import { Routes , Route } from "react-router-dom";

import Landing from "../pages/Landing";

const Routing = () => {
    return (
        <Routes>
            <Route path="/*" element={< Landing/>} />
        </Routes>
    );
}

Routing.propTypes = {
    // selectLanding: PropTypes.func.isRequired,
};

export default memo(Routing);
