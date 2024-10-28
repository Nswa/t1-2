// src/genesisLanguage.ts

import * as monaco from 'monaco-editor';

export const genesisLanguage = {
    id: 'genesis',
    extensions: ['.genesis'],
    aliases: ['Genesis'],
    loader: () => {
        monaco.languages.setMonarchTokensProvider('genesis', {
            tokenizer: {
                root: [
                    // Register atoms
                    [/~/, { token: 'atom', next: '@atom' }],
                ],
                atom: [
                    [/./, { token: 'atom' }],
                    [/~/, { token: 'atom', next: '@pop' }],
                ],
            },
            // Metadata for tokens
            metadata: {
                atom: {
                    // You can define additional metadata properties here
                    metadata: {
                        // E.g., time of creation
                        time: new Date().toISOString()
                    },
                },
            },
        });
    }
};
