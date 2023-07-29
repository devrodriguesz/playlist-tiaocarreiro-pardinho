import Image from 'next/image'
import styles from './page.module.css'

import Header from './components/Header/page'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Header />
      </div>
    </main>
  )
}
