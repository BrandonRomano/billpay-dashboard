import styles from './BillSettingsPanel.module.css'
import { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import DashboardPanel from '../../../design-system/dashboard-panel'
import withOrdinalSuffix from '../../../util/with-ordinal-suffix'
import { UpdateBillFormModal } from '../../../components/fullscreen-modals/bill-form-modal';

export default function BillSettingsPanel({ bill }) {
  const [editBillModalOpen, setEditBillModalOpen] = useState(false);
  const dueDate = parseInt(bill.first_due_date.substring(8, 10))
  return (
    <>
      <DashboardPanel
        className={styles.billSettingsPanel}
        title={bill.name}
        description={`$${bill.estimated_total_due} due ${bill.frequency} on the ${withOrdinalSuffix(dueDate)}`}
        menuItems={[
          {
            text: "Edit Bill",
            icon: faEdit,
            onClick: () => {setEditBillModalOpen(true)}
          },
          {
            text: "Delete Bill",
            icon: faTrash,
            onClick: () => console.log(`TODO: Delete Bill '${bill.id}'`)
          },
        ]}
        minRowWeight={33}
      />
      <UpdateBillFormModal
        bill={bill}
        isOpen={editBillModalOpen}
        onClose={() => setEditBillModalOpen(false)}
      />
    </>
  )
}
