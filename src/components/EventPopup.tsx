interface EventPopupProps {
  event: any;
  onClose: () => void;
}

export default function EventPopup({ event, onClose }: EventPopupProps) {
  if (!event) return null;

  return (
    <div 
      className="popup-overlay" 
      onClick={onClose}
    >
      <div 
        className="popup-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="popup-close"
          onClick={onClose}
        >
          ×
        </button>
        <img src={event.image} className="popup-image" />
        <h2>{event.title}</h2>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Starts:</strong> {event.startDate}</p>
        <p><strong>Ends:</strong> {event.endDate}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
    </div>
  );
}