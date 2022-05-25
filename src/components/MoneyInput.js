import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";
import { FLOAT_ONE_POINT_REGEX, FLOAT_TWO_POINT_REGEX } from "@/utils/regex";

function MoneyInput({
  name,
  label,
  size = "lg",
  variant = "filled",
  setValue,
  value,
  min = 0,
  max = Infinity,
  step = 0.1,
  precision = 2,
  placeholder = "",
  disabled = false,
  children,
}) {
  const sx = { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 };

  function onChange(value) {
    switch (precision) {
      case 2:
        if (!FLOAT_TWO_POINT_REGEX.test(value)) return;
        break;

      case 1:
        if (!FLOAT_ONE_POINT_REGEX.test(value)) return;
        break;

      default:
        break;
    }
    setValue(value);
  }

  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput
        id={name}
        size={size}
        precision={precision > 2 ? 2 : precision}
        step={step < 0.01 ? 0.01 : step}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        isDisabled={disabled}
      >
        <Stack direction="row" spacing={6} alignItems="center" w="100%">
          <InputGroup size={size} variant={variant}>
            <InputLeftAddon>$</InputLeftAddon>
            <NumberInputField placeholder={placeholder} sx={sx} />
          </InputGroup>
          {children}
        </Stack>
      </NumberInput>
    </FormControl>
  );
}

export default MoneyInput;
