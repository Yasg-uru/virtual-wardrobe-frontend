"use client";

import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { IClothItem } from "@/types/clothState";
import { aggregateWardrobeData } from "./aggregatte-data-utility";

interface VirtualWardrobeChartProps {
  items: IClothItem[];
}

const chartThemes = {
  ruby: {
    name: "Ruby",
    stroke: "hsl(336, 80%, 46%)",
    fill: "hsl(339, 87%, 70%)",
  },
  emerald: {
    name: "Emerald",
    stroke: "hsl(160, 84%, 39%)",
    fill: "hsl(160, 84%, 49%)",
  },
  sapphire: {
    name: "Sapphire",
    stroke: "hsl(217, 91%, 60%)",
    fill: "hsl(217, 91%, 70%)",
  },
  amethyst: {
    name: "Amethyst",
    stroke: "hsl(270, 95%, 75%)",
    fill: "hsl(270, 95%, 85%)",
  },
  topaz: {
    name: "Topaz",
    stroke: "hsl(47, 95%, 55%)",
    fill: "hsl(47, 95%, 65%)",
  },
} as const;

type ThemeKey = keyof typeof chartThemes;
type ChartType = "radar" | "area" | "line" | "bar" | "pie";

export default function VirtualWardrobeChart({
  items,
}: VirtualWardrobeChartProps) {
  const aggregatedData = aggregateWardrobeData(items);
  const [selectedMetric, setSelectedMetric] =
    useState<string>("itemsPerCategory");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("ruby");
  const [selectedChartType, setSelectedChartType] =
    useState<ChartType>("radar");

  const metrics = {
    itemsPerCategory: {
      label: "Items per Category",
      data: aggregatedData.itemsPerCategory,
    },
    colorDistribution: {
      label: "Color Distribution",
      data: aggregatedData.colorDistribution,
    },
    seasonSuitability: {
      label: "Season Suitability",
      data: aggregatedData.seasonSuitability,
    },
    weatherSuitability: {
      label: "Weather Suitability",
      data: aggregatedData.weatherSuitability,
    },
    brandDistribution: {
      label: "Brand Distribution",
      data: aggregatedData.brandDistribution,
    },
    conditionBreakdown: {
      label: "Condition Breakdown",
      data: aggregatedData.conditionBreakdown,
    },
    totalSpendingPerCategory: {
      label: "Total Spending per Category",
      data: aggregatedData.totalSpendingPerCategory,
    },
  };

  const chartData = Object.entries(
    metrics[selectedMetric as keyof typeof metrics].data
  ).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const chartConfig: ChartConfig = {
    value: {
      label: metrics[selectedMetric as keyof typeof metrics].label,
      color: chartThemes[selectedTheme].stroke,
    },
  };

  const renderChart = () => {
    switch (selectedChartType) {
      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid
              strokeDasharray="3 3"
              className="stroke-muted-foreground/20"
            />
            <PolarAngleAxis
              dataKey="name"
              className="fill-muted-foreground text-sm"
            />
            <PolarRadiusAxis className="fill-muted-foreground" />
            <Radar
              name={metrics[selectedMetric as keyof typeof metrics].label}
              dataKey="value"
              stroke={chartThemes[selectedTheme].stroke}
              fill={chartThemes[selectedTheme].fill}
              fillOpacity={0.6}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        );
      case "area":
        return (
          <AreaChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted-foreground/20"
            />
            <XAxis dataKey="name" className="fill-muted-foreground text-sm" />
            <YAxis className="fill-muted-foreground text-sm" />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartThemes[selectedTheme].stroke}
              fill={chartThemes[selectedTheme].fill}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </AreaChart>
        );
      case "line":
        return (
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted-foreground/20"
            />
            <XAxis dataKey="name" className="fill-muted-foreground text-sm" />
            <YAxis className="fill-muted-foreground text-sm" />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartThemes[selectedTheme].stroke}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted-foreground/20"
            />
            <XAxis dataKey="name" className="fill-muted-foreground text-sm" />
            <YAxis className="fill-muted-foreground text-sm" />
            <Bar dataKey="value" fill={chartThemes[selectedTheme].fill} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill={chartThemes[selectedTheme].fill}
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartThemes[selectedTheme].fill}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl dark:bg-black">
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Virtual Wardrobe Analysis</CardTitle>
            <CardDescription>
              Visualize your wardrobe statistics
            </CardDescription>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div>
              <Label className="mb-2 block">Theme</Label>
              <RadioGroup
                defaultValue={selectedTheme}
                onValueChange={(value) => setSelectedTheme(value as ThemeKey)}
                className="flex flex-wrap gap-2"
              >
                {Object.entries(chartThemes).map(([key, theme]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={key}
                      id={`theme-${key}`}
                      className="border-2"
                      style={{
                        backgroundColor: theme.fill,
                        borderColor: theme.stroke,
                      }}
                    />
                    <Label htmlFor={`theme-${key}`} className="text-sm">
                      {theme.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label className="mb-2 block">Chart Type</Label>
              <RadioGroup
                defaultValue={selectedChartType}
                onValueChange={(value) =>
                  setSelectedChartType(value as ChartType)
                }
                className="flex flex-wrap gap-2"
              >
                {["radar", "area", "line", "bar", "pie"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`chart-${type}`} />
                    <Label
                      htmlFor={`chart-${type}`}
                      className="text-sm capitalize"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Select
            onValueChange={(value) => setSelectedMetric(value)}
            defaultValue={selectedMetric}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a metric" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metrics).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-6 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Average Wear Count: {aggregatedData.averageWearCount.toFixed(2)}
          </p>
          <p className="text-muted-foreground">
            Total Items:{" "}
            {Object.values(aggregatedData.itemsPerCategory).reduce(
              (a, b) => a + b,
              0
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
