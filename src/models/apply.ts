import { User } from './user';

export interface Term {
  id: string;
  title: string;
  link?: string;
}

export const APPLY_STATUS = {
  READY: '준비중',
  PROGRESS: '진행중',
  COMPLETE: '완료',
  REJECT: '거절',
} as const;

export interface ApplyValues {
  userId: User['uid'];
  terms: Array<Term['id']>;
  appliedAt: Date;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isHipass: boolean;
  isRf: boolean;
  status: '준비중' | '진행중' | '완료' | '거절';
  step: number;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}
