import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";

import { parseDuration } from "@/utils/string";
import { getUpworkFee } from "@/utils/number";
import { PAYMENT_METHOD_FEES } from "@/constants/upwork";
import Result from "@/components/Result";
import DurationInput from "@/components/DurationInput";
import MoneyInput from "@/components/MoneyInput";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const sx = { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 };

  // useState
  const [enableTotalEarnings, setEnableTotalEarnings] = useState(false);

  // useRef
  const upworkPctRef = useRef(20);

  // useReducer
  function reducer(state, action) {
    switch (action.type) {
      case "SET_TOTAL_EARNINGS":
        return { ...state, totalEarnings: action.payload ?? "" };

      case "SET_HOURS":
        return { ...state, hours: action.payload ?? "" };

      case "SET_RATE":
        return { ...state, rate: action.payload ?? "" };

      case "SET_UPWORK_PCT":
        return { ...state, upworkPct: Number(action.payload) ?? 20 };

      case "SET_PAYMENT_METHOD":
        return { ...state, paymentMethod: action.payload ?? "" };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    totalEarnings: "",
    hours: "",
    rate: "",
    upworkPct: 20,
    paymentMethod: "",
  });

  // useMemo
  const gross = useMemo(() => {
    const { hours, rate } = state;
    return parseDuration(hours) * rate;
  }, [state]);

  const upworkFee = useMemo(() => {
    const { upworkPct } = state;
    return getUpworkFee(upworkPct, gross);
  }, [gross, state]);

  const fees = useMemo(() => {
    const hours = parseDuration(state.hours);
    const { rate, paymentMethod } = state;
    if (hours < 1 || rate < 1) return 0;

    return upworkFee + (PAYMENT_METHOD_FEES[paymentMethod] ?? 0);
  }, [state, upworkFee]);

  const feesPct = useMemo(() => {
    if (isNaN(fees / gross)) return 0;
    return (fees / gross) * 100;
  }, [gross, fees]);

  // functions
  function setTotalEarnings(value) {
    dispatch({ type: "SET_TOTAL_EARNINGS", payload: value });
  }

  function switchOnChange({ currentTarget: { checked } }) {
    setEnableTotalEarnings(checked);
  }

  function setHours(value) {
    dispatch({ type: "SET_HOURS", payload: value });
  }

  function setRate(value) {
    dispatch({ type: "SET_RATE", payload: value });
  }

  function setUpworkPct({ currentTarget: { value } }) {
    upworkPctRef.current = Number(value);
    dispatch({ type: "SET_UPWORK_PCT", payload: value });
  }

  function setPaymentMethod(value) {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: value });
  }

  // useEffect
  useEffect(() => {
    if (!enableTotalEarnings) {
      dispatch({ type: "SET_UPWORK_PCT", payload: upworkPctRef.current });
    } else {
      const numValue = Number(state.totalEarnings);
      let pct = state.upworkPct;
      if (numValue > 10000 && state.upworkPct !== 5) {
        pct = 5;
      } else if (
        numValue > 500 &&
        numValue <= 10000 &&
        state.upworkPct !== 10
      ) {
        pct = 10;
      } else if (numValue <= 500 && state.upworkPct !== 20) {
        pct = 20;
      }
      dispatch({ type: "SET_UPWORK_PCT", payload: pct });
    }
  }, [enableTotalEarnings, state.totalEarnings, state.upworkPct]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Income Calculator | Upwork calculator</title>
        <meta name="description" content="Walls Team income calculator" />
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
          <Stack direction="row" spacing={6} alignItems="center" w="100%">
            <MoneyInput
              name="totalEarnings"
              label="Total Earnings"
              placeholder="Total earnings"
              setValue={setTotalEarnings}
              value={state.totalEarnings}
              disabled={!enableTotalEarnings}
            >
              <Switch
                colorScheme="teal"
                onChange={switchOnChange}
                isChecked={enableTotalEarnings}
              />
            </MoneyInput>
          </Stack>
          <DurationInput
            name="hours"
            value={state.hours}
            setValue={setHours}
            label="Hours"
            placeholder="Total hours (hh:mm)"
          />
          <MoneyInput
            name="rate"
            label="Rate"
            placeholder="Hourly rate"
            set={0.01}
            setValue={setRate}
            value={state.rate}
          />
          <FormControl>
            <FormLabel htmlFor="upworkPct">Upwork Service Fee</FormLabel>
            <InputGroup size="lg" variant="filled">
              <InputLeftAddon>%</InputLeftAddon>
              <Select
                sx={sx}
                onChange={setUpworkPct}
                value={state.upworkPct}
                isDisabled={enableTotalEarnings}
              >
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="paymentMethod">Payment Method</FormLabel>
            <RadioGroup id="paymentMethod" onChange={setPaymentMethod}>
              <Stack direction={{ base: "column", lg: "row" }} spacing={4}>
                <Radio value="paypal" colorScheme="blue">
                  PayPal
                </Radio>
                <Radio value="payoneer" colorScheme="orange">
                  Payoneer
                </Radio>
                <Radio value="wire" colorScheme="green">
                  Wire Transfer
                </Radio>
                <Radio value="usBank" colorScheme="green">
                  Direct to U.S. Bank
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
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
