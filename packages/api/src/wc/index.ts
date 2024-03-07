import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wcApi = new WooCommerceRestApi({
  url: "https://biso.no",
  consumerKey: "ck_53a68185e64e7eea5a6e2093912381fe47649cec",
  consumerSecret: "cs_089fc197be3e21070fa46ae3fb075183229632e8",
  version: "wc/v3",
});
