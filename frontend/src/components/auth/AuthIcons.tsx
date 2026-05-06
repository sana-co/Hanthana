function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5Z" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8.7 4.8 7 6.5a2 2 0 0 0-.4 2.3 19 19 0 0 0 8.6 8.6 2 2 0 0 0 2.3-.4l1.7-1.7a1.8 1.8 0 0 0-.4-2.9l-2.5-1.2a1.8 1.8 0 0 0-2 .4l-.7.7a14 14 0 0 1-3.3-3.3l.7-.7a1.8 1.8 0 0 0 .4-2L11.6 5a1.8 1.8 0 0 0-2.9-.2Z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="10" width="12" height="10" rx="2" />
      <path d="M9 10V7.5a3 3 0 1 1 6 0V10" />
    </svg>
  )
}

export { LockIcon, MailIcon, PhoneIcon, UserIcon }
