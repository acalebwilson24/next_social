import ContentWrapper from "../components/ContentWrapper"
import { FCWithChildren } from "../types/layoutTypes"
import Feed from "./serverComponents/Feed";
import { Post } from "@prisma/client";
import { Response } from "types/responseTypes";



async function Page() {
    return (
        <div>
            <ContentWrapper>
                <div className="flex">
                    <div className="min-w-[200px]">
                        <CardWrapper>
                            <p>Left Content</p>
                        </CardWrapper>
                    </div>
                    <div className="flex-1">
                        <Feed />
                    </div>
                    <div className="min-w-[200px]">
                        <CardWrapper>
                            <p>Right Content</p>
                        </CardWrapper>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

const CardWrapper: React.FC<FCWithChildren> = ({ children }) => (
    <div className="p-3 rounded-md bg-white">
        {children}
    </div>
)

export default Page