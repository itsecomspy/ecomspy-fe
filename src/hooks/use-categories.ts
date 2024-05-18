import { where } from "firebase/firestore";
import firebaseService from "../services/firebase.service";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  const getCategories = async () => {
    const snapshot = await firebaseService.getDocuments("categories", [
      where("parentId", "==", 0),
    ]);
    return snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          value: doc.get("name").replaceAll(" ", "-").toLowerCase(),
        } as { name: string; id: number; value: string; keywordCount: number })
    );
  };

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const getSubCategories = async (id: number) => {
    const snapshot = await firebaseService.getDocuments(`categories`, [
      where("parentId", "==", id),
    ]);
    return snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          value: doc.get("name").replaceAll(" ", "-").toLowerCase(),
        } as { name: string; id: number; value: string })
    );
  };

  const getCategoryIdFromValue = (value: string) => {
    return categories.find((c) => c.value === value)?.id;
  };

  const getSubCategoryIdFromValue = async (
    parentValue: string,
    value: string
  ) => {
    const parentId = getCategoryIdFromValue(parentValue);
    if (!parentId) return;
    const subCategories = await getSubCategories(parentId);
    return subCategories.find((c) => c.value === value)?.id;
  };

  return {
    categories,
    getSubCategories,
    categoriesLoading,
    getSubCategoryIdFromValue,
  };
}
