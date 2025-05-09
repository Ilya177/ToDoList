import '@/src/app/styles/globals.css';
import { startCleanupJob } from '@/src/lib/cron';

startCleanupJob();

export const metadata = {
  title: 'ToDo List',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  );
}
