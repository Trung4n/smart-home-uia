import { useEffect, useState } from "react";
import "./notifications.css";
import type { Alert } from "../../types/alert";

type MainNotificationsProps = {
  alerts: Alert[];
  selectedIds: number[];
  allVisibleSelected: boolean;
  bulkActive: boolean;
  onToggleSelect: (notificationId: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onMarkSelectedRead: () => void;
  onDeleteSelected: () => void;
  onOpenModal: (alert: Alert) => void;
  onMarkRead: (notificationId: number) => void;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLoadMore: () => void;
  pageSummary: string;
  isSaving: boolean;
  deviceNames: Record<number, string>;
};

const typeMeta: Record<Exclude<Alert["notification_type"], undefined>, { icon: string; badge: string; label: string }> = {
  alert: { icon: "fa-triangle-exclamation", badge: "badge-alert", label: "Alert" },
  intrusion: { icon: "fa-user-secret", badge: "badge-intrusion", label: "Intrusion" },
  device: { icon: "fa-sliders", badge: "badge-device", label: "Device" },
  system: { icon: "fa-gear", badge: "badge-system", label: "System" },
};

export default function MainNotifications({
  alerts,
  selectedIds,
  allVisibleSelected,
  bulkActive,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onMarkSelectedRead,
  onDeleteSelected,
  onOpenModal,
  onMarkRead,
  currentPage,
  pageCount,
  onPageChange,
  onPrevPage,
  onNextPage,
  onLoadMore,
  pageSummary,
  isSaving,
  deviceNames,
}: MainNotificationsProps) {
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const handleJumpToPage = () => {
    const nextPage = Number.parseInt(pageInput, 10);
    if (Number.isNaN(nextPage)) return;
    onPageChange(nextPage);
  };

  return (
    <div className="notif-layout">
      <div className={`bulk-bar ${bulkActive ? "visible" : ""}`}>
        <div className="bulk-select-all" onClick={onSelectAll}>
          <div className={`bulk-checkbox ${allVisibleSelected ? "checked" : ""}`}>
            <i className="fa-solid fa-check"></i>
          </div>
          <span>Select All</span>
        </div>

        <span className="bulk-count">{selectedIds.length} selected</span>

        <div className="bulk-sep"></div>

        <button className="bulk-btn" type="button" onClick={onMarkSelectedRead} disabled={isSaving}>
          <i className="fa-solid fa-check-double"></i> Mark Read
        </button>

        <button className="bulk-btn danger" type="button" onClick={onDeleteSelected} disabled={isSaving}>
          <i className="fa-solid fa-trash"></i> Delete Read
        </button>

        <div className="bulk-spacer"></div>

        <button
          className="bulk-btn"
          type="button"
          style={{ fontSize: "9px", padding: "5px 10px" }}
          onClick={onClearSelection}
          disabled={isSaving}
        >
          <i className="fa-solid fa-xmark"></i> Cancel
        </button>
      </div>

      <div className="notif-list-wrap">
        {alerts.length ? (
          alerts.map((alert) => {
            const meta = typeMeta[alert.notification_type as keyof typeof typeMeta] ?? {
              icon: "fa-bell",
              badge: "badge-system",
              label: alert.notification_type,
            };
            const selected = selectedIds.includes(alert.notification_id);
            const deviceLabel = alert.device_id ? deviceNames[alert.device_id] ?? `Device ${alert.device_id}` : "No device linked";
            return (
              <article
                key={alert.notification_id}
                className={`notif-item ${alert.is_read ? "" : "unread"} type-${alert.notification_type} ${selected ? "selected" : ""}`}
                onClick={() => onOpenModal(alert)}
              >
                <div className={`notif-checkbox ${selected ? "checked" : ""}`} onClick={(event) => {
                  event.stopPropagation();
                  onToggleSelect(alert.notification_id);
                }}>
                  <i className="fa-solid fa-check"></i>
                </div>

                <div className={`notif-icon ${alert.notification_type}`}>
                  <i className={`fa-solid ${meta.icon}`}></i>
                </div>

                <div className="notif-body">
                  <div className="notif-title-row">
                    <div className="notif-title">{alert.title || alert.description}</div>
                    <span className={`notif-type-badge ${meta.badge}`}>{meta.label}</span>
                  </div>

                  <div className="notif-preview">{alert.description}</div>

                  <div className="notif-meta">
                    <span className="notif-device">{deviceLabel}</span>
                    <span className="notif-time">{new Date(alert.created_at).toLocaleString()}</span>
                    {!alert.is_read && <span className="notif-unread-dot" />}
                  </div>
                </div>

                <div className="notif-actions">
                  {!alert.is_read && (
                    <button
                      className="btn-mark-read"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onMarkRead(alert.notification_id);
                      }}
                      disabled={isSaving}
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-state visible">
            <i className="fa-solid fa-bell-slash"></i>
            <h3>No Notifications</h3>
            <p>All clear — nothing matches your current filters.</p>
          </div>
        )}
      </div>

      <div className="pagination-bar">
        <span className="page-info">Page {currentPage} of {pageCount}</span>

        <button className="page-btn" type="button" onClick={onPrevPage} disabled={currentPage <= 1}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className="page-jump-group">
          <input
            id="notification-page-input"
            className="page-jump-input"
            type="number"
            min={1}
            max={pageCount}
            value={pageInput}
            onChange={(event) => setPageInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleJumpToPage();
              }
            }}
            disabled={pageCount <= 1}
            aria-label="Jump to page"
          />
        </div>



        <button className="page-btn" type="button" onClick={onNextPage} disabled={currentPage >= pageCount}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <button className="btn-load-more" type="button" onClick={onLoadMore} disabled={currentPage >= pageCount}>
          <i className="fa-solid fa-rotate-right"></i> Load More
        </button>

        <div className="pag-spacer"></div>

        <span className="pag-summary">{pageSummary}</span>
      </div>
    </div>
  );
}

