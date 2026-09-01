import { Tag } from "lucide-react";

export const TagsList = ({ tags }: { tags: string[] }) => (
  <div>
    <h4 className="font-bold mb-3 text-sm">Tags</h4>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs"
        >
          <Tag className="w-3 h-3" />
          {tag}
        </span>
      ))}
    </div>
  </div>
);
