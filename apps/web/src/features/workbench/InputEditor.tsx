import { useRef, useState } from 'react';
import { ClipboardPaste, Copy, Download, Trash2, WrapText } from 'lucide-react';
import { IconButton } from '../../components/IconButton';

export function InputEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [wrapped, setWrapped] = useState(true);
  const [notice, setNotice] = useState('');
  const editor = useRef<HTMLTextAreaElement>(null);
  async function clipboard(action: 'copy' | 'paste') {
    try {
      if (action === 'copy') {
        await navigator.clipboard.writeText(value);
        setNotice('已复制');
      } else {
        onChange(await navigator.clipboard.readText());
        editor.current?.focus();
        setNotice('已粘贴');
      }
    } catch {
      setNotice('无法访问剪贴板，请使用键盘快捷键。');
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([value], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'input.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="input-editor">
      <div className="editor-toolbar">
        <label htmlFor="source-input">输入内容</label>
        <div className="toolbar-actions" role="group" aria-label="输入工具">
          <IconButton label="粘贴" onClick={() => void clipboard('paste')}>
            <ClipboardPaste />
          </IconButton>
          <IconButton
            label="清空"
            disabled={!value}
            onClick={() => {
              onChange('');
              setNotice('');
              editor.current?.focus();
            }}
          >
            <Trash2 />
          </IconButton>
          <IconButton label="复制输入" disabled={!value} onClick={() => void clipboard('copy')}>
            <Copy />
          </IconButton>
          <IconButton label="下载输入" disabled={!value} onClick={download}>
            <Download />
          </IconButton>
          <IconButton label="自动换行" aria-pressed={wrapped} onClick={() => setWrapped(!wrapped)}>
            <WrapText />
          </IconButton>
        </div>
      </div>
      <textarea
        ref={editor}
        id="source-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="在此粘贴待处理内容…"
        spellCheck={false}
        wrap={wrapped ? 'soft' : 'off'}
      />
      <div className="editor-footer">
        <span aria-live="polite">{notice}</span>
        <span>
          {Array.from(value).length} 字符<span className="footer-separator">·</span>
          {value ? value.split('\n').length : 0} 行
        </span>
      </div>
    </div>
  );
}
