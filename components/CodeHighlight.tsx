import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


interface CodeBlockProps {
    myCode: string;
    language: string;
}

export default function CodeBlock({ myCode, language }: CodeBlockProps) {
    // const myCode = "console.log('Hello World!')";
    const myHtml = hljs.highlight(myCode, { language: 'javascript' }).value;
    return (
        <pre>
            <code dangerouslySetInnerHTML={{ __html: myHtml }} />
        </pre>
    );
}