import { forwardRef, SelectHTMLAttributes } from 'react';
import { Option } from '@/models/apply';
import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';
import Flex from './Flex';
import Text from './Text';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.lightgrey};
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.grey};
  }
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { title, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {title ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
          fontWeight="bold"
        >
          {title}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder || '옵션을 선택하세요.'}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  );
});

export default Select;
