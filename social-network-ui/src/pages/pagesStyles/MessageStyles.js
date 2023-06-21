export const leftBlockAndRightBlockContainer = {
    display: "flex",
  };
  
  export const leftBlockInboxAndSearch = {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "520px",
    height:"100vh",
  };
  
  export const inboxContainerStyle = {
    overflowY: "scroll",
    width: "100%",
    height:"100vh",
    margin: "0 auto",
  };
  
  export const textingContainerWithInputStyle = {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    maxHeight: "calc(100vh - 120px)",
    height: "calc(100vh - 120px)",
    width: "50%",
    position: "relative",
  };
  
  export const textingContainerWithScroll = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "0 20px",
    boxSizing: "border-box",
    height: "40px",
  };
  
  export const textingConatinerScrollFromBottom = {
    display: "flex",
    overflowY: "scroll",
    height:"90vh",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
    flexDirection: "column-reverse", // Доданий стиль для прокрутки знизу вгору
  };

  export const textingConatinerScrollFromTop = {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    maxHeight: "calc(100vh - 160px)",
    height: "calc(100vh - 160px)",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box"
  };
  