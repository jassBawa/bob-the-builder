import { cn } from "@/lib/utils";

const Badge = ({ status }) => {
  return (
    <div
      className={cn(
        "py-1 px-2 flex items-center gap-2 border bg-[#F8F9FC] rounded-xl max-w-min",
        { "bg-[#ABEFC6]/40": status }
      )}
    >
      <div
        className={cn("h-2 w-2 bg-[#D5D9EB] rounded-full text-inherit", {
          "bg-[#17B26A]": status,
        })}
      ></div>
      <span className="text-xs">{status ? "Active" : "Inactive"}</span>
    </div>
  );
};

export default Badge;
