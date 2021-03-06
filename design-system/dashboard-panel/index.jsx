import classNames from 'classnames'
import Panel from '../panel'
import styles from './DashboardPanel.module.css'

export default function DashboardPanel({className, minRowWeight, children, ...restProps}) {
  var minRowWeightClass = styles.fullWidth;
  switch (minRowWeight) {
    case 100:
      minRowWeightClass = styles.fullWidth;
      break;
    case 50:
      minRowWeightClass = styles.halfWidth;
      break;
    case 33:
      minRowWeightClass = styles.thirdWidth;
      break;
    case 25:
      minRowWeightClass = styles.quarterWidth;
      break;
  }
  return (
    <Panel
      className={classNames(
        styles.dashboardPanel,
        className,
        minRowWeightClass
      )}
      {...restProps}
    >
      {children}
    </Panel>
  )
}
