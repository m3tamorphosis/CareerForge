import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCard({ label, value, helper }: { label: string; value: string | number; helper: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
}