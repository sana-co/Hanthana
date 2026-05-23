import { useState } from 'react'
import './Home.css'


const navItems = [
  { label: 'My Feed', active: true, badge: undefined, icon: <HomeIcon /> },
  { label: 'Discover', active: false, badge: undefined, icon: <CompassIcon /> },
  { label: 'Events', active: false, badge: undefined, icon: <CalendarIcon /> },
  { label: 'Q&A', active: false, badge: undefined, icon: <FlameIcon /> },
  { label: 'Dashboard', active: false, badge: '10', icon: <DashboardIcon /> },
]

const posts = [
  {
    author: 'jamalC',
    group: 'Campus Mentors Network',
    publishedAt: '2026-02-04 20:10:00',
    title: 'Untitled Resource',
    body: 'Uploaded mentorship session checklist and reflection prompts for week 2 mentee meetings.',
    upvotes: 3,
    downvotes: 1,
    comments: 1,
  },
  {
    author: 'mayalee',
    group: 'STEM Study Circle',
    publishedAt: '2026-02-02 15:35:00',
    title: 'Untitled Resource',
    body: 'Shared annotated calculus workbook aligned with week 3 engineering tutorials. Track your problem-solving attempts and note misconceptions for review.',
    upvotes: 5,
    downvotes: 0,
    comments: 2,
  },
]

function Home() {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="home-page">
      <header className="home-topbar">
        <div className="home-brand">Hanthana</div>

        <label className="home-search" htmlFor="home-search">
          <SearchIcon />
          <input id="home-search" type="search" placeholder="Search Hanthana" />
        </label>

        <div className="home-actions">
          <button className="create-button" type="button">
            Create
          </button>
          <button className="icon-action" type="button" aria-label="Calendar">
            <CalendarIcon />
          </button>
          <button className="icon-action" type="button" aria-label="Notifications">
            <BellIcon />
          </button>
          <button className="profile-chip" type="button">
            <span className="profile-chip__avatar" aria-hidden="true">
              Y
            </span>
            <span>Your</span>
          </button>
        </div>
      </header>

      <main className="home-layout">
        <aside className="home-sidebar">
          <section className="panel profile-panel">
            <div className="profile-avatar">
              <UserIcon />
            </div>
            <div>
              <h2>WIJAYARATHNA GS</h2>
              <p>@2023cs26</p>
            </div>
          </section>

          <nav className="panel side-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`side-nav__item ${item.active ? 'is-active' : ''}`}
                type="button"
              >
                <span className="side-nav__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge ? <span className="side-nav__badge">{item.badge}</span> : null}
              </button>
            ))}
          </nav>

          <section className="panel groups-panel">
            <div className="panel-heading">
              <h3>Groups</h3>
              <button className="round-action" type="button" aria-label="Add group" onClick={ ()=>  setShowForm(true)}>
                +
              </button>
            {showForm && (
              <form>
                <input type="text" placeholder="Enter name" />
                <button type="submit">Submit</button>
              </form>
            )}
            </div>
            <p>You haven&apos;t joined or created any groups yet.</p>
            <button className="secondary-button" type="button">
              See All Groups
            </button>
          </section>
        </aside>

        <section className="feed-column" aria-label="Feed">
          {posts.map((post) => (
            <article className="panel post-card" key={`${post.author}-${post.publishedAt}`}>
              <div className="post-header">
                <div className="post-header__identity">
                  <div className="post-avatar">
                    <UserIcon />
                  </div>
                  <div>
                    <h3>
                      {post.author} <span>&rsaquo; {post.group}</span>
                    </h3>
                    <p>{post.publishedAt}</p>
                  </div>
                </div>
                <button className="icon-action more-button" type="button" aria-label="More">
                  <MoreIcon />
                </button>
              </div>

              <div className="post-body">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>

              <footer className="post-footer">
                <div className="vote-group">
                  <button className="vote-button" type="button" aria-label="Upvote">
                    <ArrowUpIcon />
                  </button>
                  <span>{post.upvotes}</span>
                  <button className="vote-button is-active" type="button" aria-label="Downvote">
                    <ArrowDownIcon />
                  </button>
                  <span>{post.downvotes}</span>
                </div>

                <div className="comment-meta">
                  <CommentIcon />
                  <span>{post.comments} comments</span>
                </div>
              </footer>
            </article>
          ))}
        </section>

        <aside className="right-rail">
          <section className="panel utility-panel">
            <div className="panel-heading">
              <h3>Messages</h3>
              <button className="icon-action" type="button" aria-label="Compose message">
                <EditIcon />
              </button>
            </div>

            <label className="utility-search" htmlFor="messages-search">
              <SearchIcon />
              <input
                id="messages-search"
                type="search"
                placeholder="Search messages"
              />
            </label>

            <p className="empty-state">No messages yet</p>
          </section>

          <section className="panel utility-panel">
            <div className="panel-heading">
              <h3>Friend Requests</h3>
            </div>
            <p className="empty-state">No pending friend requests</p>
          </section>
        </aside>
      </main>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 9.5V20h11V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="m14.8 9.2-2.1 5.6-5.5 2.1 2.1-5.6 5.5-2.1Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3.5V7M16 3.5V7M4 10h16" />
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14.5 3.5c.6 3-1.4 4.6-2.7 6.1-1.5 1.8-1.7 4.2-.2 5.9.5.6 1.1 1 1.9 1.3-3 .6-6-1.3-6.7-4.4-.7-3 1-5.1 2.9-7.2 1.6-1.8 2.6-3 2.7-5.2.9.7 1.6 1.8 2.1 3.5Z" />
      <path d="M14.5 12.7c1.8.9 3 2.6 3 4.6A4.7 4.7 0 0 1 12.8 22a4.8 4.8 0 0 1-4.8-4.7c0-1.4.6-2.6 1.6-3.5" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 16.5a7.5 7.5 0 1 1 15 0" />
      <path d="M12 12l3.2 3.2" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 18h8" />
      <path d="M6.5 18h11l-1.1-1.5a4 4 0 0 1-.7-2.3V11a4 4 0 1 0-8 0v3.2a4 4 0 0 1-.7 2.3L6.5 18Z" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6.5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="17.5" cy="12" r="1.5" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 6-5 5" />
      <path d="m12 6 5 5" />
      <path d="M12 6v12" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 18-5-5" />
      <path d="m12 18 5-5" />
      <path d="M12 6v12" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 3v-5a7.5 7.5 0 1 1 16-5.5Z" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4l9.5-9.5-4-4L4 16v4Z" />
      <path d="m12.5 6.5 4 4" />
      <path d="M14.5 4.5 17 2a2.1 2.1 0 0 1 3 3l-2.5 2.5" />
    </svg>
  )
}

export default Home
