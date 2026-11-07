import { Zap } from 'lucide-react';
import { TargetEditor } from './TargetEditor';
import { InputEditor } from './InputEditor';
import type { WorkbenchDraft } from './use-workbench-draft';

export function WorkbenchPage({ draft }: { draft: WorkbenchDraft }) {
  return (
    <div className="workbench">
      <section className="input-pane" aria-label="输入区">
        <TargetEditor draft={draft} />
        <div className="key-field">
          <label htmlFor="key-input">密钥</label>
          <input
            id="key-input"
            value={draft.key}
            onChange={(event) => draft.setKey(event.target.value)}
            placeholder="可选"
            autoComplete="off"
          />
        </div>
        <div className="run-toolbar">
          <span className="muted">一键解码暂未开放</span>
          <button type="button" className="button button-primary" disabled>
            <Zap aria-hidden="true" />
            一键解码
          </button>
        </div>
        <InputEditor value={draft.input} onChange={draft.setInput} />
      </section>
      <section className="result-pane" aria-labelledby="result-title">
        <div className="pane-heading">
          <h1 id="result-title">解码结果</h1>
        </div>
        <div className="result-content">
          <p className="empty-state">暂无结果</p>
        </div>
      </section>
    </div>
  );
}
