import * as monaco from 'monaco-editor';

monaco.languages.setMonarchTokensProvider('genesis', {
    tokenizer: {
        root: [
            // Registration criteria
            [/^[^~\n]+$/, "registration"],
            [/^~.*$/, "registration"],
            
            // Comments (lines without symbols)
            [/^[^\#~\n]+$/, "comment"],
            
            // Envelope markers
            [/##/, "envelope.start"],
            [/closet/, "envelope.end"],
        ]
    }
});