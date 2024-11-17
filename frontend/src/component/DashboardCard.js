import React from "react";

const DashboardCard = ({number, text, icon, link}) => {
    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        borderStart: '1px solid',
        borderEnd: '1px solid',
        borderRadius: '0.25rem',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
        marginBottom: '1rem',
        width: '100%',
        transition: 'transform 0.2s, background-color 0.2s',
        textDecoration: 'none',
        color: 'inherit'
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
        backgroundColor: '#f0f0f0'
    };

    return (
        <a
            href={link}
            className="dashboard-card"
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.backgroundColor = cardHoverStyle.backgroundColor;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '';
            }}
        >
            <div>
                <h1 className="m-0 fw-bold">{number}</h1>
                <p className="text-muted m-0">{text}</p>
            </div>
            <div className="icon-container">
                <span className="fs-4">{icon}</span>
            </div>
        </a>
    );
};

export default DashboardCard;