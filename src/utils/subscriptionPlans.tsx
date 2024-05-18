export const getPlanByLookupId = (id: string) => {
  return plans.filter((fil) => fil.lookupId === id)[0];
};

export const getNextMonth = (evnt?: number) => {
  const event = evnt ? new Date(evnt) : new Date();
  event.setMonth(event.getMonth() + 1);
  // @ts-ignore
  return Date.parse(event);
};
// import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
export const plans = [
  {
    planId: 1,
    price: 49,
    billing: 0,
    lookupId: import.meta.env.VITE_PADDLE_STARTER_MONTHLY,
    // priceId: "price_1OzAFJDfQvyRGV9Dtk3XAstg",
  },
  {
    planId: 1,
    price: 348,
    billing: 1,
    lookupId: import.meta.env.VITE_PADDLE_STARTER_YEARLY,
    // priceId: "price_1OzAFwDfQvyRGV9DCnHsZjjx",
  },
  {
    planId: 2,
    price: 79,
    billing: 0,
    lookupId: import.meta.env.VITE_PADDLE_PREMIUM_MONTHLY,
    // priceId: "price_1OzAGKDfQvyRGV9DiZGySlJS",
  },
  {
    planId: 2,
    price: 708,
    billing: 1,
    lookupId: import.meta.env.VITE_PADDLE_PREMIUM_YEARLY,
    // priceId: "price_1OzAGeDfQvyRGV9DHNwoGlm0",
  },
  {
    planId: 3,
    price: 99,
    billing: 0,
    lookupId: import.meta.env.VITE_PADDLE_BUSINESS_MONTHLY,
    // priceId: "price_1OzAGKDfQvyRGV9DiZGySlJS",
  },
  {
    planId: 3,
    price: 948,
    billing: 1,
    lookupId: import.meta.env.VITE_PADDLE_BUSINESS_YEARLY,
    // priceId: "price_1OzAGeDfQvyRGV9DHNwoGlm0",
  },
];

export const subscriptionText = {
  starter: {
    en: [
      "Full Access to Trending Markets",
      "Channel Breakdown",
      "10 Search Trends Per Day",
    ],
    fr: [
      "Accès Complet à Trending Markets",
      "Tendance Réseaux Sociaux",
      "10 tendances de recherche par jour",
    ],
  },
  premium: {
    en: [
      "Full Access to Trending Markets",
      "1 Year Forecast",
      "Channel Breakdown",
      "10 Search Trends Per Day",
      "Top 10 Markets Of The Week",
    ],
    fr: [
      "Accès Complet à Trending Markets",
      "Prévisions sur 1 an",
      "Tendance Réseaux Sociaux",
      "10 tendances de recherche par jour",
      "Top 10 des marchés de la semaine",
    ],
  },
  business: {
    en: [
      "Full Access to Trending Markets",
      "1 Year Forecast",
      "Channel Breakdown",
      "Unlimited Search Trends",
      "Top 10 Markets Of The Week",
      "100 New Trending Markets Each Week",
    ],
    fr: [
      "Accès Complet à Trending Markets",
      "Prévisions sur 1 an",
      "Tendance Réseaux Sociaux",
      "Tendances de recherche illimitées",
      "Top 10 des marchés de la semaine",
      "100 nouveaux marchés tendance chaque semaine",
    ],
  },
};
