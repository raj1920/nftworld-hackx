import React from "react";
import Banner from "../components/Banner";
import IndexPage from "../components/card";
import Navbar from "../components/navbar";
import { findHome } from "../lib/api";

const index = (props: any) => {
  return (
    <div>
      <Banner ribbon={props.ribbon} />
      <Navbar />
      <div>
        <IndexPage />
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  let res = await findHome();
  return {
    props: {
      ribbon: res.ribbon,
    },
  };
}

export default index;
