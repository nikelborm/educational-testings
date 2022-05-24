import { Popconfirm } from 'antd';
import { ReactNode } from 'react';

export function DeleteConfirmationPopover({
  isOpen,
  onClickYes,
  onClickNo,
  children,
  entityNameToDelete,
}: DeleteConfirmationPopoverProps) {
  return (
    <div
      onClick={stopPropagation}
      tabIndex={0}
      aria-hidden="true"
      role="button"
    >
      <Popconfirm
        title={`Are you sure to delete ${entityNameToDelete}?`}
        onConfirm={onClickYes}
        onCancel={onClickNo}
        placement="bottomRight"
        visible={isOpen}
      >
        {children}
      </Popconfirm>
    </div>
  );
}

function stopPropagation(event) {
  event.stopPropagation();
}
interface DeleteConfirmationPopoverProps {
  isOpen: boolean;
  onClickYes: () => void;
  onClickNo: () => void;
  children: ReactNode;
  entityNameToDelete: string;
}
