import React from "react";
import { useAuthContext } from "../context/AuthContext";
import firebaseService from "../services/firebase.service";

export default function useTrends() {
  // Call for demo trends for unsubscribed user
  const { user } = useAuthContext();
  const [demoTrends, setDemoTrends] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useMemo(async () => {
    if (user) {
      firebaseService
        .getDocuments(`demo`, [])
        .then((res) => {
          let arr: any = [];
          res.docs.forEach((d) => {
            let data = d.data();
            // Get highest volume value based on 100 interest
            let currentValue = data.chartData[data.chartData.length - 1].value[0];
            let trueVolume = (data.volume * 100) / currentValue;
            // Map volume against interest
            data.chartData.map((chart: any) => {
              chart.volume = (trueVolume * chart.value[0]);
              return chart;
            });
            arr.push(data);
          });
          setLoading(false);
          return setDemoTrends(arr);
        })
        .catch((err) => err);
    }
  }, [user?.uid]);

  return { demoTrends, loading };
}
