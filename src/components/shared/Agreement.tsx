import React, { MouseEvent } from 'react';
import Flex from './Flex';
import { css } from '@emotion/react';
import Text from './Text';
import { colors } from '@/styles/colorPalette';

const Agreement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  );
};

const AgreementTitle = ({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
}) => {
  return (
    <Flex as="li" onClick={e => onChange(e, checked)}>
      <IconCheck withCircle={true} checked={checked} />
      <Text bold={true}>{children}</Text>
    </Flex>
  );
};

const AgreementDescription = ({
  children,
  checked,
  onChange,
  link,
}: {
  checked: boolean;
  children: React.ReactNode;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
  link?: string;
}) => {
  return (
    <Flex css={agreementDescStyle}>
      <Flex as="li" onClick={e => onChange(e, checked)}>
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  );
};

Agreement.Title = AgreementTitle;
Agreement.Description = AgreementDescription;

const agreementContainerStyles = css`
  padding: 24px;
  & li {
    cursor: pointer;
  }
`;

const agreementDescStyle = css`
  display: flex;
  justify-content: space-between;
`;

const IconCheck = ({
  checked,
  withCircle = false,
}: {
  checked: boolean;
  withCircle?: boolean;
}) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 5, marginTop: 2 }}
    >
      {withCircle ? (
        <path
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
          fill={checked ? colors.blue : colors.lightgrey}
          fillRule={checked ? 'nonzero' : 'evenodd'}
        />
      ) : null}
      {withCircle ? (
        <path
          d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
          fill={checked ? colors.white : colors.lightgrey}
        />
      ) : (
        <path
          d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
          fill={checked ? colors.blue : colors.lightgrey}
        />
      )}
    </svg>
  );
};

export default Agreement;
