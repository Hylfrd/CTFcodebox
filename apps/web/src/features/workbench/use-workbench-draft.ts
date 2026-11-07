import { useState } from 'react';

export function useWorkbenchDraft() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [targets, setTargets] = useState(['flag{', 'CTF{', 'DASCTF{', 'picoCTF{', 'HTB{']);
  const [matchMode, setMatchMode] = useState<'literal' | 'regex'>('literal');
  return { input, setInput, key, setKey, targets, setTargets, matchMode, setMatchMode };
}

export type WorkbenchDraft = ReturnType<typeof useWorkbenchDraft>;
