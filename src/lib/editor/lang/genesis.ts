export const setupGenesisLanguage = (monaco: any) => {
    monaco.languages.register({ id: 'genesis' });

    monaco.languages.setMonarchTokensProvider('genesis', {
        tokenizer: {
            root: [
                // Empty line with just ~
                [/^~\s*$/, 'atom.marker.inactive'],
                // Active atom marker with content
                [/^~(?=.*\S)/, 'atom.marker.active'],
                
                // Envelope (content within brackets)
                [/\[/, { token: 'envelope.open', next: '@envelope' }],
                
                // Regular atom content
                [/[^~\[\]]+/, 'atom.content'],
            ],
            
            envelope: [
                // Close bracket returns to root state
                [/\]/, { token: 'envelope.close', next: '@pop' }],
                // Content inside envelope
                [/[^\]]+/, 'envelope.content'],
            ]
        }
    });

    // Define theme rules
    const theme = {
        base: 'vs', // Changed from 'vs-dark' to 'vs' for light theme
        inherit: true,
        rules: [
            { token: 'atom.marker.active', foreground: 'E53935' },  // Darker red
            { token: 'atom.marker.inactive', foreground: '9E9E9E', fontStyle: 'italic' }, // Gray
            { token: 'atom.content', foreground: '000000' },  // Black
            { token: 'envelope.open', foreground: '0277BD' },  // Blue
            { token: 'envelope.close', foreground: '0277BD' },  // Blue
            { token: 'envelope.content', foreground: '01395a', fontStyle: 'bold' }  // Green
        ],
        colors: {
            'editor.background': '#FFFFFF',
            'editor.foreground': '#000000',
            'editorLineNumber.foreground': '#9E9E9E',
            'editorCursor.foreground': '#000000',
            'editor.selectionBackground': '#E3F2FD',
            'editor.lineHighlightBackground': '#F5F5F5'
        }
    };

    // Register the theme
    monaco.editor.defineTheme('genesis-theme', theme);

    // Set as default theme
    monaco.editor.setTheme('genesis-theme');
};
