import "./globals.css";

export const metadata = {
  title: "Pantry Tracker App",
  description: "Pantry tracker app to keep track of your pantry items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
