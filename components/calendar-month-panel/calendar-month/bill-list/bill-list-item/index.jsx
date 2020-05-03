import { useState } from 'react';
import styles from './BillListItem.module.css'
import classNames from 'classnames'
import PopupMenu from '../../../../../design-system/popup-menu'
import { faExternalLinkAlt, faReceipt } from '@fortawesome/free-solid-svg-icons'
import PaymentFormModal from '../../../../fullscreen-modals/payment-form-modal';

export default function BillListItem({ className, category, bill }) {
  var categoryClass = null;
  switch(category) {
    case 'overdue':
      categoryClass = styles.overdue;
      break;
    case 'unpaid':
      categoryClass = styles.unpaid;
      break;
    case 'paid':
      categoryClass = styles.paid;
      break;
  }
  const [popupMenuActive, setPopupMenuActive] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  return (
    <>
      <li
        onClick={() => {
          if(!popupMenuActive) setPopupMenuActive(true);
        }}
        className={classNames(
          className,
          categoryClass,
          styles.billListItem,
          { [styles.popupMenuActive]: popupMenuActive },
        )}
      >
        <p>{bill.name}</p>
        <p>{`$${bill.totalDue}`}</p>
        { popupMenuActive && (
          <PopupMenu
            onClose={() => {
              /* Put an artifically small delay here to ensure that
               * when the PopupPanel's click listener fires off that this
               * is actually still part of the DOM so the PopupPanel doesn't
               * close itself.
               *
               * This feels pretty hacky, but I actually cannot think of a better
               * way to handle this without complicating the PopupPanel interface.
               * This works consistently at 1ms, at 10ms should be extra safe
               * and still unnoticeable.
               */
              setTimeout(() =>{
                setPopupMenuActive(false);
              }, 10);
            }}
            className={styles.popupMenu}
            items={bill.paid ?
              [
                {
                  text: "Mark as Unpaid",
                  onClick: () => console.log("Mark as Unpaid Clicked"),
                  icon: faReceipt,
                },
              ] :
              [
                {
                  text: "Pay Bill",
                  onClick: () => {
                    window.open(bill.billpayURL, '_blank');
                  },
                  icon: faExternalLinkAlt,
                },
                {
                  text: "Mark as Paid",
                  onClick: () => setPaymentModalOpen(true),
                  icon: faReceipt,
                }
              ]
            }
          />
        )}
      </li>
      <PaymentFormModal
        bill={bill}
        isOpen={paymentModalOpen}
        onClose={() => {
          /* Similar to above, put a small delay here to ensure that
           * the Modal is still in the DOM when the PopupPanel's click
           * listener fires off so it doesn't close itself.
           */
          setTimeout(() =>{
            setPaymentModalOpen(false)
          }, 10)
        }}
      />
    </>
  )
}
