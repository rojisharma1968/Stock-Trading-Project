
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Database, LineChart, Shield, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About EquityWatch</h1>
        <p className="text-lg dark:text-gray-300 text-gray-600 mb-6">
          Your comprehensive platform for tracking and analyzing stock market data in real-time.
          We provide investors with the tools they need to make informed decisions.
        </p>
      </section>
      
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="dark:text-gray-300">
            At EquityWatch, our mission is to democratize access to financial information and empower individual investors with professional-grade tools and insights. We believe that transparent, accessible market data is essential for making informed investment decisions.
          </p>
          <p className="mt-4 dark:text-gray-300">
            We strive to provide a comprehensive platform that combines real-time market data, intuitive visualization tools, and educational resources to help investors of all experience levels navigate the complexities of the stock market.
          </p>
        </CardContent>
      </Card>
      
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-financial-secondary mb-4 flex justify-center">
                <LineChart className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Real-time Market Data</h3>
              <p className="text-center dark:text-gray-300 text-gray-600">
                Access up-to-date information on stocks, indices, and market trends as they happen.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-financial-secondary mb-4 flex justify-center">
                <BarChart2 className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Advanced Analytics</h3>
              <p className="text-center dark:text-gray-300 text-gray-600">
                Visualize historical performance and key metrics with interactive charts and graphs.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-financial-secondary mb-4 flex justify-center">
                <Zap className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Fast Performance</h3>
              <p className="text-center dark:text-gray-300 text-gray-600">
                Optimized for speed, allowing you to quickly search and analyze thousands of stocks.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-financial-secondary mb-4 flex justify-center">
                <Database className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Comprehensive Database</h3>
              <p className="text-center dark:text-gray-300 text-gray-600">
                Access detailed information on companies, including financials, news, and key metrics.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-financial-secondary mb-4 flex justify-center">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">User-Friendly Interface</h3>
              <p className="text-center dark:text-gray-300 text-gray-600">
                Designed with all users in mind, from beginners to seasoned investors.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-financial-secondary mb-4 flex justify-center">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Data Security</h3>
              <p className="text-center dark:text-gray-300 text-gray-600">
                Your favorites and preferences are stored securely and privately on your device.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 dark:text-gray-300">
            EquityWatch is built using modern web technologies to ensure reliability, performance, and a seamless user experience:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Frontend</h3>
              <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                <li>React for building the user interface</li>
                <li>Tailwind CSS for responsive design</li>
                <li>Recharts for interactive data visualization</li>
                <li>React Query for efficient data fetching</li>
                <li>React Router for navigation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Data Sources</h3>
              <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                <li>Integration with financial market APIs</li>
                <li>Real-time and historical stock data</li>
                <li>Company fundamentals and metrics</li>
                <li>Financial news aggregation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm dark:text-gray-300 text-gray-600">
            EquityWatch provides financial information for educational purposes only and should not be construed as investment advice. Always conduct your own research and consult with a qualified financial advisor before making investment decisions. Stock market investments involve risk and may result in losses.
          </p>
          <p className="mt-4 text-sm dark:text-gray-300 text-gray-600">
            The data provided on this platform is sourced from publicly available APIs and may occasionally contain delays or inaccuracies. We strive for accuracy but cannot guarantee that all information is perfectly up-to-date or error-free.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
