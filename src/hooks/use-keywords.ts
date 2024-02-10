import { useMutation } from "@tanstack/react-query";
import firebaseService from "../services/firebase.service";
import { useEffect } from "react";
import { where } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { filterAtom } from "../main.atom";

export default function useKeywords({
  categoryId,
  values,
}: {
  categoryId: number;
  values?: { parent: string; child: string };
}) {
  const filterAtomData = useAtomValue(filterAtom);
  const getKeywordsMutation = useMutation<
    {
      query: string;
      value: number;
      formattedValue: string;
      hasData: boolean;
      link: string;
      trendData: string;
    }[]
  >({
    mutationKey: ["keywords", categoryId || values?.child],
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

      const res = await firebaseService.callFunction("getCategoryKeywords", {
        category: id,
        startTime: filterAtomData?.timeline?.date,
      });
      return res.data as {
        query: string;
        value: number;
        formattedValue: string;
        hasData: boolean;
        link: string;
        trendData: string;
      }[];
    },
  });

  useEffect(() => {
    getKeywordsMutation.mutate();
  }, []);

  return {
    keywords: getKeywordsMutation.data,
    isLoading: getKeywordsMutation.isPending,
  };
}
