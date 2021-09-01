import { Box, Center } from "@chakra-ui/layout";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@chakra-ui/spinner";
import firebase, { db, storage } from "utils/firebase";
import { IRoute } from "components/Map/types";
import { useRouter } from "next/router";

interface IuseLogicReturn {
  mapId: string;
  route: IRoute | undefined;
}

const useLogic = (): IuseLogicReturn => {
  const { query } = useRouter();
  const { mapId } = query as { mapId: string };
  const [route, setRoute] = useState<IRoute>();

  useEffect(() => {
    if (mapId) {
      db.collection("routes")
        .doc(mapId || "")
        .get()
        .then(doc =>
          doc.exists ? (doc.data() as IRoute) : Promise.reject(new Error("Rota não encontrada"))
        )
        .then(
          data => setRoute(data)
          // Promise.all(
          //   data.pointers.map(pointer =>
          //     storage.ref(`/routes/${mapId}/${pointer.avatar_url}`).getDownloadURL()
          //   )
          // ).then(pointersUrl =>
          //   storage
          //     .ref(`/routes/${mapId}/${data.avatar_url}`)
          //     .getDownloadURL()
          //     .then(res =>
          //       setRoute({
          //         ...data,
          //         avatar_url: res,
          //         pointers: data.pointers.map((pointer, index) => ({
          //           ...pointer,
          //           avatar_url: pointersUrl[index],
          //         })),
          //       })
          //     )
          // )
        );
    }
  }, [mapId]);

  return { mapId, route };
};

const Map: React.FC = () => {
  const { mapId, route } = useLogic();

  const MapComponent = useMemo(
    () =>
      dynamic(
        () => import("components/Map"), // replace '@components/map' with your component's location
        {
          loading: () => (
            <Center>
              <Spinner size="xl" />
            </Center>
          ),
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [
      /* list variables which should trigger a re-render here */
    ]
  );

  return (
    <Box mb={8} width="100vw" height="80vh">
      {route && (
        <MapComponent
          route={route}
          reference={
            db.collection("routes").doc(mapId || "") as firebase.firestore.DocumentReference<IRoute>
          }
        />
      )}
    </Box>
  );
};

export default Map;
