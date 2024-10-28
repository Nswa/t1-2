import { get, writable } from 'svelte/store';

interface EditorState {
    content: string;
    isDirty: boolean;
    lastSaved?: Date;
    id?: number;
}

function createEditorStore() {
    const { subscribe, set, update } = writable<EditorState>({
        content: '',
        isDirty: false
    });

    return {
        subscribe,
        updateContent: (content: string) => update(state => ({
            ...state,
            content,
            isDirty: true
        })),
        save: async () => {
            try {
                const response = await fetch('/api/atoms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: get(editorStore).content })
                });

                const result = await response.json();
                
                if (result.success) {
                    update(state => ({
                        ...state,
                        isDirty: false,
                        lastSaved: new Date(),
                        id: result.id
                    }));
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Failed to save:', error);
                return false;
            }
        },
        reset: () => set({
            content: '',
            isDirty: false
        })
    };
}

export const editorStore = createEditorStore();
