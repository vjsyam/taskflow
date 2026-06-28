import React from 'react';
import { RiDeleteBinLine, RiCloseLine } from 'react-icons/ri';

const ConfirmModal = ({ task, onConfirm, onCancel }) => {
  if (!task) return null;
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal confirm-modal" role="alertdialog" aria-labelledby="confirm-h">
        <div className="confirm-icon-ring"><RiDeleteBinLine /></div>
        <h3 id="confirm-h">Delete this task?</h3>
        <p>"{task.title}" will be permanently removed. This action can't be undone.</p>
        <div className="form-foot" style={{ paddingTop: 8 }}>
          <button className="btn btn-ghost" onClick={onCancel} id="cancel-delete-btn">
            <RiCloseLine size={14} /> Cancel
          </button>
          <button className="btn btn-red" onClick={onConfirm} id="confirm-delete-btn">
            <RiDeleteBinLine size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
