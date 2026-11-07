import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

afterEach(() => {
  cleanup();
  localStorage.clear();
});
function mount() {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
}

describe('应用外壳与页面状态', () => {
  it('默认折叠，四个导航可用，底部仅提供 GitHub 和主题', async () => {
    const user = userEvent.setup();
    mount();
    expect(screen.getByRole('button', { name: '展开菜单' }).getAttribute('aria-expanded')).toBe(
      'false',
    );
    await user.click(screen.getByRole('button', { name: '展开菜单' }));
    expect(screen.getByRole('button', { name: '收起菜单' }).getAttribute('aria-expanded')).toBe(
      'true',
    );
    expect(screen.queryByRole('button', { name: /语言|关于|环境|插件/ })).toBeNull();
    expect(screen.getByRole('link', { name: 'GitHub' }).getAttribute('href')).toBe(
      'https://github.com/Hylfrd/CTFcodebox',
    );
    await user.click(screen.getByRole('link', { name: '图形编码查询' }));
    expect(screen.getByRole('heading', { name: '图形编码查询' })).toBeTruthy();
  });

  it('切换页面后保留输入与密钥草稿', async () => {
    const user = userEvent.setup();
    mount();
    await user.type(screen.getByLabelText('输入内容'), '测试内容');
    await user.type(screen.getByLabelText('密钥'), 'test-key');
    await user.click(screen.getByRole('link', { name: '快速换算' }));
    await user.click(screen.getByRole('link', { name: '首页 · 一把梭' }));
    expect((screen.getByLabelText('输入内容') as HTMLTextAreaElement).value).toBe('测试内容');
    expect((screen.getByLabelText('密钥') as HTMLInputElement).value).toBe('test-key');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('可切换主题，未接入业务时不会伪造结果', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('button', { name: '切换到夜间模式' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect((screen.getByRole('button', { name: '一键解码' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect(screen.getByText('暂无结果')).toBeTruthy();
  });
});
