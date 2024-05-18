export const statusFilter = [
  { id: 0, value: 0, text: "All" },
  { id: 1, value: 1, text: "Regular" },
  { id: 2, value: 2, text: "Peaked" },
  { id: 3, value: 3, text: "Exploding" },
];

export const timelineFilter = [
  {
    id: 0,
    text: "1 Year Forecast",
    value: "forecast",
    info: {
      en: "We use our prediction analysis model to forecast the growth over the next 12 months.",
      fr: "Nous utilisons notre modèle d'analyse de prédiction pour prévoir la croissance au cours des 12 prochains mois.",
    },
    hidden: {
      en: "Upgrade your plan to access 1 year forecast",
      fr: "Mettez à niveau votre forfait pour accéder aux prévisions sur 1 an",
    },
  },
  { id: 1, value: "3mon", text: "3 Months" },
  { id: 2, value: "6mon", text: "6 Months" },
  { id: 3, value: "1year", text: "1 Year" },
  { id: 4, value: "2year", text: "2 Years" },
  { id: 5, value: "5year", text: "5 Years" },
  { id: 6, value: "10year", text: "10 Years" },
  // { id: 7, text: "15 Years" },
];

export const sortFilter = [
  {
    id: 1,
    value: "popularity",
    text: { en: "Popularity", fr: "Popularité" },
    info: {
      en: "Our internal algorithm sorts the keywords based on recency and popularity",
      fr: "Notre algorithme interne trie les mots-clés en fonction de leur récence et de leur popularité.",
    },
  },
  {
    id: 2,
    value: "volume",
    text: { en: "Volume", fr: "Volume" },
    info: {
      en: "Volume shows the keywords sorted by most volume to least volume",
      fr: "Le volume affiche les mots-clés triés du plus grand volume au moins important",
    },
  },
  {
    id: 3,
    value: "growth",
    text: { en: "Growth", fr: "Croissance" },
    info: {
      en: "Keywords are ranked based on how much it has grown over a time period",
      fr: "Les mots clés sont classés en fonction de leur croissance sur une période de temps",
    },
  },
  {
    id: 4,
    value: "trendLine",
    text: { en: "Trend Line", fr: "Ligne de tendance" },
    info: {
      en: "This aggregates the keyword volume and shows the most stable based on volume",
      fr: "Cela regroupe le volume des mots clés et affiche le plus stable en fonction du volume.",
    },
  },
];
