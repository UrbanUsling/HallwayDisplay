
import QRCode from 'qrcode.react';

const QRCodeComponent = () => {
    const url = 'http://172.16.16.157:8080/admin/home'; // Your URL here
    return <QRCode value={url} />;
};

export default QRCodeComponent;
