import styles from './header.module.css'
import Image from 'next/image'

import Logo from '@/public/logo.png'

export default function Header(){
    return (
        <div className={styles.container}>
            <Image src={Logo} alt="logo" width={120} height={50} priority />
            <h1 className={styles.title}>Discografia</h1>
        </div>
    )
}