import MarkdownIt from "markdown-it";

export function convertMarkdownToHtml(markdownContent: string): string {
    const md = new MarkdownIt();
    return md.render(markdownContent);
}
