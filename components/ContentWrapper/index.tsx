import { FCWithChildren } from "../../types/layoutTypes";

type ContentWrapperProps = {
    background?: string;
    textColour?: string;
    bottomMargin?: boolean;
}

const ContentWrapper: React.FC<ContentWrapperProps & FCWithChildren> = ({ background, textColour, bottomMargin, children }) => (
    <div className={`px-4 ${background} ${textColour} ${bottomMargin ? "mb-4" : ""}`}>
        <div className="max-w-[1200px] mx-auto">
            {children}
        </div>
    </div>
)

export default ContentWrapper;