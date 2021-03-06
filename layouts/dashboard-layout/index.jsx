import { useRouter } from 'next/router'
import classNames from 'classnames'
import styles from './DashboardLayout.module.css'
import BeanPayTopnav from '../../components/beanpay-topnav'
import DashboardArea from '../../design-system/dashboard-area'
import BaseLayout from '../base-layout'

export default function DashboardLayout({className, pageTitle, children}) {
  const router = useRouter()
  return (
    <>
      <BeanPayTopnav />
      <BaseLayout pageTitle={pageTitle} authExpected={true} className={classNames(styles.dashboardLayout, className)}>
        <div className={styles.content}>
          <DashboardArea>
            {children}
          </DashboardArea>
        </div>
      </BaseLayout>
    </>
  )
}
