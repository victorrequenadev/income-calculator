import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { FLOAT_ONE_POINT_REGEX, FLOAT_TWO_POINT_REGEX } from "@/utils/regex";

function PercentageInput({
  name,
  label,
  size = "lg",
  variant = "filled",
  setValue,
  value,
  step = 0.1,
  precision = 2,
  placeholder = "",
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
        min={0}
        max={100}
        onChange={onChange}
        value={value}
      >
        <InputGroup size={size} variant={variant}>
          <InputLeftAddon>%</InputLeftAddon>
          <NumberInputField placeholder={placeholder} sx={sx} />
        </InputGroup>
      </NumberInput>
    </FormControl>
  );
}

export default PercentageInput;
