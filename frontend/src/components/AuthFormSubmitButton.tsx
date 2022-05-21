import styled from 'styled-components';

import { Form, Button } from 'antd';

const StretchedAntButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
`;

export function AuthFormSubmitButton({ buttonText, link }) {
  return (
    <Form.Item>
      <StretchedAntButton type="primary" htmlType="submit">
        {buttonText}
      </StretchedAntButton>
      Or {link}
    </Form.Item>
  );
}
