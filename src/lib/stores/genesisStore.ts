import { writable } from 'svelte/store';
import type { Genesis } from '$lib/types/genesis';

export const currentGenesis = writable<Genesis | null>(null);
export const isSaving = writable<boolean>(false); 