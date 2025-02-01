import '@/styles/global.css';

export const metadata = {
  title: 'News Analytics',
  description: 'Stay updated with the latest news!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
