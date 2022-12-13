const Button: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { buttonType?: "primary" | "secondary" | "danger" }> = ({ children, className, buttonType, ...props }) => {
    let bgColour = "bg-violet-700";
    if (buttonType === "secondary") bgColour = "bg-slate-300";
    if (buttonType === "danger") bgColour = "bg-red-500";

    return (
        <button className={`${bgColour} text-white rounded-md px-3 py-1 hover:bg-violet-800 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;