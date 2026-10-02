const events: never[] = [];

export function EconomicCalendar() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">📅 Economic Calendar</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="calendar-sec" id="calendarSec">
        <div className="cal-hdr">
          <div>
            <h2 className="sec-title">📅 Economic Calendar</h2>
            <p className="sec-sub">A live economic-event source is not connected. No event times, forecasts, or impact classifications are available.</p>
          </div>
          <div className="cal-live-tag">
            Data unavailable
          </div>
        </div>

        <div className="cal-table">
          <div className="cal-table-hd" role="status">Calendar feed not yet available</div>
        </div>
      </section>
    </>
  );
}
