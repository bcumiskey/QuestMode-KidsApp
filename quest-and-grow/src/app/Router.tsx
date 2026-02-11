import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserSelection } from '@core/auth/UserSelection.tsx'
import { PinLogin } from '@core/auth/PinLogin.tsx'
import { ChildLayout } from '@shared/layouts/ChildLayout.tsx'
import { ParentLayout } from '@shared/layouts/ParentLayout.tsx'
import { QuestList } from '@quests/components/QuestList.tsx'
import { RewardsTab } from '@progression/components/RewardsTab.tsx'
import { ProfileTab } from '@progression/components/ProfileTab.tsx'
import { BaseGrid } from '@base-builder/components/BaseGrid.tsx'
import { CreatureCollection } from '@creatures/components/CreatureCollection.tsx'
import { FamilyOverview } from '@parent/components/FamilyOverview.tsx'
import { ApprovalQueue } from '@parent/components/ApprovalQueue.tsx'
import { SettingsPanel } from '@parent/components/SettingsPanel.tsx'
import { ChildManager } from '@parent/components/ChildManager.tsx'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/login/:memberId" element={<PinLogin />} />

        <Route path="/child/:memberId" element={<ChildLayout />}>
          <Route index element={<Navigate to="quests" replace />} />
          <Route path="quests" element={<QuestList />} />
          <Route path="base" element={<BaseGrid />} />
          <Route path="creatures" element={<CreatureCollection />} />
          <Route path="rewards" element={<RewardsTab />} />
          <Route path="profile" element={<ProfileTab />} />
        </Route>

        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<FamilyOverview />} />
          <Route path="approvals" element={<ApprovalQueue />} />
          <Route path="children" element={<ChildManager />} />
          <Route path="settings" element={<SettingsPanel />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
