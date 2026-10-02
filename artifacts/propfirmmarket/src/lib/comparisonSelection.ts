import { useEffect, useSyncExternalStore } from 'react';
import { isKnownChallengeId } from '@/lib/challengeService';

export const MAX_COMPARE_CHALLENGES = 4;
export const COMPARISON_STORAGE_KEY = 'pfm_public_compare_challenge_ids_v1';

export type AddChallengeResult = 'added' | 'already-added' | 'limit-reached' | 'invalid' | 'storage-error';

const listeners = new Set<() => void>();
let statusMessage = '';

function parseIds(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return normalizeChallengeIds(parsed.filter((item): item is string => typeof item === 'string'));
  } catch {
    return [];
  }
}

export function normalizeChallengeIds(ids: string[]): string[] {
  const unique: string[] = [];
  for (const id of ids) {
    if (!isKnownChallengeId(id) || unique.includes(id)) continue;
    unique.push(id);
    if (unique.length === MAX_COMPARE_CHALLENGES) break;
  }
  return unique;
}

function notify() {
  for (const listener of listeners) listener();
}

function readStoredIds(): string[] {
  try {
    return parseIds(window.localStorage.getItem(COMPARISON_STORAGE_KEY));
  } catch {
    return [];
  }
}

function getSnapshot(): string {
  return JSON.stringify({ ids: readStoredIds(), message: statusMessage });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === COMPARISON_STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function persist(ids: string[]) {
  const normalized = normalizeChallengeIds(ids);
  try {
    window.localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    statusMessage = 'Comparison selection could not be saved in this browser.';
    notify();
    return readStoredIds();
  }
  statusMessage = '';
  notify();
  return normalized;
}

function announce(message: string) {
  statusMessage = message;
  notify();
}

export function getComparisonIdsFromSearch(search: string): string[] | undefined {
  const params = new URLSearchParams(search);
  if (!params.has('challenges')) return undefined;
  return normalizeChallengeIds((params.get('challenges') ?? '').split(',').filter(Boolean));
}

export function addChallengeToCompare(id: string): AddChallengeResult {
  if (!isKnownChallengeId(id)) return 'invalid';
  const current = readStoredIds();
  if (current.includes(id)) return 'already-added';
  if (current.length >= MAX_COMPARE_CHALLENGES) return 'limit-reached';
  return persist([...current, id]).includes(id) ? 'added' : 'storage-error';
}

export function removeChallengeFromCompare(id: string): string[] {
  return persist(readStoredIds().filter((challengeId) => challengeId !== id));
}

export function setComparisonIds(ids: string[]): string[] {
  return persist(ids);
}

export function clearComparison(): string[] {
  return persist([]);
}

export function createComparisonUrl(ids: string[], origin = window.location.origin): string {
  const normalized = normalizeChallengeIds(ids);
  const url = new URL('/compare', origin);
  if (normalized.length > 0) url.searchParams.set('challenges', normalized.join(','));
  return url.toString();
}

export function useComparisonSelection() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => '[]');
  const parsed = JSON.parse(snapshot) as { ids?: unknown; message?: unknown };
  const ids = Array.isArray(parsed.ids)
    ? normalizeChallengeIds(parsed.ids.filter((item): item is string => typeof item === 'string'))
    : [];

  useEffect(() => {
    const current = window.localStorage.getItem(COMPARISON_STORAGE_KEY);
    const valid = JSON.stringify(readStoredIds());
    if (current !== valid) {
      try {
        window.localStorage.setItem(COMPARISON_STORAGE_KEY, valid);
      } catch {
        return;
      }
    }
  }, []);

  return {
    ids,
    add: addChallengeToCompare,
    remove: removeChallengeFromCompare,
    clear: clearComparison,
    announce,
    message: typeof parsed.message === 'string' ? parsed.message : '',
  };
}
