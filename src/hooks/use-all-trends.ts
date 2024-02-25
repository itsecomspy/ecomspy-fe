import { useMutation } from "@tanstack/react-query";
import firebaseService from "../services/firebase.service";
import { useEffect } from "react";
import { where } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { filterAtom } from "../main.atom";

export default function useAllTrends({
  categoryId,
  values,
}: {
  categoryId: number;
  values?: { parent: string; child: string };
}) {
  const filterAtomData = useAtomValue(filterAtom);
  const getAllTrendsMutation = useMutation<
    {
      query: string;
      value: number;
      volume: number;
      formattedValue: string;
      hasData: boolean;
      link: string;
      trendData: string;
    }[]
  >({
    mutationKey: ["alltrends", categoryId || values?.child],
    mutationFn: async () => {
      let id = categoryId;
      if (values && !categoryId) {
        const parentSnap = await firebaseService.getDocuments(`categories`, [
          where("value", "==", values.parent),
        ]);
        if (parentSnap.docs.length === 0) return [];
        const parentId = parentSnap.docs[0].id;
        const childSnap = await firebaseService.getDocuments(
          `categories/${parentId}/children`,
          [where("value", "==", values.child)]
        );
        if (childSnap.docs.length === 0) return [];
        id = parseInt(childSnap.docs[0].id);
      }

      const res = await firebaseService.callFunction("getCategoryTrends", {
        category: id,
        startTime: filterAtomData?.timeline?.date,
        minInterest: filterAtomData.status?.value.min || 0,
        maxInterest: filterAtomData.status?.value.max || 100,
      });
      return res.data as {
        query: string;
        value: number;
        volume: number;
        formattedValue: string;
        hasData: boolean;
        link: string;
        trendData: string;
      }[];
    },
  });

  useEffect(() => {
    getAllTrendsMutation.mutate();
  }, [filterAtomData]);

  return {
    trends: getAllTrendsMutation.data,
    isLoading: getAllTrendsMutation.isPending,
  };
}
