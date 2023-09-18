const Header: React.FC = () => {
  return (
    <header>
      <div id="header-wrapper">
        <div id="header-logo">Mesh's CV</div>
        <div id="header-links">
          <a href="/pdfs/cv.pdf" target="_blank" className="header-link">Download</a>
          <span className="header-link">Contact</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
