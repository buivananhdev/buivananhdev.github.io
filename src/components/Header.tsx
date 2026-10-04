export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a href="/" className="brand">
          <span className="brand-mark">D</span>
          DevTools Hub
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/tools">Tools</a>
          <a href="/tools/automation/modbus-crc-calculator">CRC-16</a>
        </nav>
      </div>
    </header>
  );
}
