import { Card, Metric, Text } from "@tremor/react";

export default function CardStat() {
  return (
    <Card
      className="mx-auto max-w-xs"
      decoration="top"
      decorationColor="indigo"
    >
      <Text>Sales</Text>
      <Metric>$34,743</Metric>
    </Card>
  );
}
