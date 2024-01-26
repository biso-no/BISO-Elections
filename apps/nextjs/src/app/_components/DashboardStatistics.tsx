"use client";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

import { Card, CardContent } from "~/components/ui/card";

export function DashboardStatistics() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold md:text-2xl">Statistics</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-2">
            <BarChart className="aspect-[4/3] h-64 w-full" />
            <h3 className="font-semibold">Election Statistics</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2">
            <PieChart className="aspect-[4/3] h-64 w-full" />
            <h3 className="font-semibold">Voters Statistics</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2">
            <LineChart className="aspect-[4/3] h-64 w-full" />
            <h3 className="font-semibold">Votes Statistics</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LineChart(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "C",
            data: [
              {
                x: 1,
                y: 283,
              },
              {
                x: 2,
                y: 250,
              },
              {
                x: 3,
                y: 152,
              },
              {
                x: 4,
                y: 294,
              },
              {
                x: 5,
                y: 211,
              },
              {
                x: 6,
                y: 172,
              },
              {
                x: 7,
                y: 24,
              },
              {
                x: 8,
                y: 25,
              },
              {
                x: 9,
                y: 76,
              },
              {
                x: 10,
                y: 5,
              },
            ],
          },
          {
            id: "B",
            data: [
              {
                x: 1,
                y: 43,
              },
              {
                x: 2,
                y: 237,
              },
              {
                x: 3,
                y: 21,
              },
              {
                x: 4,
                y: 35,
              },
              {
                x: 5,
                y: 26,
              },
              {
                x: 6,
                y: 154,
              },
              {
                x: 7,
                y: 181,
              },
              {
                x: 8,
                y: 65,
              },
              {
                x: 9,
                y: 261,
              },
              {
                x: 10,
                y: 199,
              },
            ],
          },
          {
            id: "A",
            data: [
              {
                x: 1,
                y: 240,
              },
              {
                x: 2,
                y: 228,
              },
              {
                x: 3,
                y: 77,
              },
              {
                x: 4,
                y: 178,
              },
              {
                x: 5,
                y: 196,
              },
              {
                x: 6,
                y: 204,
              },
              {
                x: 7,
                y: 153,
              },
              {
                x: 8,
                y: 289,
              },
              {
                x: 9,
                y: 250,
              },
              {
                x: 10,
                y: 274,
              },
            ],
          },
        ]}
        enableCrosshair={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "X",
          legendOffset: 45,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Y",
          legendOffset: -45,
          legendPosition: "middle",
        }}
        colors={{ scheme: "paired" }}
        pointSize={5}
        pointColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointBorderWidth={2}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function BarChart(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {
            name: "A",
            data: 111,
          },
          {
            name: "B",
            data: 157,
          },
          {
            name: "C",
            data: 129,
          },
          {
            name: "D",
            data: 187,
          },
          {
            name: "E",
            data: 119,
          },
          {
            name: "F",
            data: 22,
          },
          {
            name: "G",
            data: 101,
          },
          {
            name: "H",
            data: 83,
          },
        ]}
        keys={["data"]}
        indexBy="name"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Name",
          legendPosition: "middle",
          legendOffset: 45,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number",
          legendPosition: "middle",
          legendOffset: -45,
          truncateTickAt: 0,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function PieChart(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          {
            id: "A",
            value: 634,
          },
          {
            id: "B",
            value: 456,
          },
          {
            id: "C",
            value: 150,
          },
          {
            id: "D",
            value: 258,
          },
          {
            id: "E",
            value: 511,
          },
        ]}
        sortByValue
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        cornerRadius={0}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLabel="id"
        arcLabelsRadiusOffset={0.6}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableArcLinkLabels={false}
        colors={{ scheme: "paired" }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 50,
            itemHeight: 18,
            itemDirection: "left-to-right",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
