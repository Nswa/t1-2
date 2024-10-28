import type * as Monaco from 'monaco-editor';

export const genesisDarkTheme: Monaco.editor.IStandaloneThemeData = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'operator', foreground: 'ff79c6' },
        { token: 'registration', foreground: '50fa7b' },
        { token: 'envelope.start', foreground: 'bd93f9' },
        { token: 'envelope.end', foreground: 'bd93f9' }
    ],
    colors: {
        'editor.background': '#282a36',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#44475a',
        'editor.selectionBackground': '#44475a',
        'editor.inactiveSelectionBackground': '#44475a70'
    }
};

export function configureGenesisDarkTheme(monaco: typeof Monaco) {
    monaco.editor.defineTheme('genesis-dark', genesisDarkTheme);
}