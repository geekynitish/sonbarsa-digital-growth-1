import ReactMarkdown from "react-markdown";

export const ArticleMarkdown = ({ content }: { content: string }) => (
  <article className="prose prose-lg max-w-none">
    <ReactMarkdown
      components={{
        h2: ({children}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">{children}</h2>,
        h3: ({children}) => <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">{children}</h3>,
        h4: ({children}) => <h4 className="text-lg font-semibold mt-6 mb-2 text-foreground">{children}</h4>,
        p: ({children}) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
        ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ol>,
        li: ({children}) => <li className="text-muted-foreground">{children}</li>,
        strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
        a: ({href, children}) => <a href={href} className="text-primary hover:underline">{children}</a>,
        blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{children}</blockquote>,
        table: ({children}) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse">{children}</table></div>,
        th: ({children}) => <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">{children}</th>,
        td: ({children}) => <td className="border border-border px-4 py-2">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  </article>
);
