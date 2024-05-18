import React from "react";
import firebaseService from "../services/firebase.service";

export default function useCategories() {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] =
    React.useState<boolean>(true);

  React.useMemo(async () => {
    let arr: any = [];
    const snapshot = await firebaseService.getDocuments("categories", []);
    snapshot.docs.map((doc) => {
      arr.push(doc.data());
    });
    setCategories(arr);
    setCategoriesLoading(false);
  }, []);

  const getCategoryCount = React.useCallback(async (niche: any) => {
    return await firebaseService.getDocumentCount(niche.nicheId);
  }, []);

  return {
    categories,
    getCategoryCount,
    categoriesLoading,
  };
}
