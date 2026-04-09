export const getPlanByLookupId = (id: string) => {
  return plans.filter((fil) => fil.lookupId === id)[0];
};

export const getNextMonth = (evnt?: number) => {
  const event = evnt ? new Date(evnt) : new Date();
  event.setMonth(event.getMonth() + 1);
  // @ts-ignore
  return Date.parse(event);
};
export const plans = [
  {
    planId: 1,
    price: 49,
    billing: 0,
    lookupId: "starter_monthly",
  },
  {
    planId: 1,
    price: 348,
    billing: 1,
    lookupId: "starter_yearly",
  },
  {
    planId: 2,
    price: 79,
    billing: 0,
    lookupId: "premium_monthly",
  },
  {
    planId: 2,
    price: 708,
    billing: 1,
    lookupId: "premium_yearly",
  },
  {
    planId: 3,
    price: 99,
    billing: 0,
    lookupId: "business_monthly",
  },
  {
    planId: 3,
    price: 948,
    billing: 1,
    lookupId: "business_yearly",
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
