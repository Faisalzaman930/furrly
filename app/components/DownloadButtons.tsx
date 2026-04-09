import WaitingList from "./WaitingList";

const DownloadButtons = ({ light = false, center = false }: { light?: boolean; center?: boolean }) => {
  return <WaitingList light={light} center={center} />;
};

export default DownloadButtons;
