import ContentWrapper from "../components/ContentWrapper";
import { FCWithChildren } from "../types/layoutTypes";
import "./global.css";
import Navbar from "./serverComponents/Navbar";
import AuthContext from "./clientComponents/AuthContext";
import ReduxContext from "./clientComponents/ReduxContext";

const HomeLayout: React.FC<FCWithChildren> = ({ children }) => {
    return (
        <AuthContext>
            <ReduxContext>
                <html lang="en">
                    <head>
                        <meta charSet="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Get Social</title>
                    </head>
                    <body className="flex flex-col min-h-screen">
                        <ContentWrapper background="bg-violet-700" textColour="text-white" bottomMargin>
                            <Navbar />
                        </ContentWrapper>
                        <main className="flex-1">
                            {children}
                        </main>
                    </body>
                </html>
            </ReduxContext>
        </AuthContext>
    )
}



export default HomeLayout;