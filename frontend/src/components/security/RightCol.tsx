import type { SecurityClip } from "../../types/security";

export type SecurityMotionTone = "watching" | "detecting" | "disabled";

interface RightColProps {
  cameraActive: boolean;
  captureBusy: boolean;
  captureMessage: string | null;
  clips: SecurityClip[];
  lastEventLabel: string;
  loading: boolean;
  motionLabel: string;
  motionStatusLabel: string;
  motionSub: string;
  motionTone: SecurityMotionTone;
  onCaptureFace: () => void;
  onOwnerNameChange: (value: string) => void;
  onPlayClip: (clipId: string) => void;
  ownerName: string;
  triggerCount: number;
}

function getMotionIconClass(tone: SecurityMotionTone) {
  if (tone === "detecting") {
    return "fa-solid fa-person-running";
  }

  if (tone === "watching") {
    return "fa-solid fa-eye";
  }

  return "fa-solid fa-eye-slash";
}

export default function RightCol({
  cameraActive,
  captureBusy,
  captureMessage,
  clips,
  lastEventLabel,
  loading,
  motionLabel,
  motionStatusLabel,
  motionSub,
  motionTone,
  onCaptureFace,
  onOwnerNameChange,
  onPlayClip,
  ownerName,
  triggerCount,
}: RightColProps) {
  const captureDisabled = captureBusy || !cameraActive || !ownerName.trim();

  return (
    <div className="right-col">
      <div className="right-panel-wrap">
        <div className="motion-card">
          <div className="mc-row">
            <div className={`mc-icon ${motionTone}`}>
              <i className={getMotionIconClass(motionTone)}></i>
            </div>

            <div>
              <div className="mc-label">{motionLabel}</div>
              <div className="mc-sub">{motionSub}</div>
            </div>

            <div className={`mc-status ${motionTone}`}>{motionStatusLabel}</div>
          </div>

          <div className="mc-stats">
            <div className="mc-stat">
              <span className="mc-stat-label">Today's Triggers</span>
              <span className="mc-stat-val">{triggerCount}</span>
            </div>

            <div className="mc-stat">
              <span className="mc-stat-label">Last Event</span>
              <span className="mc-stat-val">{lastEventLabel}</span>
            </div>
          </div>
        </div>

        <div className="face-panel">
          <div className="panel-head">
            <div className="panel-title">
              <span>Register Face</span>
            </div>
          </div>

          <div className="face-body">
            <label className="face-label" htmlFor="owner-name-input">
              Owner Name
            </label>
            <input
              id="owner-name-input"
              className="face-input"
              type="text"
              value={ownerName}
              placeholder="e.g. Steve"
              onChange={(event) => onOwnerNameChange(event.target.value)}
              disabled={captureBusy}
            />

            <button
              className="btn-capture-face"
              onClick={onCaptureFace}
              disabled={captureDisabled}
            >
              <i className="fa-solid fa-camera-retro"></i>
              {captureBusy ? "Capturing..." : "Capture Face"}
            </button>

            <div className="face-hint">
              {!cameraActive
                ? "Enable the camera to capture a face."
                : "Position the face in the frame, then capture."}
            </div>

            {captureMessage && (
              <div className="face-status">{captureMessage}</div>
            )}
          </div>
        </div>

        <div className="video-panel">
          <div className="panel-head">
            <div className="panel-title">Recorded Clips</div>
          </div>

          <div className="video-list">
            {!loading && clips.length === 0 && (
              <div className="security-empty-state">
                Start a recording or wait for motion events to build the clip list.
              </div>
            )}

            {clips.map((clip, index) => (
              <div
                className={`video-item ${clip.source === "backend" ? "video-item-backend" : ""}`}
                key={clip.id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="video-thumb">
                  <i className={`fa-solid ${clip.playable ? "fa-film" : "fa-wave-square"}`}></i>
                </div>

                <div className="video-meta">
                  <div className="video-name">{clip.name}</div>
                  <div className="video-info">
                    {new Date(clip.createdAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | {clip.durationLabel} | {clip.sizeLabel}
                  </div>
                </div>

                <div className="video-actions">
                  <button
                    className="vid-btn play-btn"
                    disabled={!clip.playable}
                    onClick={() => onPlayClip(clip.id)}
                    title={clip.playable ? "Play" : "No playable file"}
                  >
                    <i className="fa-solid fa-play"></i>
                  </button>

                  {clip.playable && clip.url ? (
                    <a className="vid-btn" href={clip.url} download={clip.name} title="Download">
                      <i className="fa-solid fa-download"></i>
                    </a>
                  ) : (
                    <button className="vid-btn" disabled title="No downloadable file">
                      <i className="fa-solid fa-download"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
