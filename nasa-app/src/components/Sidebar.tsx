interface SideBarProps {
    handleToggleModal: () => void;
    data: {
        title?: string;
        date?: string;
        explanation?: string;
    };
}

export default function SideBar({ handleToggleModal, data }: SideBarProps) {
    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{data.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data.date}</p>
                    <p>{data.explanation}</p>
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}