import { Route, Routes, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { WorkbenchPage } from '../features/workbench/WorkbenchPage';
import { useWorkbenchDraft } from '../features/workbench/use-workbench-draft';
import { UnavailablePage } from '../components/UnavailablePage';

export function App() {
  const draft = useWorkbenchDraft();
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<WorkbenchPage draft={draft} />} />
        <Route
          path="/characters"
          element={<UnavailablePage title="字符显示器" description="查看字符与编码信息。" />}
        />
        <Route
          path="/graphics"
          element={<UnavailablePage title="图形编码查询" description="查阅图形与符号编码。" />}
        />
        <Route
          path="/convert"
          element={<UnavailablePage title="快速换算" description="进行常用进制与数值换算。" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
