import { Link } from '../routes';

export default () => (
  <div>
    <h3>Homepage</h3>
    <p>Sample next.js + next-routes SSRs</p>
    <Link route="about">
      <a>About</a>
    </Link>
    |
    <Link route="article" params={{ slug: 'article-1' }}>
      <a>Article 1</a>
    </Link>
    |
    <Link route="blog" params={{ slug: 'article-2' }}>
      <a>Article 2</a>
    </Link>
    <Link route="testlang" params={{ countryCode: 'th', lang: 'th' }}>
      <a>testlang</a>
    </Link>
  </div>
);
