type props = {
    onClick?: () => void;
    className?: string;
    firstname: string;
    lastname: string;
    role: string;
    position: string;
}

export const Participants = ({ onClick, className, firstname, lastname, role, position }: props) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`flex flex-col min-w-fit px-3 py-1 border  rounded-2xl text-sm font-medium hover:bg-[#D0E4FF] transition-all duration-150 items-start ${className} text-[#052659]`}
        >
            <p className="text-xs text-gray-400">Send to:</p>
            <span>{firstname} {lastname}</span>
            <p className=" text-gray-500 text-[10px] text-center">{role} | {position} </p>
        </button>
    );
};