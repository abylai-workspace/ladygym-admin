import React from "react";
import TaskBoard from "../Tasks/components/TaskBoard";

function FinancePlan() {
    return (
        <div>
            <h1
                style={{
                    color: "white",
                    alignSelf: "center",
                    marginRight: "10%",
                    marginBottom: "5%",
                }}
            >
                Финансовый план
            </h1>
            <TaskBoard/>
        </div>
    );
}

export default FinancePlan;
