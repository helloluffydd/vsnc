import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  link: string;
}

const QRCode: React.FC<QRCodeProps> = ({ link }) => {
  return <QRCodeSVG value={link} size={500} marginSize={2} />;
};

export default QRCode;
