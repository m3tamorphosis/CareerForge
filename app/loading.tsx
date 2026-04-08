import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-10">
      <Skeleton className="h-16 rounded-3xl" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-[420px] rounded-3xl lg:col-span-2" />
        <Skeleton className="h-[420px] rounded-3xl" />
      </div>
    </div>
  );
}
