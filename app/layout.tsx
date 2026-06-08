import type { Metadata } from "next";
import "./globals.css";
import { Great_Vibes, Playfair_Display, Fredoka, Baloo_2, Cormorant_Garamond, Cinzel, Montserrat, Inter, Poppins } from 'next/font/google';

// Google Fonts
const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const fredoka = Fredoka({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

const baloo2 = Baloo_2({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-baloo-2',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const cinzel = Cinzel({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const montserrat = Montserrat({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Birthday Gift Generator",
  description: "Create beautiful birthday cards with photos, music, and animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${playfairDisplay.variable} ${fredoka.variable} ${baloo2.variable} ${cormorantGaramond.variable} ${cinzel.variable} ${montserrat.variable} ${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
