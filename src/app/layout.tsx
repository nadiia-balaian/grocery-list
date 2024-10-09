import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "@/theme";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { Footer } from "@/components/Footer";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Grocery list",
	description: "App allowing users to make their grocery lists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${roboto.variable} antialiased`}
			>
				<ReactQueryProvider>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							{children}
						</ThemeProvider>
					</AppRouterCacheProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
