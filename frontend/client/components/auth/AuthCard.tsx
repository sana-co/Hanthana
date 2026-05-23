import type { ReactNode } from 'react'

type AuthCardProps = {
  titleId: string
  title: string
  subtitle: string
  badge?: string
  cardClassName?: string
  headerClassName?: string
  children: ReactNode
}

function AuthCard({
  titleId,
  title,
  subtitle,
  badge,
  cardClassName,
  headerClassName,
  children,
}: AuthCardProps) {
  const sectionClassName = ['auth-card', cardClassName].filter(Boolean).join(' ')
  const resolvedHeaderClassName = ['auth-header', headerClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <main className="auth-shell">
      <section className={sectionClassName} aria-labelledby={titleId}>
        <header className={resolvedHeaderClassName}>
          {badge ? <p className="auth-badge">{badge}</p> : null}
          <h1 id={titleId}>{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
        </header>
        {children}
      </section>
    </main>
  )
}

export default AuthCard
