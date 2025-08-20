/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { withPlausibleProxy } from 'next-plausible';

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
};

export default withPlausibleProxy({
  customDomain: 'https://analytics.matv.io',
})(config);
