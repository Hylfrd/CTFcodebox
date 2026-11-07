import { useState } from 'react';
import { X } from 'lucide-react';
import type { WorkbenchDraft } from './use-workbench-draft';

export function TargetEditor({ draft }: { draft: WorkbenchDraft }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const addTarget = () => {
    const target = value.trim();
    if (!target) return;
    if (draft.matchMode === 'regex') {
      try {
        new RegExp(target);
      } catch {
        setError('正则表达式格式有误，请检查后再添加。');
        return;
      }
    }
    if (!draft.targets.includes(target)) draft.setTargets([...draft.targets, target]);
    setValue('');
    setError('');
  };
  return (
    <div className="target-field">
      <div className="field-heading">
        <label htmlFor="target-input">目标标签</label>
        <div className="segmented-control" role="group" aria-label="目标匹配方式">
          <button
            type="button"
            aria-pressed={draft.matchMode === 'literal'}
            onClick={() => draft.setMatchMode('literal')}
          >
            字面
          </button>
          <button
            type="button"
            aria-pressed={draft.matchMode === 'regex'}
            onClick={() => draft.setMatchMode('regex')}
          >
            正则
          </button>
        </div>
      </div>
      <div className="target-editor">
        {draft.targets.map((target) => (
          <span className="target-chip" key={target}>
            <span>{target}</span>
            <button
              type="button"
              aria-label={`移除目标 ${target}`}
              onClick={() => draft.setTargets(draft.targets.filter((item) => item !== target))}
            >
              <X aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id="target-input"
          value={value}
          placeholder="输入目标，按 Enter 添加"
          onChange={(event) => {
            setValue(event.target.value);
            setError('');
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
              event.preventDefault();
              addTarget();
            }
          }}
          aria-invalid={!!error}
          aria-describedby={error ? 'target-error' : undefined}
        />
      </div>
      {error && (
        <p className="field-error" id="target-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
