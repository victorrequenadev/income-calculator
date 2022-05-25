import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { DURATION_REGEX } from "@/utils/regex";

function DurationInput({
  name,
  label,
  size = "lg",
  variant = "filled",
  autoComplete = "off",
  setValue,
  value,
  ...props
}) {
  function handleChange({ currentTarget: { value } }) {
    if (value.startsWith(":")) {
      setValue("");
      return;
    }
    if (!DURATION_REGEX.test(value)) return;
    setValue(value);
  }

  function handleBlur({ currentTarget: { value } }) {
    const [hh, mm = ""] = value.split(":");
    if (hh) {
      setValue(hh + ":" + mm.padEnd(2, "0"));
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        size={size}
        variant={variant}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={autoComplete}
        {...props}
      />
    </FormControl>
  );
}

export default DurationInput;
