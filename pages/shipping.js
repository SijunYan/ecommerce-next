import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../src/components/Layout";

const shipping = (props) => {
  const router = useRouter();
  if (!Cookies.get("userInfo")) {
    typeof window !== "undefined" && router.push("/login?redirect=/shipping");
  }
  return <Layout>shipping</Layout>;
};

export default shipping;
