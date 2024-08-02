// @flow
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

export const Index = () => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Time series graph</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col h-full w-full"></div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
