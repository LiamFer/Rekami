import { Layout, theme } from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  const { token } = theme.useToken();

  return (
    <AntFooter
      style={{
        backgroundColor: token.colorBgBase,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        padding: '40px 20px',
        color: token.colorText,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}
      >
        <div>
          <h2 style={{ marginBottom: 10 }}>Rekami</h2>
          <p>Discover your next favorite Anime, Manga or Movie.</p>
          <p>© {new Date().getFullYear()} LiamFer</p>
        </div>

        <div>
          <h3>Navigation</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/" style={{ color: token.colorText }}>Home</a></li>
            <li><a href="/explore" style={{ color: token.colorText }}>Explore</a></li>
            <li><a href="/favorites" style={{ color: token.colorText }}>Favorites</a></li>
            <li><a href="/profile" style={{ color: token.colorText }}>Profile</a></li>
          </ul>
        </div>

        <div>
          <h3>About</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/about" style={{ color: token.colorText }}>About Us</a></li>
            <li><a href="/contact" style={{ color: token.colorText }}>Contact</a></li>
            <li><a href="/terms" style={{ color: token.colorText }}>Terms of Use</a></li>
            <li><a href="/privacy" style={{ color: token.colorText }}>Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3>Connect</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <a href="mailto:contact@rekami.com" style={{ color: token.colorText }}>
                <MailOutlined /> contact@rekami.com
              </a>
            </li>
            <li style={{ marginTop: 8 }}>
              <a
                href="https://github.com/liamfer"
                target="_blank"
                rel="noreferrer"
                style={{ color: token.colorText }}
              >
                <GithubOutlined /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </AntFooter>
  );
}
