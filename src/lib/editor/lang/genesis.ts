export const setupGenesisLanguage = (monaco: any) => {
    monaco.languages.register({ id: 'genesis' });

    monaco.languages.setMonarchTokensProvider('genesis', {
        tokenizer: {
            root: [
                // Atom start marker - switches to atom state
                [/~/, { token: 'atom.marker', next: '@atom' }],
            ],
            
            atom: [
                // New atom marker - exits current atom and starts new one
                [/~/, { token: 'atom.marker', next: '@atom' }],
                
                // Closet with content (envelope)
                [/\[/, { token: 'envelope.open', next: '@envelope' }],
                
                // Everything else in the atom is atom content
                [/[^~\[]+/, 'atom.content'],
            ],

            envelope: [
                // Close envelope
                [/\]/, { token: 'envelope.close', next: '@atom' }],
                
                // Envelope content
                [/[^\]]+/, 'envelope.content'],
            ]
        }
    });

    monaco.editor.defineTheme('genesis-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            // Atom styling
            { token: 'atom.marker', foreground: '#FF5370', fontStyle: 'bold' },
            { token: 'atom.content', foreground: '#FFFFFF' },
            
            // Envelope styling (closets with content)
            { token: 'envelope.open', foreground: '#89DDFF' },
            { token: 'envelope.close', foreground: '#89DDFF' },
            { token: 'envelope.content', foreground: '#C3E88D', fontStyle: 'italic' }
        ],
        colors: {
            'editor.background': '#292D3E',
        }
    });
};
