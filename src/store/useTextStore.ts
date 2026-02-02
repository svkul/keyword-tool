import { create } from 'zustand';

const MAX_HISTORY = 10;

export type HistoryState = {
  past: string[];
  present: string;
  future: string[];
};

export type Transform = (text: string) => string;

type TextStore = {
  /** Original text (left field / keywords) – only changed by user typing or setText/clear/import. */
  original: string;
  history: HistoryState;

  setOriginal: (text: string) => void;
  setText: (text: string) => void;

  applyTransform: (fn: (lines: string[]) => string[]) => void;
  applyBatch: (fns: Transform[]) => void;

  undo: () => void;
  redo: () => void;

  canUndo: () => boolean;
  canRedo: () => boolean;
};

const emptyHistory: HistoryState = {
  past: [],
  present: '',
  future: [],
};

export const useTextStore = create<TextStore>((set, get) => ({
  original: '',
  history: { ...emptyHistory },

  setOriginal: (text) =>
    set({
      original: text,
      history: {
        past: [],
        present: text,
        future: [],
      },
    }),

  setText: (text) =>
    set({
      original: text,
      history: {
        past: [],
        present: text,
        future: [],
      },
    }),

  applyTransform: (fn) => {
    const { history } = get();
    const lines = history.present.split('\n');
    const newLines = fn(lines);
    const newText = newLines.join('\n');

    if (newText === history.present) return;

    set((s) => ({
      history: {
        past: [...s.history.past, s.history.present].slice(-MAX_HISTORY),
        present: newText,
        future: [],
      },
    }));
  },

  applyBatch: (fns) => {
    const { history } = get();

    const newText = fns.reduce(
      (text, fn) => fn(text),
      history.present,
    );

    if (newText === history.present) return;

    set((s) => ({
      history: {
        past: [...s.history.past, s.history.present].slice(-MAX_HISTORY),
        present: newText,
        future: [],
      },
    }));
  },

  undo: () => {
    const { history } = get();
    if (!history.past.length) return;

    const previous = history.past[history.past.length - 1];

    set((s) => ({
      history: {
        past: s.history.past.slice(0, -1),
        present: previous,
        future: [s.history.present, ...s.history.future],
      },
    }));
  },

  redo: () => {
    const { history } = get();
    if (!history.future.length) return;

    const next = history.future[0];

    set((s) => ({
      history: {
        past: [...s.history.past, s.history.present].slice(-MAX_HISTORY),
        present: next,
        future: s.history.future.slice(1),
      },
    }));
  },

  canUndo: () => get().history.past.length > 0,
  canRedo: () => get().history.future.length > 0,
}));
