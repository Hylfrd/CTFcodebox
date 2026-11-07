import { BookImage, Calculator, ScanText, Zap } from 'lucide-react';

export const navigation = [
  { path: '/', label: '首页 · 一把梭', icon: Zap },
  { path: '/characters', label: '字符显示器', icon: ScanText },
  { path: '/graphics', label: '图形编码查询', icon: BookImage },
  { path: '/convert', label: '快速换算', icon: Calculator },
] as const;
