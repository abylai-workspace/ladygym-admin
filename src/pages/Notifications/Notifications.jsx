import React from "react";
import TabPersonal from "./components/TabPersonal";
import TabClients from "./components/TabClients";
import RaitingsTab from "./components/RaitingsTab";
import Tabs from "./components/Tabs";
import Freezing from "./components/Freezing";

const Notifications = () => {
  const tabs = [
    {
      title: "Персонал",
      content: <TabPersonal />,
    },
    {
      title: "Клиенты",
      content: <TabClients />,
    },
    {
      title: "Оценки",
      content: <RaitingsTab />,
    },
    {
      title: "Заморозки",
      content: <Freezing />,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} defaultTab={0} />
    </div>
  );
};

export default Notifications;
