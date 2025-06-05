import './Content.scss'

const Content = (props) => {
  const { children } = props

  return (
    <main className="content">
      {children}
    </main>
  )
}

export default Content
