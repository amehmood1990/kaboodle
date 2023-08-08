// StatusLegend.tsx
import React from 'react';
import './StatusLegend.scss';

interface Status {
    status: string;
    description: string;
}

interface StatusBoxProps {
    description: string;
    statuses: Status[];
    type: 'dot' | 'label';
}

const StatusDotChip = () => {
    return <span className="dot-chip"></span>;
};

interface StatusLabelChipProps {
    label: string;
}

const StatusLabelChip: React.FC<StatusLabelChipProps> = ({ label }) => {
    return <span className="label-chip">{label}</span>;
};

const StatusLegend: React.FC<StatusBoxProps> = ({ description, statuses, type }) => {
    return (
        <div className="status-box">
            <p className="description">{description}</p>
            <div className="status-container">
                {statuses.map((status, index) => (
                    <div key={index} className="status-list">
                        <div className="list-chip">
                            {type === 'dot' ? <StatusDotChip /> : <StatusLabelChip label={status.status} />}
                        </div>
                        <div className="list-text">
                            <span className="status-description">{status.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusLegend;
