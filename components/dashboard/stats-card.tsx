import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCard({ label, value, helper }: { label: string; value: string | number; helper: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <Badge variant="secondary" className="w-fit">{label}</Badge>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
}
