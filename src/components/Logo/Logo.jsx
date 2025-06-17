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
      Logo

    </a>
  )
}

export default Logo
