import env from "../zodSchema/envValidator.js"
const { STRIPE_SECRET_KEY } = env

import Stripe from "stripe";
export const stripe = new Stripe(STRIPE_SECRET_KEY)
