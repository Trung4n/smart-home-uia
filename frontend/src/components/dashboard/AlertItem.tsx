import './AlertItem.css'
interface AlertProps {
  type: string;
  msg: string;
  time: string;
}

export default function AlertItem({ type, msg, time }: AlertProps) {
  return (
    <div className="notif-item">
      <div className={`notif-dot ${type}`}></div>
      
      <div className="notif-body">
        <div className="notif-msg">{msg}</div>
        <div className="notif-time">{new Date(time).toLocaleString('vi-VN')}</div>
      </div>
      <div className={`notif-type-tag tag-${type}`}>
        {type}
      </div>
    </div>
  );
};