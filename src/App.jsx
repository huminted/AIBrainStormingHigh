// src/App.jsx

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage     from './LandingPage'
import RoleSelection   from './RoleSelection'
import BrainstormPanel from './BrainstormPanel'
import TeamOverview from './TeamOverview.jsx'
import CreateRoles from "./CreateRoles.jsx";

export default function App() {
    return (
        <Routes>
            {/* 落地页 */}
            <Route path="/" element={<LandingPage />} />

            {/* Start 按钮跳转的角色选择页面 */}
            <Route path="/select-roles" element={<RoleSelection />} />

            {/* View More → 跳转的面板页面 */}
            <Route path="/panel" element={<BrainstormPanel />} />

            <Route path="/overview" element={<TeamOverview />} />

            <Route path="/CreateRoles" element={<CreateRoles />} />
        </Routes>
    )
}
