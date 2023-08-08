import React from "react";
import {Container, styled} from "@mui/material";
import {useAuth} from "./context/login";
import StatusLegend from "./components/Modal/StatusLegend";

const RootContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: "100vh",
}));

const App = () => {
    const {user, logout} = useAuth();
    const statuses: any = [
        {
            status: 'Pending',
            description:
                'Waiting for approval from the department manager and the project team. This might take a few days due to the ongoing workload and review process. Fingers crossed for a quick response!',
        },
        {
            status: 'In Progress',
            description:
                'Working on the task and making steady progress. Weve encountered a few challenges, but our team is dedicated to resolving them to deliver the best results.',
        },
        {
            status: 'Completed',
            description:
                'Task finished successfully. All deliverables have been met, and the final product is ready for review. Its been a great team effort, and were looking forward to the next project!',
        },
    ];


    return (
        <div>
            <StatusLegend
                type="dot"
                description="Task Statuses:"
                statuses={statuses}
            />
        </div>

    );
};

export default App;
