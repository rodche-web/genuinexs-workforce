import Header from '@/components/Header';
import PageDrawer from '@/components/PageDrawer';
import { Box, CssBaseline } from "@mui/material";

export default function RootLayout({children}) {
    return (
        <Box>
            <CssBaseline />
            <Header />
            <PageDrawer />
            <main>{children}</main>
        </Box>
    )
  }