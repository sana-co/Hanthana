import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGroup, type Group } from '../services/groupService'
import './GroupPage.css'

function GroupPage() {
  const { groupId = '' } = useParams()
  const [group, setGroup] = useState<Group | null>(null)
  const [serverError, setServerError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadGroup() {
      try {
        setIsLoading(true)
        const response = await getGroup(groupId)

        if (isMounted) {
          setGroup(response.group)
          setServerError('')
        }
      } catch (error) {
        if (isMounted) {
          setServerError(error instanceof Error ? error.message : 'Failed to load group.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadGroup()

    return () => {
      isMounted = false
    }
  }, [groupId])

  if (isLoading) {
    return <div className="group-page-status">Loading group...</div>
  }

  if (serverError || !group) {
    return <div className="group-page-status">{serverError || 'Group not found.'}</div>
  }

  const createdDate = new Date(group.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="group-page">
      <header className="group-page__topbar">
        <Link className="group-page__brand" to="/home">
          Hanthana
        </Link>

        <label className="group-page__search" htmlFor="group-search">
          <SearchIcon />
          <input id="group-search" type="search" placeholder="Search Hanthana" />
        </label>

        <div className="group-page__actions">
          <button className="group-page__create" type="button">
            Create
          </button>
          <button className="group-page__icon" type="button" aria-label="Calendar">
            <CalendarIcon />
          </button>
          <button className="group-page__icon" type="button" aria-label="Notifications">
            <BellIcon />
          </button>
          <div className="group-page__user">Your</div>
        </div>
      </header>

      <main className="group-page__layout">
        <aside className="group-page__sidebar">
          <section className="group-card group-card--profile">
            <div className="group-page__avatar">D</div>
            <div>
              <h2>Dummy Admin</h2>
              <p>@admin</p>
            </div>
          </section>

          <section className="group-card group-card--groups">
            <div className="group-card__heading">
              <h3>Groups</h3>
            </div>
            <p className="group-card__label">Created by you</p>
            <article className="group-list-item is-active">
              <div className="group-list-item__icon">
                <MembersIcon />
              </div>
              <div>
                <h4>{group.groupName}</h4>
                <p>{group.membersCount} members</p>
              </div>
            </article>
          </section>
        </aside>

        <section className="group-page__content">
          <article className="group-hero">
            <div
              className="group-hero__cover"
              style={{ backgroundImage: `url(${group.coverImage})` }}
            >
              <button className="group-hero__cover-action" type="button">
                Edit Cover
              </button>
            </div>

            <div className="group-hero__body">
              <div className="group-hero__badge">
                <MembersIcon />
              </div>

              <div className="group-hero__identity">
                <div>
                  <h1>{group.groupName}</h1>
                  <p>{group.groupTag}</p>
                </div>

                <div className="group-hero__actions">
                  <button className="leave-button" type="button">
                    Leave
                  </button>
                  <button className="more-button" type="button" aria-label="More options">
                    <DotsIcon />
                  </button>
                </div>
              </div>

              <dl className="group-hero__stats">
                <div>
                  <dt>Members</dt>
                  <dd>{group.membersCount}</dd>
                </div>
                <div>
                  <dt>Created</dt>
                  <dd>{createdDate}</dd>
                </div>
                <div>
                  <dt>Privacy</dt>
                  <dd>{group.privacy}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>{group.focus || 'General'}</dd>
                </div>
              </dl>

              <nav className="group-hero__tabs" aria-label="Group tabs">
                <button className="is-active" type="button">Posts</button>
                <button type="button">Files</button>
                <button type="button">Events</button>
                <button type="button">Members</button>
                <button type="button">Photos</button>
              </nav>
            </div>
          </article>

          <section className="composer-card">
            <div className="composer-card__avatar">D</div>
            <input type="text" placeholder="Share something with the group..." />
            <div className="composer-card__actions">
              <button type="button">Photo</button>
              <button type="button">Poll</button>
              <button type="button">Question</button>
              <button type="button">Resource</button>
            </div>
          </section>

          <section className="empty-posts-card">
            <p>No posts yet. Create one to get started.</p>
          </section>
        </section>

        <aside className="group-page__rail">
          <section className="group-card group-card--navigation">
            <h3>Group Navigation</h3>
            <div className="group-nav-grid">
              <button type="button"><HomeIcon /><span>Home</span></button>
              <button type="button"><FolderIcon /><span>File Bank</span></button>
              <button type="button"><NodesIcon /><span>Channels</span></button>
              <button type="button"><MembersIcon /><span>Members</span></button>
              <button type="button"><InfoIcon /><span>Moderation</span></button>
              <button type="button"><RequestsIcon /><span>Requests</span></button>
              <button type="button"><SettingsIcon /><span>Settings</span></button>
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}

function SearchIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg> }
function CalendarIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3.5V7M16 3.5V7M4 10h16" /></svg> }
function BellIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 18h8" /><path d="M6.5 18h11l-1.1-1.5a4 4 0 0 1-.7-2.3V11a4 4 0 1 0-8 0v3.2a4 4 0 0 1-.7 2.3L6.5 18Z" /></svg> }
function HomeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5" /><path d="M10 20v-5h4v5" /></svg> }
function FolderIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3.5 7.5h5l2 2h10v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /></svg> }
function NodesIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="12" r="2" /><circle cx="18" cy="7" r="2" /><circle cx="18" cy="17" r="2" /><path d="M8 12h5M16.3 8.2l-3.7 2.6M12.6 13.2l3.7 2.6" /></svg> }
function MembersIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 18a4 4 0 0 1 8 0" /><circle cx="11" cy="9" r="3" /><path d="M15.5 17a3.5 3.5 0 0 1 5 0" /><circle cx="18" cy="9.5" r="2.5" /></svg> }
function InfoIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><path d="M12 10v5" /><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" /></svg> }
function RequestsIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8v8M12 5v14M18 10v4" /><path d="M4 16h4M10 9h4M16 14h4" /></svg> }
function SettingsIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1L14.3 3h-4.6l-.4 2a8 8 0 0 0-1.7 1l-2.5-1-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1l.4 2h4.6l.4-2a8 8 0 0 0 1.7-1l2.5 1 2-3.4-2-1.6c.1-.3.1-.7.1-1Z" /></svg> }
function DotsIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg> }

export default GroupPage
