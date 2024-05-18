import { useMutation } from "@tanstack/react-query";
import firebaseService from "../services/firebase.service";
import { useEffect } from "react";
import { QueryConstraint, orderBy, where } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { filterAtom } from "../main.atom";

export default function useProducts({
  categoryId,
  values,
}: {
  categoryId: number;
  values?: { parent: string; child: string };
}) {
  const filterAtomData = useAtomValue(filterAtom);
  const getProductsMutation = useMutation<
    {
      query: string;
      value: number;
      volume: number;
      formattedValue: string;
      hasData: boolean;
      link: string;
      isBrand: boolean;
      trendData: {
        time: string;
        formattedTime: string;
        formattedAxisTime: string;
        value: number[];
        formattedValue: string[];
        hasData: boolean[];
      }[];
    }[]
  >({
    mutationKey: ["alltrends", categoryId || values?.child],
    mutationFn: async () => {
      const childSnap = await firebaseService.getDocuments(`categories`, [
        where("value", "==", values?.child),
      ]);

      const id = parseInt(childSnap.docs?.[0].id || "0") || categoryId;

      if (!id) return [];

      const q: QueryConstraint[] = [where("trendData", "!=", null)];
      if (filterAtomData.status) {
        q.push(orderBy("value"));
        q.push(where("value", ">", filterAtomData.status.value.min));
      }

      const snapshot = await firebaseService.getDocuments(
        `categories/${id}/keywords`,
        [where("isBrand", "==", false)]
      );

      const keywords = snapshot.docs
        .map(
          (doc) =>
            doc.data() as {
              "30d"?: object[];
              "90d"?: object[];
              "12mo"?: object[];
              "2yrs"?: object[];
              "5yrs"?: object[];
              query: string;
              value: number;
              volume: number;
              formattedValue: string;
              hasData: boolean;
              link: string;
              isBrand: boolean;
              trendData: {
                time: string;
                formattedTime: string;
                formattedAxisTime: string;
                value: number[];
                formattedValue: string[];
                hasData: boolean[];
              }[];
            }
        )
        .filter(
          (fil) =>
            !!fil["12mo"] ||
            !!fil["2yrs"] ||
            !!fil["30d"] ||
            !!fil["5yrs"] ||
            !!fil["90d"]
        );
      return keywords;
    },
  });

  useEffect(() => {
    getProductsMutation.mutate();
  }, [filterAtomData]);

  return {
    products: getProductsMutation.data,
    isLoading: getProductsMutation.isPending,
  };
}
