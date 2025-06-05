import './Logo.scss'
import classNames from 'classnames'

const Logo = (props) => {
  const {
    className,
    loading = 'lazy',
  } = props

  const title = 'Home'

  return (
    <a
      className={classNames(className, 'logo')}
      href="/"
      title={title}
      aria-label={title}
    >
      <img
        className="logo__image"
        src="/logo.svg"
        alt=""
        width={199}
        height={60}
        loading={loading}
      />

    </a>
  )
}

export default Logo
