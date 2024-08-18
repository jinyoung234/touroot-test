import { Button, Modal, Text } from "@components/common";

interface ErrorModalProps {
  resetErrorBoundary: () => void;
}

const ErrorModal = ({ resetErrorBoundary }: ErrorModalProps) => {
  return (
    <Modal isOpen={true} onCloseModal={() => {}}>
      <Modal.Header />
      <Modal.Body direction="column" style={{ gap: "1.6rem" }}>
        <img
          style={{ width: "11rem", height: "12.5rem" }}
          src="https://github.com/user-attachments/assets/e37a2008-976f-4f08-9372-f9c144890529"
        />
        <Text textType="body" style={{ fontWeight: 700 }}>
          에러가 발생했습니다.
        </Text>
        <Button variants="primary" onClick={() => resetErrorBoundary()}>
          다시 시도하기
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
