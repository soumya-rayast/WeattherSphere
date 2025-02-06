import { Header } from "./header";

export function Layout({ children }) {
  return (
    <div className="bg-gradient-to-br from-background to-muted dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>WeatherSphere</p>
        </div>
      </footer>
    </div>
  );
}
