
const IframeScreen = () => {
    const iframeSrc = "https://prevas.com"; // The URL you want to display in the iframe

    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <iframe
                src={iframeSrc}
                style={{
                    border: "none",
                    height: "100%",
                    width: "100%"
                }}
                title="Embedded Content"
            ></iframe>
        </div>
    );
};

export default IframeScreen;
