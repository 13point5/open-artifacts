import { Message } from "ai";

export const sampleMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "hello",
  },
  {
    id: "2",
    role: "assistant",
    content: `
Certainly! I'll create an interactive React component to teach linear equations. This component will allow users to adjust the slope and y-intercept of a linear equation and see the resulting line on a graph in real-time.

<antthinking>Creating an interactive React component to teach linear equations is an excellent candidate for an artifact. It's substantial, self-contained, and can be reused in various educational contexts. This is a new request, so I'll create a new artifact with the identifier "linear-equation-interactive".</antthinking>

<antartifact identifier="linear-equation-interactive" type="application/vnd.ant.react" title="Interactive Linear Equation Component">
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const LinearEquationInteractive = () => {
  const [slope, setSlope] = useState(1);
  const [yIntercept, setYIntercept] = useState(0);

  const generateData = () => {
    return Array.from({ length: 11 }, (_, i) => {
      const x = i - 5;
      const y = slope * x + yIntercept;
      return { x, y };
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Interactive Linear Equation</h2>
        <p className="text-gray-600">y = mx + b</p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slope (m): {slope.toFixed(2)}
            </label>
            <Slider
              value={[slope]}
              onValueChange={(value) => setSlope(value[0])}
              min={-5}
              max={5}
              step={0.1}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y-intercept (b): {yIntercept.toFixed(2)}
            </label>
            <Slider
              value={[yIntercept]}
              onValueChange={(value) => setYIntercept(value[0])}
              min={-5}
              max={5}
              step={0.1}
            />
          </div>
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">
            Equation: y = {slope.toFixed(2)}x + {yIntercept.toFixed(2)}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="x"
              domain={[-5, 5]}
              type="number"
              ticks={[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]}
            />
            <YAxis domain={[-10, 10]} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LinearEquationInteractive;
</antartifact>

This interactive component allows users to explore linear equations by adjusting the slope and y-intercept. Here's a breakdown of its features:

1. Two sliders allow users to change the slope (m) and y-intercept (b) of the equation.
2. The current equation is displayed above the graph, updating in real-time as the sliders are adjusted.
3. A line chart shows the resulting line based on the current equation.
4. The x-axis ranges from -5 to 5, and the y-axis adjusts automatically to show the line.

This component helps students visualize how changes in slope and y-intercept affect the line's position and steepness. Users can experiment with different values to see how the line changes, reinforcing their understanding of linear equations.

To use this component, you would import it into a React application and render it like this:

\`\`\`jsx
import LinearEquationInteractive from './LinearEquationInteractive';

function App() {
  return (
    <div className="App">
      <LinearEquationInteractive />
    </div>
  );
}
\`\`\`

Would you like me to explain any part of the code in more detail or suggest ways to extend this interactive component?
    `,
  },
];
