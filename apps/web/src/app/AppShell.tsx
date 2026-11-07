import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { GitFork, Moon, PanelLeftClose, PanelLeftOpen, Sun } from 'lucide-react';
import { navigation } from './navigation';
import { useTheme } from './use-theme';
import { IconButton } from '../components/IconButton';

export function AppShell({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const ToggleIcon = expanded ? PanelLeftClose : PanelLeftOpen;
  const ThemeIcon = theme === 'light' ? Moon : Sun;
  const themeLabel = theme === 'light' ? '切换到夜间模式' : '切换到日间模式';

  return (
    <div
      className={`app-shell${expanded ? ' sidebar-expanded' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setExpanded(false);
      }}
    >
      <a
        href="#workspace"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('workspace')?.focus();
        }}
      >
        跳到工作区
      </a>
      {expanded && (
        <button
          className="sidebar-backdrop"
          onClick={() => setExpanded(false)}
          aria-label="收起侧栏"
        />
      )}
      <aside className="sidebar" aria-label="主导航">
        <div className="sidebar-heading">
          <IconButton
            label={expanded ? '收起菜单' : '展开菜单'}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="tool-navigation"
          >
            <ToggleIcon />
          </IconButton>
          <span className="brand-name">CTFcodebox</span>
        </div>
        <nav id="tool-navigation" className="tool-navigation" aria-label="工具">
          {navigation.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              title={label}
              aria-label={label}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              onClick={() => {
                if (window.matchMedia?.('(max-width: 800px)').matches) setExpanded(false);
              }}
            >
              <Icon aria-hidden="true" />
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <a
            className="nav-item"
            href="https://github.com/Hylfrd/CTFcodebox"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <GitFork aria-hidden="true" />
            <span className="nav-label">GitHub</span>
          </a>
          <button
            className="nav-item"
            type="button"
            onClick={toggleTheme}
            title={themeLabel}
            aria-label={themeLabel}
          >
            <ThemeIcon aria-hidden="true" />
            <span className="nav-label">{theme === 'light' ? '夜间模式' : '日间模式'}</span>
          </button>
        </div>
      </aside>
      <main id="workspace" className="workspace" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
