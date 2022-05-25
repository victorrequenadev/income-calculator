import { useMemo, useReducer } from "react";
import Head from "next/head";
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from "@chakra-ui/react";

import { parseDuration } from "@/utils/string";
import Result from "@/components/Result";
import DurationInput from "@/components/DurationInput";
import MoneyInput from "@/components/MoneyInput";
import PercentageInput from "@/components/PercentageInput";

import styles from "@/styles/Home.module.scss";
import { getUpworkFee } from "@/utils/number";

export default function WallsTeam() {
  const sx = { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 };

  // useReducer
  function reducer(state, action) {
    switch (action.type) {
      case "SET_HOURS":
        return { ...state, hours: action.payload ?? "" };

      case "SET_RATE":
        return { ...state, rate: action.payload ?? "" };

      case "SET_UPWORK_PCT":
        return { ...state, upworkPct: action.payload ?? "20" };

      case "SET_AGENCY_RATE":
        return { ...state, agencyRate: action.payload ?? "" };

      case "SET_PAYPAL_PCT":
        return { ...state, payPalPct: action.payload ?? "" };

      case "SET_PAYPAL_FIXED":
        return { ...state, payPalFixed: action.payload ?? "" };

      case "SET_CASH_PCT":
        return { ...state, cashPct: action.payload ?? "" };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    hours: "",
    rate: "",
    upworkPct: "20",
    agencyRate: "",
    payPalPct: "",
    payPalFixed: "",
    cashPct: "",
  });

  // useMemo
  const gross = useMemo(() => {
    const { hours, rate } = state;
    return parseDuration(hours) * rate;
  }, [state]);

  const fees = useMemo(() => {
    const hours = parseDuration(state.hours);
    if (hours < 1 || state.rate < 1) return 0;
    const { agencyRate, upworkPct, payPalPct, payPalFixed, cashPct } = state;

    const upworkFee = getUpworkFee(upworkPct, gross);
    const agencyFee = agencyRate * hours;
    const payPalFee =
      (gross - upworkFee - agencyFee) * (payPalPct / 100) + Number(payPalFixed);
    const cashFee =
      (gross - (upworkFee + agencyFee + payPalFee)) * (cashPct / 100);
    return upworkFee + agencyFee + payPalFee + cashFee;
  }, [gross, state]);

  const feesPct = useMemo(() => {
    if (isNaN(fees / gross)) return 0;
    return (fees / gross) * 100;
  }, [gross, fees]);

  // functions
  function setHours(value) {
    dispatch({ type: "SET_HOURS", payload: value });
  }

  function setRate(value) {
    dispatch({ type: "SET_RATE", payload: value });
  }

  function setUpworkPct({ currentTarget: { value } }) {
    dispatch({ type: "SET_UPWORK_PCT", payload: value });
  }

  function setAgencyRate(value) {
    dispatch({ type: "SET_AGENCY_RATE", payload: value });
  }

  function setPayPalPct(value) {
    dispatch({ type: "SET_PAYPAL_PCT", payload: value });
  }

  function setPayPalFixed(value) {
    dispatch({ type: "SET_PAYPAL_FIXED", payload: value });
  }

  function setCashPct(value) {
    dispatch({ type: "SET_CASH_PCT", payload: value });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Income Calculator | Walls Team calculator</title>
        <meta name="description" content="Income calculator for Walls Team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="100%" h="100%" flexDir={{ base: "column", lg: "row" }}>
        <Center
          w={{ lg: "65%" }}
          px={{ base: 6, lg: 24 }}
          py={{ base: 6, lg: 0 }}
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <DurationInput
            name="hours"
            label="Hours"
            placeholder="Invoice hours"
            setValue={setHours}
            value={state.hours}
          />
          <MoneyInput
            name="rate"
            label="Rate"
            placeholder="Hourly rate"
            setValue={setRate}
            value={state.rate}
            step={0.01}
          />
          <MoneyInput
            name="agency"
            label="Agency Hourly Rate"
            placeholder="Agency fee"
            setValue={setAgencyRate}
            value={state.agencyRate}
            precision={1}
            step={0.1}
          />
          <FormControl>
            <FormLabel htmlFor="upworkPct">Upwork Service Fee</FormLabel>
            <InputGroup size="lg" variant="filled">
              <InputLeftAddon>%</InputLeftAddon>
              <Select sx={sx} onChange={setUpworkPct} value={state.upworkPct}>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </Select>
            </InputGroup>
          </FormControl>
          <Stack direction={{ base: "column", lg: "row" }} spacing={6} w="100%">
            <PercentageInput
              name="payPalPct"
              label="PayPal Percentage Fee"
              placeholder="PayPal %"
              precision={1}
              setValue={setPayPalPct}
              value={state.payPalPct}
            />
            <MoneyInput
              name="payPalFixed"
              label="PayPal Fixed Fee"
              placeholder="PayPal $"
              step={0.01}
              setValue={setPayPalFixed}
              value={state.payPalFixed}
            />
          </Stack>
          <PercentageInput
            name="cashPct"
            label="Cash Percentage Fee"
            placeholder="Cash %"
            precision={2}
            step={0.01}
            setValue={setCashPct}
            value={state.cashPct}
          />
        </Center>
        <Flex
          direction="column"
          justifyContent="center"
          w={{ base: "100%", lg: "35%" }}
          mt={{ base: "4.5rem", lg: 0 }}
          order={{ base: -1, lg: 0 }}
        >
          <Result gross={gross} fees={fees} feesPct={feesPct} />
        </Flex>
      </Flex>
    </div>
  );
}
