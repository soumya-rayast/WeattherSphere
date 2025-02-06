import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export function HourlyTemperature({ data }) {
  const chartData =
    data?.list?.slice(0, 8).map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    })) || [];

  return (
    <Card className="flex-1 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Today's Temperature
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                dy={10}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                domain={[
                  Math.min(...chartData.map((d) => d.temp)) - 2,
                  Math.max(...chartData.map((d) => d.temp)) + 2,
                ]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-white dark:bg-gray-800 p-2 shadow-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-500 dark:text-gray-400">
                              Temperature
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {payload[0]?.value}°
                            </span>
                          </div>
                          {payload[1] && (
                            <div className="flex flex-col">
                              <span className="text-xs uppercase text-gray-500 dark:text-gray-400">
                                Feels Like
                              </span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {payload[1]?.value}°
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={true}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={true}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
