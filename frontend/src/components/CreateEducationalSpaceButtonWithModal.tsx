import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useSession } from 'utils';

export function CreateEducationalSpaceButtonWithModal() {
  const session = useSession();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setModalText('Content of the modal');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  if (
    session.isAuthed &&
    session.accessToken.payload.user.canCreateEducationalSpaces
  )
    return (
      <>
        <Button type="primary" onClick={showModal}>
          Create Educational Space
        </Button>
        <Modal
          title="Create Educational Space"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </>
    );
  return null;
}
