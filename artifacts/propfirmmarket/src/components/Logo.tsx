export function Logo({ size = 44 }: { size?: number }) {
  const textScale = size / 44;

  return (
    <div
      className="pfm-logo"
      style={{ '--logo-scale': textScale } as React.CSSProperties}
      aria-label="PropFirmMarket"
    >
      <img
        src="/pfm-logo-3d.png"
        alt="PropFirmMarket"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: 10,
          display: 'block',
          filter: 'drop-shadow(0 2px 8px rgba(0,232,123,0.35))',
        }}
      />

      <div className="pfm-logo-text">
        <span className="pfm-logo-name">propfirm</span>
        <span className="pfm-logo-market">MARKET</span>
      </div>
    </div>
  );
}
